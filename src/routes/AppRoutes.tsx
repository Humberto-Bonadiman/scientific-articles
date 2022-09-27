import React from 'react';
import { BrowserRouter as Router, useRoutes, Navigate } from 'react-router-dom';
import FavoritesArticles from '../pages/FavoritesArticles';
import Search from '../pages/Search';

const App: React.FC = () => {
  return useRoutes([
    { path: '/', element: <Navigate to="/search/1" /> },
    { path: '/search/:page', element: <Search /> },
    { path: '/favorites/:page', element: <FavoritesArticles /> }
  ]);
};

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppRoutes;