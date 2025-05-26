import { API_BASE_URL } from './constants';
import type { SearchResponse } from '../types/podcast';

export const fetchPodcasts = async (searchTerm: string): Promise<SearchResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/search?term=${encodeURIComponent(searchTerm)}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const responseData = await response.json();
    
    // تحويل البيانات من الخادم المحلي إلى الشكل المطلوب
    return {
      resultCount: responseData.data.totalFound,
      results: responseData.data.data.map((item: any) => ({
        collectionId: item.collectionId,
        collectionName: item.collectionName,
        artistName: item.artistName,
        artworkUrl600: item.artworkUrl600,
        primaryGenreName: item.primaryGenreName,
        trackCount: item.trackCount,
        releaseDate: item.releaseDate,
        feedUrl: item.feedUrl,
        collectionViewUrl: item.collectionViewUrl
      }))
    };
  } catch (error) {
    console.error('Error fetching podcasts:', error);
    throw error;
  }
}; 