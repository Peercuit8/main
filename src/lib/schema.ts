import { z } from "zod";

const urlRegex = /^https?:\/\//i;
const shortUrlRegex = /^(github\.com|twitter\.com|x\.com|linkedin\.com|behance\.net|dribbble\.com|instagram\.com|youtube\.com|read\.cv|bento\.me|substack\.com|gitlab\.com)\//i;

export const applicationSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Please enter your full name (at least 2 characters)" })
    .max(100, { message: "Name is too long" }),
  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .max(100, { message: "Email is too long" }),
  school: z
    .string()
    .min(2, { message: "Please provide your school, college, or university" })
    .max(150, { message: "School name is too long" }),
  grade: z
    .string()
    .min(1, { message: "Please select your current grade or year" }),
  age: z
    .string()
    .optional()
    .or(z.literal("")),
  location: z
    .string()
    .min(2, { message: "Please enter your City and Country (e.g., Mumbai, India or Austin, USA)" })
    .max(100, { message: "Location is too long" }),
  currentWork: z
    .string()
    .min(10, { message: "Tell us a bit more about what you're working on or exploring (at least 10 characters)" })
    .max(1000, { message: "Please keep this under 1000 characters" }),
  whyJoin: z
    .string()
    .min(10, { message: "Tell us why you want to be part of Peercuit (at least 10 characters)" })
    .max(1000, { message: "Please keep this under 1000 characters" }),
  referral: z
    .string()
    .min(1, { message: "Please tell us how you heard about Peercuit" }),
  portfolioLink: z
    .string()
    .optional()
    .refine(
      (val) => !val || val === "" || urlRegex.test(val) || shortUrlRegex.test(val),
      { message: "Please provide a valid URL" }
    ),
  links: z
    .array(
      z.string().refine(
        (val) => !val || val === "" || urlRegex.test(val) || shortUrlRegex.test(val),
        { message: "Please provide a valid URL" }
      )
    )
    .optional(),
});

export type ApplicationInput = z.infer<typeof applicationSchema>;

export interface StoredApplication extends ApplicationInput {
  id: string;
  createdAt: string;
  ipAddress?: string;
  status: "pending" | "reviewed" | "accepted" | "rejected";
}

export const GRADE_OPTIONS = [
  "High School (9th - 10th Grade)",
  "High School (11th - 12th Grade)",
  "College Freshman (1st Year)",
  "College Sophomore (2nd Year)",
  "College Junior (3rd Year)",
  "College Senior (4th Year / Final Year)",
  "Graduate / Master's Student",
  "Gap Year / Self-Directed Learner",
] as const;

export const REFERRAL_OPTIONS = [
  "Friend / Word of mouth",
  "Instagram",
  "Twitter / X",
  "Campus Ambassador / Student Club",
  "LinkedIn",
  "Hackathon / Event",
  "Other",
] as const;
