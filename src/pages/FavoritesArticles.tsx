import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import { AiFillHeart } from 'react-icons/ai';
import TableArticles from '../components/TableArticles';
import { articlesResultInterface } from '../interfaces/articlesInterface';
import '../styles/FavoritesArticles.css'
import AdvancedPagination from '../components/AdvancedPagination';
import BasicPagination from '../components/BasicPagination';

const FavoritesArticles: React.FC = () => {
  const params = useParams();
  const [toggleFavorite, setToggleFavorite] = useState(false);
  const [showPagination, setShowPagination] = useState(false);
  const favorite = localStorage.getItem('favoriteArticles');
  const favoriteArticles = favorite === null ? [] : JSON.parse(favorite);

  const handleFavorite = (id: string) => {
    localStorage.setItem('favoriteArticles', JSON.stringify(favoriteArticles
      .filter((favArticle: { id: string; }) => favArticle.id !== id)));
    setToggleFavorite(!toggleFavorite);
  };

  const discoverNumberArticles = () => {
    const numberArticles = favoriteArticles.length;
    if (numberArticles <= 50) setShowPagination(false);
    if (numberArticles > 50) setShowPagination(true);
  };

  const numberPagination = Math.ceil(favoriteArticles.length / 10);

  const articlesPagination = () => {
    const numberParams = Number(params.page);
    const firstPositionInPage = (numberParams * 10) - 9;
    const newFavorite = [];
    for (let number = firstPositionInPage; number <= (numberParams * 10); number++) {
      if(favoriteArticles[number] != undefined) {
        newFavorite.push(favoriteArticles[number]);
      } else {
        break;
      }
    }
    return newFavorite;
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
  };

  useEffect(() => {
    discoverNumberArticles();
  }, []);

  return (
    <div>
      <Header />
      <div className="table-articles">
        <TableArticles articles={ articlesPagination() } iconFavorite={ heartFavorite } />
      </div>
      <div className="pagination">
        {
          !showPagination &&
          <BasicPagination
            numberPagination={ numberPagination }
            active={Number(params.page)}
          />
        }
        { showPagination && <AdvancedPagination /> }
      </div>
    </div>
  );
};

export default FavoritesArticles;
