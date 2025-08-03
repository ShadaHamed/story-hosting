import { UpdateStoryDto } from '@/utils/dtos';
import {NextRequest, NextResponse} from 'next/server';
import prisma from '@/utils/db';
import { verifyToken } from '@/utils/verifyToken';

interface Props {
    params: { id: string }
}

/**
 * @method GET
 * @route ~/api/stories/:id
 * @desc Get Single story by id
 * @access public 
 */

export async function GET(request: NextRequest, {params} : Props) {
    try {
       const story = await prisma.story.findUnique({
        where: { id: parseInt(params.id)},
        include: {
            comments: {
                include: {
                    user: {
                        select: {
                            username: true,
                        }
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                }
            }
        }})
     if (!story) {
            return NextResponse.json({ message: 'story not found' }, { status: 404 });
        }

        return NextResponse.json(story, { status: 200 }); 
    } catch (error) {
         return NextResponse.json(
            { message: "internal server error"},
            { status: 500}
        )
    }
}

/**
 * @method PUT
 * @route ~/api/stories/:id
 * @desc update story 
 * @access private (only admin can create story) 
 */

export async function PUT(request: NextRequest, {params} : Props) {
    try {
          const user = verifyToken(request);
                if(user === null || user.isAdmin === false) {
                    return NextResponse.json(
                        {message: 'only admin, access denied'},
                        {status: 403}
                    )
                }
        const story = await prisma.story.findUnique({
        where: {id:parseInt(params.id)}
    })
    if (!story) {
            return NextResponse.json({ message: 'story not found' }, { status: 404 });
        }
    
    const body = (await request.json()) as UpdateStoryDto;
    const updatedStory = await prisma.story.update({
        where:{ id : parseInt(params.id) },
        data: {
            title: body.title,
            description: body.description
        }
    })


    return NextResponse.json(updatedStory, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "internal server error"},
            { status: 500}
        ) 
    }
}


/**
 * @method DELETE
 * @route ~/api/stories/:id
 * @desc delete story 
 * @access private (only admin can create story) 
 */

export async function DELETE(request: NextRequest, {params} : Props) {
    try {
          const user = verifyToken(request);
        if(user === null || user.isAdmin === false) {
            return NextResponse.json(
                {message: 'only admin, access denied'},
                {status: 403}
            )
        }
        
        const story = await prisma.story.findUnique({
        where: {id:parseInt(params.id)},
        include: { comments: true }

    })
    if (!story) {
            return NextResponse.json({ message: 'story not found' }, { status: 404 });
        }
    await prisma.story.delete({where: {id: parseInt(params.id)}})

    // deleting the comments that belong to this article
        const commentIds: number[] = story?.comments.map(comment => comment.id);
        await prisma.comment.deleteMany({
            where: { id: { in: commentIds }}
        });

    return NextResponse.json({message: 'story deleted'}, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "internal server error"},
            { status: 500}
        ) 
    }
}