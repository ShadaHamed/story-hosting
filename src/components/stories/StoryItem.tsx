import Link from "next/link";
import { Story } from "@prisma/client";

interface StoryItemProps {
  story: Story;
}

const StoryItem = ({ story }: StoryItemProps) => {
  return (
    <div className="p-5 rounded-lg my-1 shadow-lg border-2 border-gray-400 hover:bg-slate-200 w-full md:w-2/5 lg:w-1/4">
      <h3 className="text-xl font-bold text-gray-900 line-clamp-1">
        {story.title}
      </h3>
      <p className="my-2 text-xl text-gray-700 p-1 line-clamp-1">
        {story.description}
      </p>
      <Link className="text-xl bg-purple-700 hover:bg-purple-800 w-full block text-center p-1 text-white rounded-lg" href={`/stories/${story.id}`}>
        Read More
      </Link>
    </div>
  )
}

export default StoryItem;