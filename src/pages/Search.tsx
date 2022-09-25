import React, { useState } from 'react';
import Header from '../components/Header';
import TableArticles from '../components/TableArticles';
import { articlesInterface } from '../interfaces/articlesInterface';
import { fetchApi } from '../services/fetchApi';
import '../styles/Search.css';

const Search: React.FC = () => {
  const [articles, setArticles] = useState([]);
  const [searchArticles, setSearchArticles] = useState('');

  const getArticles = async () => {
    const body = [
      {
        query: searchArticles,
        page: 0,
        pageSize: 0,
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
    console.log(organizedArticles);
    setArticles(organizedArticles);
  };

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
      <TableArticles articles={ articles } />
    </div>
  );
};

export default Search;
