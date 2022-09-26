import React, { useState } from 'react';
import Header from '../components/Header';
import TableArticles from '../components/TableArticles';
import { articlesInterface, articlesResultInterface } from '../interfaces/articlesInterface';
import { fetchApi } from '../services/fetchApi';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import '../styles/Search.css';
import AdvancedPagination from '../components/AdvancedPagination';

const Search: React.FC = () => {
  const [articles, setArticles] = useState([]);
  const [searchArticles, setSearchArticles] = useState('');
  const [toggleFavorite, setToggleFavorite] = useState(false);
  const [showPagination, setShowPagination] = useState(false);
  const favorite = localStorage.getItem('favoriteArticles');
  const favoriteArticles = favorite === null ? [] : JSON.parse(favorite);

  const handleFavorite = ({ id, authors, types, title, description, URLs }: articlesResultInterface) => {
    if (!(favoriteArticles.some((article: { id: string; }) => article.id === id))) {
      localStorage.setItem('favoriteArticles', JSON.stringify([...favoriteArticles, {
        id,
        authors,
        types,
        title,
        description,
        URLs,
      }]));
    } else {
      localStorage.setItem('favoriteArticles', JSON.stringify(favoriteArticles
        .filter((article: { id: string; }) => article.id !== id)));
    }
    setToggleFavorite(!toggleFavorite);
  };

  const getArticles = async () => {
    const body = [
      {
        query: searchArticles,
        page: 1,
        pageSize: 10,
        scrollId: ''
      }
    ];
    const response = await fetchApi(body);
    const data = await response.json();
    const arrayArticles = data[0].data;
    const organizedArticles = arrayArticles.map(({
      id,
      authors,
      types,
      title,
      description,
      downloadUrl
    }: articlesInterface) => {
      return {
        id,
        authors,
        type: types,
        title,
        description: description || '',
        URLs: downloadUrl,
      };
    });
    setArticles(organizedArticles);
    setShowPagination(true);
  };

  const heartFavorite = ({
      id,
      authors,
      types,
      title,
      description,
      URLs
    }: articlesResultInterface) => {
    const heartColor = favoriteArticles.some((article: { id: string; }) => article.id === id)
    ? <AiFillHeart />: <AiOutlineHeart />;
    return (
      <span
        className="favorite-span"
        onClick={ () => handleFavorite({
          id,
          authors,
          types,
          title,
          description,
          URLs
        }) }
      >
        { heartColor }
      </span>
    )
  }

  return (
    <div>
      <Header />
      <div className="search-bar">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            aria-describedby="basic-addon2"
            value={ searchArticles }
            onChange={ ({ target }) => setSearchArticles(target.value) }
          />
          <div className="input-group-append">
            <span
              className="input-group-text"
              id="basic-addon2"
              onClick={ getArticles }
            >
              Search
            </span>
          </div>
        </div>
      </div>
      <TableArticles articles={ articles } iconFavorite={ heartFavorite } />
      <div className="pagination">
        { showPagination && <AdvancedPagination /> }
      </div>
    </div>
  );
};

export default Search;
