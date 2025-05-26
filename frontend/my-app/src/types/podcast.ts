export interface Podcast {
  id: string;
  title: string;
  author: string;
  description: string;
  imageUrl: string;
  audioUrl: string;
}

export interface SearchResponse {
  results: Podcast[];
  resultCount: number;
} 