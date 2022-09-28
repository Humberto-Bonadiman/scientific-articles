import React, { useEffect, useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';

interface AdvancedInterface {
  active: number
  route: string
  pages?(nextPage: number): Promise<boolean>
  nextPages?(nextPage: number): boolean
};

const AdvancedPagination: React.FC<AdvancedInterface> = ({ active, route, pages, nextPages }) => {
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
  };

  const showNextPagesFunction = async (numberPage: number) => {
    if (pages) return await pages(numberPage);
    if (nextPages) return nextPages(numberPage);
    return false;
  };

  const lastPagination = active + 5 >= 100 ? 100 : active + 5;
  const returnFourPages = async () => setShowLastFour(await showNextPagesFunction(4));
  const returnNextPage = async () => setShowNextPage(await showNextPagesFunction(1));
  const returnFivePages = async () => setShowLastFive(await showNextPagesFunction(5));

  useEffect(() => {
    isEqualOne();
    isEqualTwo();
    returnFourPages();
    returnNextPage();
    returnFivePages();
  }, []);

  return (
    <Pagination data-testid='pagination'>
      <Pagination.Prev data-testid={`pagination-index-first-${1}`} href={`/${route}/${1}`} />
      {showFirst && (
        <Pagination.Item
          data-testid={`pagination-index-${active - 2}`}
          href={`/${route}/${active - 2}`}
        >
          {active - 2}
        </Pagination.Item>
      )}

      {showFirst && showSecond && (
        <Pagination.Item
          data-testid={`pagination-index-${active - 1}`}
          href={`/${route}/${active - 1}`}
        >
          {active - 1}
        </Pagination.Item>
      )}
      <Pagination.Item
        data-testid={`pagination-index-${active}`}
        href={`/${route}/${active}`}
        active
      >
        {active}
      </Pagination.Item>
      {showNextPage && (
        <Pagination.Item
          data-testid={`pagination-index-${active + 1}`}
          href={`/${route}/${active + 1}`}
        >
          {active + 1}
        </Pagination.Item>
      )}

      {showLastFour && (
        <Pagination.Item
          data-testid={`pagination-index-${active + 4}`}
          href={`/${route}/${active + 4}`}
        >
          {active + 4}
        </Pagination.Item>
      )}
      {showLastFive && (
        <Pagination.Next
          data-testid={`pagination-index-last-${lastPagination}`}
          href={`/${route}/${lastPagination}`}
        />
      )}
    </Pagination>
  );
};

export default AdvancedPagination;
