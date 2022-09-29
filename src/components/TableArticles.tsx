import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import { PropsInterface } from '../interfaces/TableArticlesInterfaces';

const TableArticles: React.FC<PropsInterface> = ({ articles, iconFavorite }) => {
  console.log(articles);

  const resultTable = () => articles.map(({
    id,
    authors,
    types,
    title,
    description,
    URLs
  }, index) => {
    return (
      <tr key={ id }>
        <td data-testid={`element-table-td-authors-${index}`}>
          { authors }
        </td>
        <td data-testid="element-table-td-types">
          { types }
        </td>
        <td data-testid="element-table-td-title">
          { title }
        </td>
        <td data-testid="element-table-td-description">
          { description }
        </td>
        <td data-testid="element-table-td-urls">
          <a href={ URLs } target="_blank" rel="noopener noreferrer">{ URLs }</a>
        </td>
        <td data-testid="element-table-td-favorite">
          { iconFavorite({
              id,
              authors,
              types,
              title,
              description,
              URLs
            }, index) }
        </td>
      </tr>
    );
  });

  return (
    <Table responsive>
      <thead>
        <tr className="text-center">
          <th data-testid="element-table-th-authors">Authors</th>
          <th data-testid="element-table-th-type">Type</th>
          <th data-testid="element-table-th-title">Title</th>
          <th data-testid="element-table-th-description">Description</th>
          <th data-testid="element-table-th-urls">URLs</th>
          <th data-testid="element-table-th-favorite">Favorite</th>
        </tr>
      </thead>
      <tbody data-testid="element-table-tbody">
        { resultTable() }
      </tbody>
    </Table>
  );
};

TableArticles.propTypes = {
  articles: PropTypes.any
}

export default TableArticles;
