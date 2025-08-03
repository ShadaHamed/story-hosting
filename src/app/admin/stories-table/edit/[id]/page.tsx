import { getSingleStory } from '@/apiCalls/storyApiCall';
import { Story } from '@prisma/client';
import EditStoryForm from './EditStoryFrom';

interface EditStoryPageProps {
    params: { id: string };
}

const EditArticlePage = async ({ params } : EditStoryPageProps) => {

  const story: Story = await getSingleStory(params.id);


  return (
    <section className='fix-height flex items-center justify-center px-5 lg:px-20'>
      <div className='shadow p-4 bg-purple-200 rounded w-full'>
        <h2 className='text-2xl text-green-700 font-semibold mb-4'>
            Edit Article
        </h2>
        <EditStoryForm story={story} />
      </div>
    </section>
  )
}

export default EditArticlePage