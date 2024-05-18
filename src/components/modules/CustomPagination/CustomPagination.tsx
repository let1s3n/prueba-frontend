import { Dispatch, SetStateAction } from 'react';
import { Pagination } from 'react-bootstrap';

interface CProps {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  total: number;
}
const CustomPagination = ({ currentPage, setCurrentPage, total }: CProps) => {
  return (
    <Pagination className="justify-content-center">
      <Pagination.Item onClick={() => setCurrentPage(0)}>
        Primero
      </Pagination.Item>
      <Pagination.Item
        onClick={() => setCurrentPage(currentPage > 0 ? currentPage - 1 : 0)}
        disabled={currentPage === 0}
      >
        Anterior
      </Pagination.Item>

      <Pagination.Item
        onClick={() => setCurrentPage(currentPage)}
        activeLabel=""
        active
      >
        {currentPage + 1}
      </Pagination.Item>
      <Pagination.Item
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage + 1 > total}
      >
        {currentPage + 2}
      </Pagination.Item>
      <Pagination.Item
        onClick={() => setCurrentPage(currentPage + 2)}
        disabled={currentPage + 2 > total}
      >
        {currentPage + 3}
      </Pagination.Item>
      <Pagination.Item
        onClick={() => setCurrentPage(currentPage + 3)}
        disabled={currentPage + 3 > total}
      >
        {currentPage + 4}
      </Pagination.Item>
      <Pagination.Item
        onClick={() => setCurrentPage(currentPage + 4)}
        disabled={currentPage + 4 > total}
      >
        {currentPage + 5}
      </Pagination.Item>

      <Pagination.Item
        onClick={() =>
          setCurrentPage(currentPage < total ? currentPage + 1 : total)
        }
        disabled={currentPage === total}
      >
        Siguiente
      </Pagination.Item>
      <Pagination.Item onClick={() => setCurrentPage(total)}>
        Ultimo
      </Pagination.Item>
    </Pagination>
  );
};

export default CustomPagination;
