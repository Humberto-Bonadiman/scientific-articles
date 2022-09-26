import Pagination from 'react-bootstrap/Pagination';

function AdvancedPagination() {
  return (
    <Pagination>
      <Pagination.Prev />
      <Pagination.Item>{1}</Pagination.Item>

      <Pagination.Item>{11}</Pagination.Item>
      <Pagination.Item active>{12}</Pagination.Item>
      <Pagination.Item>{13}</Pagination.Item>

      <Pagination.Item>{15}</Pagination.Item>
      <Pagination.Next />
    </Pagination>
  );
}

export default AdvancedPagination;