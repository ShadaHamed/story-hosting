import { Story, Comment, User } from "@prisma/client";

export type JWTPayload = {
    id: number;
    isAdmin:boolean;
    username:string

}

export type CommentWithUser = Comment & { user: User };

export type SingleStory = Story & { comments: CommentWithUser[] };