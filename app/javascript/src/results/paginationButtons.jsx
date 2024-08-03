import React from 'react';

const PaginationButtons = ({ handlePageChange, currentPage, pagesArray, total, itemsPerPage }) => {
  return (
    <nav aria-label='Page navigation example'>
      <ul className='pagination ms-0 ms-sm-3 my-3 d-flex justify-content-center justify-content-sm-start'>
        <li className='page-item'>
          <a
            className={`page-link text-ochre ${currentPage === 1 ? 'invisible' : ''}`}
            href='#'
            onClick={(e) => handlePageChange(e, currentPage - 1)}
            aria-label='Previous'
          >
            <span aria-hidden='true'>&laquo;</span>
          </a>
        </li>
        {pagesArray.map((page, index) => {
          return (
            <li key={index} className='page-item'>
              <a
                className={`page-link btn text-ochre ${page === currentPage ? 'bg-dark text-light disabled' : ''}`}
                name={page.toString()}
                href='#'
                onClick={(e) => handlePageChange(e, page)}
              >
                {page}
              </a>
            </li>
          );
        })}
        <li className='page-item'>
          <a
            className={`page-link text-ochre ${currentPage === Math.ceil(total / itemsPerPage) ? 'invisible' : ''}`}
            href='#'
            onClick={(e) => handlePageChange(e, currentPage + 1)}
            aria-label='Next'
          >
            <span aria-hidden='true'>&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default PaginationButtons;
