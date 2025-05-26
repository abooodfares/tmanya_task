export interface Podcast {
  collectionId: number;
  collectionName: string;
  artistName: string;
  artworkUrl600: string;
  primaryGenreName: string;
  trackCount: number;
  releaseDate: string;
  feedUrl: string;
  collectionViewUrl: string;
}

export interface SearchResponse {
  results: Podcast[];
  resultCount: number;
} 