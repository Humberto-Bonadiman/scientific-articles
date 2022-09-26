import PropTypes from 'prop-types';
import Pagination from 'react-bootstrap/Pagination';
import { BasicInterface } from '../interfaces/basicPaginationInterface';

const BasicPagination: React.FC<BasicInterface> = ({ numberPagination, active }) => {
  const items = [];
  for (let number = 1; number <= numberPagination; number++) {
    items.push(
      <Pagination.Item href={`/favorites/${number}`} key={number} active={number === active}>
        {number}
      </Pagination.Item>,
    );
  }

  return(
    <div>
      <Pagination>{items}</Pagination>
    </div>
  );
};

BasicPagination.propTypes = {
  numberPagination: PropTypes.any,
  active: PropTypes.any
}

export default BasicPagination;