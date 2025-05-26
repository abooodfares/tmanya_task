import { config } from '../config/config';
import PodcastPreviewModel from '../model/podcastmodel';

const baseUrl = config.BASE_URL;

export const searchPodcasts = async (term: string) => {
  if (!term) {
    throw new Error('Search term is required');
  }

  const response = await fetch(
    `${baseUrl}?term=${encodeURIComponent(term)}&media=podcast&limit=20`
  );

  if (!response.ok) {
    throw new Error(`iTunes API responded with status: ${response.status}`);
  }

  const data = await response.json();

  const podcastPreviews = data.results.map((result: any) => ({
    collectionId: result.collectionId,
    collectionName: result.collectionName,
    artistName: result.artistName,
    artworkUrl600: result.artworkUrl600,
    primaryGenreName: result.primaryGenreName,
    trackCount: result.trackCount,
    releaseDate: result.releaseDate,
    feedUrl: result.feedUrl,
    collectionViewUrl: result.collectionViewUrl,
  }));

  let insertedCount = 0;

  for (const podcast of podcastPreviews) {
    const exists = await PodcastPreviewModel.exists({ collectionId: podcast.collectionId });

    if (!exists) {
      await PodcastPreviewModel.create(podcast);
      insertedCount++;
    }
  }

  return {
    insertedCount,
    totalFound: podcastPreviews.length,
    data: podcastPreviews,
  };
};
