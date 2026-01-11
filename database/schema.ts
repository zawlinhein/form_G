import { InferSelectModel, relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const formSettings = pgTable("form_settings", {
  id: uuid("id").primaryKey().defaultRandom(),
  primaryColor: varchar("primary_color", { length: 7 }).notNull(),
  backgroundColor: varchar("background_color", { length: 7 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const forms = pgTable("forms", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: varchar("user_id", { length: 255 }).notNull(),
  userName: varchar("user_name", { length: 255 }).notNull(),

  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").default(""),
  jsonBlock: text("json_block").notNull().default("[]"),
  views: integer("views").default(0).notNull(),
  responses: integer("responses").default(0).notNull(),
  published: boolean("published").default(false).notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),

  settingId: uuid("setting_id").references(() => formSettings.id, {
    onDelete: "set null",
  }),
});

export const formResponses = pgTable("form_responses", {
  id: uuid("id").primaryKey().defaultRandom(),
  formId: uuid("form_id").references(() => forms.id, {
    onDelete: "cascade",
  }),
  responseData: text("response_data").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const formsRealtion = relations(forms, ({ one, many }) => ({
  setting: one(formSettings, {
    fields: [forms.settingId],
    references: [formSettings.id],
  }),
  responses: many(formResponses),
}));

export const formSettingsRelation = relations(formSettings, ({ many }) => ({
  forms: many(forms),
}));

export const formResponsesRelation = relations(formResponses, ({ one }) => ({
  form: one(forms, {
    fields: [formResponses.formId],
    references: [forms.id],
  }),
}));

export type Form = InferSelectModel<typeof forms>;
export type FormSetting = InferSelectModel<typeof formSettings>;
export type FormResponse = InferSelectModel<typeof formResponses>;
export type FormWithSetting = Form & { setting: FormSetting };
