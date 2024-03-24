import { Lucia, TimeSpan } from "lucia";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { db } from "@/db";
import { session, user } from "@/db/schema";
import { Google } from "arctic";

const redirectURI =
  process.env.NODE_ENV === "production"
    ? "https://clear-count.vercel.app/api/login/google/callback"
    : "http://localhost:3000/api/login/google/callback";

export const google = new Google(
  process.env.GOOGLE_CLIENT_ID!,
  process.env.GOOGLE_CLIENT_SECRET!,
  redirectURI
);

const adapter = new DrizzlePostgreSQLAdapter(db, session, user);

export const lucia = new Lucia(adapter, {
  sessionExpiresIn: new TimeSpan(2, "w"),
  sessionCookie: {
    attributes: {
      secure: process.env.NODE_ENV === "production", // set `Secure` flag in HTTPS
    },
  },
  getUserAttributes: (attributes) => {
    return {
      name: attributes.name,
      email: attributes.email,
      profile: attributes.profile,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: {
      name: string;
      email: string;
      profile: string;
    };
  }
}
