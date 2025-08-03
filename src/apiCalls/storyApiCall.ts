import { Story } from '@prisma/client';
import { DOMAIN } from '@/utils/constants';
import { SingleStory } from '@/utils/types';


// Get stories based on pageNumber
export async function getStories(pageNumber: string | undefined): Promise<Story[]> {
  const response = await fetch(
    `${DOMAIN}/api/stories?pageNumber=${pageNumber}`,
     { cache: 'no-store' }
    );

  if (!response.ok) {
    throw new Error("Failed to fetch stories");
  }

  return response.json();
}

// Get stories count
export async function getStoriesCount(): Promise<number> {
  const response = await fetch(`${DOMAIN}/api/stories/count`, { cache: 'no-store' });

  if (!response.ok) {
    throw new Error("Failed to get stories count");
  }

  const { count } = await response.json() as { count: number };
  return count;
}

// Get stories based on searchText
export async function getStoriesBasedOnSearch(searchText: string): Promise<Story[]> {
  const response = await fetch(`${DOMAIN}/api/stories/search?searchText=${searchText}`);

  if (!response.ok) {
    throw new Error("Failed to fetch stories");
  }

  return response.json();
}

// Get single story by id
export async function getSingleStory(storyId: string): Promise<SingleStory> {
  const response = await fetch(`${DOMAIN}/api/stories/${storyId}`, {
    cache: 'no-store'
  });

  if (!response.ok) {
    throw new Error("Failed to fetch story");
  }

  return response.json();
}