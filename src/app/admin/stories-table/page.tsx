import { STORY_PER_PAGE } from "@/utils/constants";
import { Story } from "@prisma/client";
import Link from "next/link";
import { getStories } from '@/apiCalls/storyApiCall';
import Pagination from "@/components/stories/Pagination";
import DeleteArticleButton from "./DeleteArticleButton";
import prisma from "@/utils/db";

interface AdminStoriesTableProps {
  searchParams: { pageNumber: string };
}

const AdminStoriesTable = async ({ searchParams: { pageNumber } }: AdminStoriesTableProps) => {

  const stories: Story[] = await getStories(pageNumber);
  const count: number = await prisma.story.count();
  const pages = Math.ceil(count / STORY_PER_PAGE);


  return (
    <section className="p-5">
      <h1 className="mb-7 text-2xl font-semibold text-gray-700">Stories</h1>
      <table className="table w-full text-left">
        <thead className="border-t-2 border-b-2 border-gray-500 lg:text-xl">
          <tr>
            <th className="p-1 lg:p-2">Title</th>
            <th className="hidden lg:inline-block lg:p-2">Created At</th>
            <th>Actions</th>
            <th className="hidden lg:inline-block"></th>
          </tr>
        </thead>
        <tbody>
          {stories.map(story => (
            <tr key={story.id} className="border-b border-t border-gray-300">
              <td className="p-3 text-gray-700">{story.title}</td>
              <td className="hidden lg:inline-block text-gray-700 font-normal p-3">
                {new Date(story.createdAt).toDateString()}
              </td>
              <td className="p-3">
                <Link
                  href={`/admin/stories-table/edit/${story.id}`}
                  className="bg-green-600 text-white rounded-lg py-1 px-2 inline-block text-center mb-2 me-2 lg:me-3 hover:bg-green-800 transition"
                >
                  Edit
                </Link>
                <DeleteArticleButton storyId={story.id} />
              </td>
              <td className="hidden lg:inline-block p-3">
                <Link
                  href={`/stories/${story.id}`}
                  className="text-white bg-blue-600 rounded-lg p-2 hover:bg-blue-800"
                >
                  Read More
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        pageNumber={parseInt(pageNumber)}
        pages={pages}
        route="/admin/stories-table"
      />
    </section>
  )
}

export default AdminStoriesTable