import { API_BASE_URL } from './constants';

export const fetchPodcasts = async (searchTerm: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/search?term=${encodeURIComponent(searchTerm)}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching podcasts:', error);
    throw error;
  }
}; 