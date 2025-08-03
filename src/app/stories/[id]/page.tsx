//import { getSingleArticle } from "@/apiCalls/articleApiCall";
import AddCommentForm from "@/components/comments/AddCommentForm";
import CommentItem from "@/components/comments/CommentItem";
import { SingleStory } from "@/utils/types";
import { cookies } from "next/headers";
import { verifyTokenForPage } from "@/utils/verifyToken";
import prisma from "@/utils/db";
import { redirect } from "next/navigation";

interface SingleStoryPageProps {
    params: { id: string }
}

const SingleStoryPage = async ({ params }: SingleStoryPageProps) => {
    const token = cookies().get("jwtToken")?.value || "";
    const payload = verifyTokenForPage(token);

    //using API
    //const article: SingleArticle = await getSingleArticle(params.id);

    //by sending query to DB from server component
    const story = await prisma.story.findUnique({
        where: { id: parseInt(params.id) },
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
        }
    }) as SingleStory;

    if(!story){
       redirect("/not-found");
    }
   
    return (
        <section className="fix-height container m-auto w-full px-5 pt-8 md:w-3/4">
            <div className="bg-white p-7 rounded-lg mb-7">
                <h1 className="text-3xl font-bold text-gray-700 mb-2">
                    {story.title}
                </h1>
                <div className="text-gray-400">
                    {new Date(story.createdAt).toDateString()}
                </div>
                <p className="text-gray-800 text-xl mt-5">{story.description}</p>
            </div>
            <div className="mt-7">
                {payload ? (
                    <AddCommentForm storyId={story.id} />
                ) : (
                    <p className="text-blue-600 md:text-xl">
                        to write a comment you should log in first
                    </p>
                )}
            </div>
            <h4 className="text-xl text-gray-800 ps-1 font-semibold mb-2 mt-7">
                Comments
            </h4>
            {story.comments.map(comment => (
                <CommentItem key={comment.id} comment={comment} userId={payload?.id} />
            ))}
        </section>
    )
}

export default SingleStoryPage;