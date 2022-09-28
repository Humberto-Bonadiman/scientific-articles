import { articlesResultInterface } from './articlesInterface';

export interface PropsInterface {
  articles: articlesResultInterface[];
  iconFavorite: (paramsArticles: articlesResultInterface, index: number) => JSX.Element;
};