"use server";

import { lucia } from "@/auth/auth";
import { db } from "@/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { User, Session } from "lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { hash, verify } from "@node-rs/argon2";
import { cache } from "react";

/**
 * Validates a session using the session cookie.
 *
 * @returns - A promise that resolves to an object containing the user and session if the session is valid, or
 *           an object containing `user` as `null` and `session` as `null` if the session is invalid.
 */
export const validateRequest = cache(
  async (): Promise<{ user: User | null; session: Session | null }> => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;

    if (!sessionId) {
      return {
        user: null,
        session: null,
      };
    }

    const result = await lucia.validateSession(sessionId);

    // Set the session cookie to the session id if it's fresh
    // Otherwise set the session cookie to a blank session cookie
    // This prevents next.js from throwing when attempting to set a cookie on a page
    // that doesn't require authentication
    try {
      if (result.session && result.session.fresh) {
        const sessionCookie = lucia.createSessionCookie(result.session.id);
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
      } else {
        const sessionCookie = lucia.createBlankSessionCookie();
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
      }
    } catch {}

    return result;
  }
);

/**
 * Signs the user in with the provided email and password.
 *
 * @param prevState - Unused
 * @param formData - A form data object containing the email and password of the user.
 *
 * @returns - A promise that resolves to a redirect to the dashboard route or an error object.
 */
export async function login(prevState: any, formData: FormData) {
  const rawFormData = {
    email: formData.get("email") as string | null,
    password: formData.get("password") as string | null,
  };

  // Checks if the user exists in the database.
  const [existingUser] = await db
    .select()
    .from(user)
    .where(eq(user.email, rawFormData.email!));

  if (!existingUser) {
    return {
      error: { message: "Invalid credentials" },
    };
  }

  // Checks if the user has signed in with Google.
  if (existingUser.google_sub) {
    return {
      error: { message: "Invalid credentials" },
    };
  }

  // Verifies the password.
  const validPassword = await verify(
    existingUser.hashed_password!,
    rawFormData.password!,
    {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    }
  );

  if (!validPassword) {
    return {
      error: { message: "Invalid credentials" },
    };
  }

  // Creates a session for the user.
  const session = await lucia.createSession(existingUser.id, {});

  // Sets the session cookie.
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  // Redirects the user to the dashboard route.
  return redirect("/dashboard");
}

/**
 * Signs the user up with the provided email and password.
 *
 * @param prevState - Unused.
 * @param formData - A form data object containing the email, name and password of the user.
 *
 * @returns - A promise that resolves to a redirect to the dashboard route or an error object.
 */
export async function signUp(prevState: any, formData: FormData) {
  const rawFormData = {
    name: formData.get("name") as string | null,
    email: formData.get("email") as string | null,
    password: formData.get("password") as string | null,
  };

  // Hashes the password.
  const hashedPassword = await hash(rawFormData.password!, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });

  // Checks if the user already exists in the database.
  const existingUser = await db
    .select()
    .from(user)
    .where(eq(user.email, rawFormData.email!));

  if (existingUser.length > 0)
    return {
      error: { message: "User already exists, Please try to login" },
    };

  // Inserts the user into the database.

  const [returnValue] = await db
    .insert(user)
    .values({
      name: rawFormData.name!,
      email: rawFormData.email!,
      hashed_password: hashedPassword,
      profile: `https://api.dicebear.com/7.x/initials/svg?seed=${rawFormData.name!}`,
    })
    .returning({ userId: user.id });

  // Creates a session for the user.
  const session = await lucia.createSession(returnValue.userId, {});

  // Sets the session cookie.
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  // Redirects the user to the dashboard route.
  return redirect("/dashboard");
}

/**
 * Signs the user out of their session.
 *
 * @returns - A redirect to the login route.
 */
export async function logout() {
  // Validates the user's session before signing out.
  const { session } = await validateRequest();
  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  //Invalidates the user's session.
  await lucia.invalidateSession(session.id);

  // Sets the session cookie to be a blank cookie.
  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/login");
}
