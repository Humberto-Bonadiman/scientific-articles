export interface articlesInterface {
  id: string;
  authors: string[];
  types: string[] | [];
  title: string;
  description?: string;
  downloadUrl: string;
}

export interface articlesResultInterface {
  id: string;
  authors?: string[];
  types?: string[] | [];
  title?: string;
  description?: string;
  URLs?: string;
}