import React, { useState } from 'react';
import Header from '../components/Header';
import { AiFillHeart } from 'react-icons/ai';
import TableArticles from '../components/TableArticles';
import { articlesResultInterface } from '../interfaces/articlesInterface';
import '../styles/FavoritesArticles.css'

const FavoritesArticles: React.FC = () => {
  const [toggleFavorite, setToggleFavorite] = useState(false);
  const favorite = localStorage.getItem('favoriteArticles');
  const favoriteArticles = favorite === null ? [] : JSON.parse(favorite);

  const handleFavorite = (id: string) => {
    localStorage.setItem('favoriteArticles', JSON.stringify(favoriteArticles
      .filter((favArticle: { id: string; }) => favArticle.id !== id)));
    setToggleFavorite(!toggleFavorite);
  };

  const heartFavorite = ({ id }: articlesResultInterface) => {
  return (
    <span
      className="favorite-span"
      onClick={ () => handleFavorite(id) }
    >
      <AiFillHeart />
    </span>
  )
}

  return (
    <div>
      <Header />
      <div className="table-articles">
        <TableArticles articles={ favoriteArticles } iconFavorite={ heartFavorite } />
      </div>
    </div>
  );
};

export default FavoritesArticles;
