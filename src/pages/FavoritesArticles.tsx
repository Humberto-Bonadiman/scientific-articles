import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import { AiFillHeart } from 'react-icons/ai';
import TableArticles from '../components/TableArticles';
import { articlesResultInterface } from '../interfaces/articlesInterface';
import '../styles/favoritesArticles.css';
import AdvancedPagination from '../components/AdvancedPagination';
import BasicPagination from '../components/BasicPagination';

const FavoritesArticles: React.FC = () => {
  const params = useParams();
  const [toggleFavorite, setToggleFavorite] = useState(false);
  const [showPagination, setShowPagination] = useState(false);
  const favorite = localStorage.getItem('favoriteArticles');
  const favoriteArticles = favorite === null ? [] : JSON.parse(favorite);
  console.log(favoriteArticles);
  const numberParams = Number(params.page);

  const handleFavorite = (id: string) => {
    localStorage.setItem(
      'favoriteArticles',
      JSON.stringify(favoriteArticles.filter((favArticle: { id: string }) => favArticle.id !== id)),
    );
    setToggleFavorite(!toggleFavorite);
  };

  const discoverNumberArticles = () => {
    const numberArticles = favoriteArticles.length;
    if (numberArticles <= 50) setShowPagination(false);
    if (numberArticles > 50) setShowPagination(true);
  };

  const numberPagination = Math.ceil(favoriteArticles.length / 10);

  const articlesPagination = () => {
    const firstPositionInPage = (numberParams * 10) - 10;
    const newFavorite = [];
    for (let number = firstPositionInPage; number <= numberParams * 10; number++) {
      if (favoriteArticles[number] != undefined) {
        newFavorite.push(favoriteArticles[number]);
      } else {
        break;
      }
    }
    return newFavorite;
  };

  const heartFavorite = ({ id }: articlesResultInterface, index: number) => {
    return (
      <span
        className='favorite-span'
        onClick={() => handleFavorite(id)}
        data-testid={`element-favorite-index-${index}`}
      >
        <AiFillHeart />
      </span>
    );
  };

  const nextPaginations = (nextPages: number) => {
    const firstPositionInPage = numberParams * 10 + nextPages * 10 - 10;
    if (!favoriteArticles[firstPositionInPage]) return false;
    return true;
  };

  useEffect(() => {
    discoverNumberArticles();
  }, []);

  return (
    <div>
      <Header />
      <div className='table-articles'>
        <TableArticles articles={articlesPagination()} iconFavorite={heartFavorite} />
      </div>
      <div className='pagination'>
        {!showPagination && (
          <BasicPagination numberPagination={numberPagination} active={numberParams} />
        )}
        {showPagination && (
          <AdvancedPagination
            active={numberParams}
            route={'favorites'}
            nextPages={nextPaginations}
          />
        )}
      </div>
    </div>
  );
};

export default FavoritesArticles;
