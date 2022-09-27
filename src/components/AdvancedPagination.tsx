import React, { useEffect, useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';


interface AdvancedInterface {
  active: number;
  route: string;
  sumFourPage: Promise<boolean>;
  nextPage: Promise<boolean>;
  sumFivePage: Promise<boolean>;
};

const AdvancedPagination: React.FC<AdvancedInterface> = ({ active, route, sumFourPage, nextPage, sumFivePage }) => {
  const [showFirst, setShowFirst] = useState(false);
  const [showSecond, setShowSecond] = useState(false);
  const [showLastFive, setShowLastFive] = useState(false);
  const [showLastFour, setShowLastFour] = useState(false);
  const [showNextPage, setShowNextPage] = useState(false);

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
  const returnFourPages = async () => setShowLastFour(await sumFourPage);
  const returnNextPage = async () => setShowNextPage(await nextPage);
  const returnFivePages = async () => setShowLastFive(await sumFivePage);

  useEffect(() => {
    isEqualOne();
    isEqualTwo();
    returnFourPages();
    returnNextPage();
    returnFivePages();
  }, []);

  return (
    <Pagination>
      <Pagination.Prev href={`/${route}/${1}`} />
      { showFirst && <Pagination.Item href={`/${route}/${active - 2}`}>{active - 2}</Pagination.Item> }

      { showFirst && showSecond && <Pagination.Item href={`/${route}/${active -1}`}>{ active - 1 }</Pagination.Item> }
      <Pagination.Item href={`/${route}/${active}`} active>{ active }</Pagination.Item>
      { showNextPage && <Pagination.Item href={`/${route}/${active + 1}`}>{ active + 1 }</Pagination.Item> }

      { showLastFour && <Pagination.Item href={`/${route}/${active + 4}`}>{active + 4}</Pagination.Item> }
      { showLastFive && <Pagination.Next href={`/${route}/${lastPagination}`} /> }
    </Pagination>
  );
}

export default AdvancedPagination;