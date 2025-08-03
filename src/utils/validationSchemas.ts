import { z } from 'zod';

// Create Article Schema
export const createStorySchema = z.object({
    title: z.string()
    .min(1, { message: "title is required" })
    .min(2, { message: "title should be at least 2 characters long" })
    .max(200, { message: "title should be less than 200 characters" }),

    description: z.string().min(10, { message: "description should be at least 10 characters long" }),
});

// Register Schema
export const registerSchema = z.object({
    username: z.string().min(2).max(100), //.optional(),
    email: z.string().min(3).max(200).email(),
    password: z.string().min(6),
});

// Login Schema
export const loginSchema = z.object({
    email: z.string().min(3).max(200).email(),
    password: z.string().min(6),
});

// Create Comment Schema
export const createCommentShema = z.object({
    text: z.string().min(2).max(500),
    storyId: z.number(),
});

// Update User Profile Schema
export const updateUserSchema = z.object({
    username: z.string().min(2).max(100).optional(),
    email: z.string().min(3).max(200).email().optional(),
    password: z.string().min(6).optional(),
});