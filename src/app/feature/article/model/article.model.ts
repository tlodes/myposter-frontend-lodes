export interface BlogImages {
  portrait: string[];
  landscape: string[];
}

export interface Article {
  id: number;
  author: string;
  title: string;
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

export type SortOption = 'default' | 'author' | 'date-desc' | 'date-asc';
