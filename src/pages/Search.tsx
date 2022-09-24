import React from 'react';
import Header from '../components/Header';
import '../styles/Search.css';

const Search: React.FC = () => {
  return (
    <div>
      <Header />
      <div className="search-bar">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            aria-describedby="basic-addon2"
          />
          <div className="input-group-append">
            <span className="input-group-text" id="basic-addon2">Pesquisar</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
