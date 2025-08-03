import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/db';


/**
 *  @method  GET
 *  @route   ~/api/stories/search?searchText=value
 *  @desc    Get Story By Search Text
 *  @access  public
 */
export async function GET(request: NextRequest) {
    try {
        const searchText = request.nextUrl.searchParams.get("searchText");
        let stories;
        if (searchText) {
            stories = await prisma.story.findMany({
                where: {
                    title: {
                        contains: searchText,
                        mode: "insensitive"
                    }
                }
            })
        } else {
            stories = await prisma.story.findMany({ take: 6 });
        }

        return NextResponse.json(stories, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: 'internal server error' },
            { status: 500 }
        )
    }
}