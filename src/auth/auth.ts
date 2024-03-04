import { Lucia } from "lucia";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { db } from "@/db";
import { session, user } from "@/db/schema";

const adapter = new DrizzlePostgreSQLAdapter(db, session, user);

export const lucia = new Lucia(adapter, {
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
