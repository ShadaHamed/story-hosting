import StoryItem from "@/components/stories/StoryItem";
import SearchStoryInput from "@/components/stories/SearchStoryInput";
import Pagination from "@/components/stories/Pagination";
import { Story } from "@prisma/client";
import { getStories, getStoriesCount } from "@/apiCalls/storyApiCall";
import { STORY_PER_PAGE } from "@/utils/constants";
import prisma from "@/utils/db";

interface StoriesPageProps {
  searchParams: { pageNumber: string }
}

const StoriesPage = async({ searchParams } : StoriesPageProps) => {
  const { pageNumber } = searchParams;
  const stories: Story[] = await getStories(pageNumber);
  const count:number = await prisma?.story.count();

  const pages = Math.ceil(count / STORY_PER_PAGE);  
    
  return (
    <section className="container m-auto px-5">
        <SearchStoryInput />
        <div className="flex items-center justify-center flex-wrap gap-7">
        {stories.slice(0,6).map(story => (
            <StoryItem story={story} key={story.id}/>
        ))}
        </div>
        <Pagination pageNumber={parseInt(pageNumber)} route='stories' pages={pages}/>
    </section>
  )
}

export default StoriesPage