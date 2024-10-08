import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

// The schema is normally optional, but Convex Auth
// requires indexes defined on `authTables`.
// The schema provides more precise TypeScript types.
export default defineSchema({
  ...authTables,
  messages: defineTable({
    userId: v.id("users"),
    body: v.string(),
    interviewId: v.string(),
    role: v.string(),
  }),
  audioFiles: defineTable({
    userId: v.id("users"),
    storageID: v.id("_storage"),
    format: v.string(),
  }),
  codingProblems: defineTable({
    problemId: v.string(),
    title: v.string(),
    description: v.string(),
    inputFormat: v.string(),
    outputFormat: v.string(),
    sampleInput: v.string(),
    sampleOutput: v.string()
  }),
  codeSubmissions: defineTable({
    userId: v.id("users"),
    problemId: v.string(),
    code: v.string(),
  }),
  interviews: defineTable({
    userId: v.string(),
    status: v.string(), // "ongoing" or "completed"
    startTime: v.number(),
    endTime: v.optional(v.number()),
  }),
});
