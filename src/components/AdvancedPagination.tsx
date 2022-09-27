import React, { useEffect, useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';


interface AdvancedInterface {
  active: number;
  route: string;
};

const AdvancedPagination: React.FC<AdvancedInterface> = ({ active, route }) => {
  const [showFirst, setShowFirst] = useState(false);
  const [showSecond, setShowSecond] = useState(false);

  const isEqualOne = () => {
    if (active === 1) {
      setShowFirst(false);
    } else {
      setShowFirst(true);
    }
  };

  const isEqualTwo = () => {
    if (active === 2) {
      setShowSecond(false);
    } else {
      setShowSecond(true);
    }
  }

  const lastPagination = active + 5 >= 100 ? 100 : active + 5;

  useEffect(() => {
    isEqualOne();
    isEqualTwo();
  }, []);

  return (
    <Pagination>
      <Pagination.Prev />
      { showFirst && <Pagination.Item href={`/${route}/${1}`}>{1}</Pagination.Item> }

      { showFirst && showSecond && <Pagination.Item href={`/${route}/${active -1}`}>{ active - 1 }</Pagination.Item> }
      <Pagination.Item href={`/${route}/${active}`} active>{ active }</Pagination.Item>
      <Pagination.Item href={`/${route}/${active + 1}`}>{ active + 1 }</Pagination.Item>

      <Pagination.Item href={`/${route}/${active + 4}`}>{active + 4}</Pagination.Item>
      <Pagination.Next href={`/${route}/${lastPagination}`} />
    </Pagination>
  );
}

export default AdvancedPagination;