import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./src/drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url:
      process.env.DATABASE_URL ??
      "postgresql://programmingwithjack:K3XubNjqrU5D@ep-solitary-feather-a1bfbwv7.ap-southeast-1.aws.neon.tech/clear%20count?sslmode=require",
  },
});
