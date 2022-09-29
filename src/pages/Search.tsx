import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import TableArticles from '../components/TableArticles';
import { articlesInterface, articlesResultInterface } from '../interfaces/articlesInterface';
import { fetchApi } from '../services/fetchApi';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import AdvancedPagination from '../components/AdvancedPagination';
import Loader from 'react-ts-loaders';
import '../styles/search.css';

const Search: React.FC = () => {
  const params = useParams();
  const [articles, setArticles] = useState([]);
  const [searchArticles, setSearchArticles] = useState('');
  const [toggleFavorite, setToggleFavorite] = useState(false);
  const [showPagination, setShowPagination] = useState(false);
  const [loading, setLoading] = useState(false);
  const favorite = localStorage.getItem('favoriteArticles');
  const favoriteArticles = favorite === null ? [] : JSON.parse(favorite);
  const getSearch = localStorage.getItem('searchArticles') || '{"name":"John"}';
  const search = JSON.parse(getSearch);
  const page = Number(params.page);

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

  const fetchFunction = async (querySearch: string, page: number) => {
    setLoading(true);
    const body = [
      {
        query: querySearch,
        page: page,
        pageSize: 10,
        scrollId: ''
      }
    ];
    const response = await fetchApi(body);
    const data = await response.json();
    return data[0].data;
  }

  const getArticles = async () => {
    let chooseSearch;
    if (page !== 1) chooseSearch = search;
    if (page === 1) {
      chooseSearch = searchArticles;
      localStorage.setItem('searchArticles', JSON.stringify(searchArticles));
    }
    const arrayArticles = await fetchFunction(chooseSearch, page);
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
    setLoading(false);
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
    }: articlesResultInterface,
    index: number) => {
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
        data-testid={`element-favorite-index-${index}`}
      >
        { heartColor }
      </span>
    )
  };

  const nextPaginations = async (numberSum: number) => {
    const pageSumFour = page + numberSum;
    const resultFunction = await fetchFunction(search, pageSumFour);
    if (resultFunction === null) return false;
    return true;
  }

  useEffect(() => {
    if (page > 1) {
      getArticles();
    }
  }, []);

  return (
    <div>
      <Header />
      <div className="search-bar">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            data-testid="element-input-form-control"
            aria-describedby="basic-addon2"
            value={ searchArticles }
            onChange={ ({ target }) => setSearchArticles(target.value) }
          />
          <div className="input-group-append">
            <span
              className="input-group-text"
              data-testid="element-span-search-button"
              id="basic-addon2"
              onClick={ getArticles }
            >
              Search
            </span>
          </div>
        </div>
      </div>
      <TableArticles articles={ articles } iconFavorite={ heartFavorite } />
      { loading && <Loader type="ring" color="blue" /> }
      <div className="pagination">
        { showPagination && <AdvancedPagination
            active={page}
            route={'search'}
            pages={ nextPaginations }
          />
        }
      </div>
    </div>
  );
};

export default Search;
