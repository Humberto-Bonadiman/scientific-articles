import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import { PropsInterface } from '../interfaces/TableArticlesInterfaces';

const TableArticles: React.FC<PropsInterface> = ({ articles, iconFavorite }) => {

  const resultTable = () => articles.map(({
    id,
    authors,
    types,
    title,
    description,
    URLs
  }) => {
    return (
      <tr key={ id }>
        <td>
          { authors }
        </td>
        <td>
          { types }
        </td>
        <td>
          { title }
        </td>
        <td>
          { description }
        </td>
        <td>
          <a href={ URLs } target="_blank" rel="noopener noreferrer">{ URLs }</a>
        </td>
        <td>
          { iconFavorite({
              id,
              authors,
              types,
              title,
              description,
              URLs
            }) }
        </td>
      </tr>
    )
  });

  return (
    <Table responsive>
      <thead>
        <tr className="text-center">
          <th>Authors</th>
          <th>Type</th>
          <th>Title</th>
          <th>Description</th>
          <th>URLs</th>
          <th>Favorite</th>
        </tr>
      </thead>
      <tbody>
        { resultTable() }
      </tbody>
    </Table>
  );
};

TableArticles.propTypes = {
  articles: PropTypes.any
}

export default TableArticles;
