import React, { useState, useEffect } from 'react';

const PaginationButtons = ({ handlePageChange, currentPage, pagesArray }) => {
  return (
    <nav aria-label='Page navigation example'>
      <ul className='pagination ms-3'>
        <li className='page-item'>
          <a
            className='page-link text-ochre'
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
            className='page-link text-ochre'
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
