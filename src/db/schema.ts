import { integer, text, pgTable, date, timestamp } from "drizzle-orm/pg-core";
import { v4 as uuidV4 } from "uuid";

export const user = pgTable("user", {
  id: text("id")
    .notNull()
    .primaryKey()
    .$defaultFn(() => uuidV4()),
  name: text("name").notNull(),
  email: text("email").unique(),
  hashed_password: text("hashed_password"),
  profile: text("profile"),
  google_sub: text("google_sub"),
});

export const category = pgTable("category", {
  id: text("id")
    .notNull()
    .primaryKey()
    .$defaultFn(() => uuidV4()),
  name: text("name"),
  user_id: text("user_id")
    .notNull()
    .references(() => user.id),
});

export const transaction = pgTable("transaction", {
  id: text("id")
    .notNull()
    .primaryKey()
    .$defaultFn(() => uuidV4()),
  user_id: text("user_id")
    .notNull()
    .references(() => user.id),
  category_id: text("category_id").references(() => category.id),
  date: date("date"),
  amount: integer("amount"),
  description: text("description"),
  type: text("type", { enum: ["income", "expense"] }),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});
