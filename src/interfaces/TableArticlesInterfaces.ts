import { articlesResultInterface } from './articlesInterface';

export interface PropsInterface {
  articles: articlesResultInterface[];
  iconFavorite: (paramsArticles: articlesResultInterface) => JSX.Element;
};