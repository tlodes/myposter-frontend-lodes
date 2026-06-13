/**
 * Types describing the `/web-api/job-interview` response.
 * Derived from the OpenAPI spec in `src/mockups/api.json`.
 */

export interface BlogImages {
  portrait: string[];
  landscape: string[];
}

export interface Article {
  id: number;
  author: string;
  title: string;
  /** ISO date string, e.g. "2024-08-06". */
  dateAdded: string;
  images: BlogImages;
  likes: number;
}

export interface ApiMessage {
  status: string;
  text: string;
  code: string;
}

export interface ArticleResponse {
  message: ApiMessage;
  payload: {
    data: Article[];
  };
}

/** Sorting options offered by the function bar dropdown. */
export type SortOption = 'default' | 'author' | 'date-desc' | 'date-asc';
