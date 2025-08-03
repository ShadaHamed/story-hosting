import { getStoriesBasedOnSearch } from '@/apiCalls/storyApiCall';
import { Story } from '@prisma/client';
import StoryItem from '@/components/stories/StoryItem';

interface SearchStoryPageProps {
  searchParams: { searchText: string };
}

const SearchStoryPage = async ({ searchParams: { searchText } }: SearchStoryPageProps) => {
  const stories: Story[] = await getStoriesBasedOnSearch(searchText);

  return (
    <section className="fix-height container m-auto px-5">
      {stories.length === 0 ? (
        <h2 className='text-gray-800 text-2xl font-bold p-5'>
          Stories based on
          <span className='text-red-500 mx-1'>{searchText}</span>
          not found
        </h2>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-2 mt-7 text-gray-800">
            Stories based on
            <span className='ms-1 text-green-700 text-3xl font-bold'>{searchText}</span>
          </h1>
          <div className='flex items-center justify-center flex-wrap gap-7'>
            {stories.map(item => (
              <StoryItem key={item.id} story={item} />
            ))}
          </div>
        </>
      )}
    </section>
  )
}

export default SearchStoryPage