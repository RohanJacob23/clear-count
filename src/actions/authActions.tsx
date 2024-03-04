"use server";

import { lucia } from "@/auth/auth";
import { db } from "@/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { User, Session } from "lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Argon2id } from "oslo/password";
import { cache } from "react";

export const validateRequest = cache(
  async (): Promise<
    { user: User; session: Session } | { user: null; session: null }
  > => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;

    if (!sessionId) {
      return {
        user: null,
        session: null,
      };
    }

    const result = await lucia.validateSession(sessionId);
    // next.js throws when you attempt to set cookie when rendering page
    try {
      if (result.session && result.session.fresh) {
        const sessionCookie = lucia.createSessionCookie(result.session.id);
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
      }
      if (!result.session) {
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

export const login = async (prevState: any, formData: FormData) => {
  const rawFormData = {
    email: formData.get("email") as string | null,
    password: formData.get("password") as string | null,
  };

  const [existingUser] = await db
    .select()
    .from(user)
    .where(eq(user.email, rawFormData.email!));

  if (!existingUser)
    return {
      error: { message: "Invalid credentials" },
    };

  const validPassword = await new Argon2id().verify(
    existingUser.hashed_password!,
    rawFormData.password!
  );
  if (!validPassword) {
    return {
      error: { message: "Invalid credentials" },
    };
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/dashboard");
};

export const signUp = async (prevState: any, formData: FormData) => {
  const rawFormData = {
    name: formData.get("name") as string | null,
    email: formData.get("email") as string | null,
    password: formData.get("password") as string | null,
  };

  const hashedPassword = await new Argon2id().hash(rawFormData.password!);
  const existingUser = await db
    .select()
    .from(user)
    .where(eq(user.email, rawFormData.email!));

  if (existingUser.length > 0)
    return { error: { message: "User already exists, Please try to login" } };

  const [returnValue] = await db
    .insert(user)
    .values({
      name: rawFormData.name!,
      email: rawFormData.email!,
      hashed_password: hashedPassword,
      profile: `https://api.dicebear.com/7.x/initials/svg?seed=${rawFormData.name!}`,
    })
    .returning({ userId: user.id });

  const session = await lucia.createSession(returnValue.userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/dashboard");
};

export const logout = async () => {
  const { session } = await validateRequest();
  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/login");
};
