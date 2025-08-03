import {CreateStoryDto} from "@/utils/dtos"
import { NextRequest, NextResponse } from "next/server";
import {PrismaClient, Story} from '@prisma/client'
import prisma from '@/utils/db'
import { createStorySchema } from "@/utils/validationSchemas";
import {STORY_PER_PAGE} from "@/utils/constants"
import { verifyToken } from "@/utils/verifyToken";
/**
 * @method GET
 * @route ~/api/stories 
 * @desc Get stories by page 
 * @access public 
 */
export async function GET(request: NextRequest) {
try {
    const pageNumber = request.nextUrl.searchParams.get("pageNumber") || "1";

    const stories = await prisma.story.findMany({
        skip: STORY_PER_PAGE * (parseInt(pageNumber) - 1),
        take: STORY_PER_PAGE,
    });
    return NextResponse.json(stories, {status: 200})

} catch (error) {
    return NextResponse.json(
            { message: "internal server error"},
            { status: 500}
        )
}
}
/**
 * @method POST
 * @route ~/api/stories 
 * @desc Create new story
 * @access private (only admin can create story) 
 */
export async function POST(request: NextRequest) {
    try {
        const user = verifyToken(request);
        if(user === null || user.isAdmin === false) {
            return NextResponse.json(
                {message: 'only admin, access denied'},
                {status: 403}
            )
        }

        const body = (await request.json()) as CreateStoryDto;
        const validation = createStorySchema.safeParse(body);
            if (!validation.success) {
            return NextResponse.json({ message: validation.error?._zod.def[0].message }, { status: 400 });
            }
    const newStory: Story = await prisma.story.create({
        data: {
            title: body.title,
            description: body.description
        }
    })

    return NextResponse.json(newStory, {status: 201})
    } catch (error) {
        return NextResponse.json(
            { message: "internal server error"},
            { status: 500}
        )
        
    }
}