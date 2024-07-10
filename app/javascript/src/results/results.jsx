import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { GetBreweries } from '@utils/breweryDBRequests';
import { MapModalTemplate } from '@utils/modalTemplates';
import Layout from '@utils/layout';
import PaginationButtons from './paginationButtons';
import './results.scss';

const Results = ({ queryParams }) => {
  // state variables
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [clickedBrewery, setClickedBrewery] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesArray, setPagesArray] = useState([1, 2, 3]);
  
  const itemsPerPage = 10;

  // update query state when queryParams change
  useEffect(() => {
    const params = new URLSearchParams(queryParams);
    setQuery(JSON.parse(params.keys().next().value));
  }, [queryParams]);

  // fetch breweries when query or currentPage changes
  useEffect(() => {
    if (query) {
      GetBreweries(query, currentPage, itemsPerPage, (response) => {
        console.log(response);
        setResults(response);
      });
    }
  }, [query, currentPage]);

  // update pagesArray when currentPage changes
  useEffect(() => {
    if(currentPage > 1) {
      setPagesArray([currentPage-1, currentPage, currentPage+1]);
    }
    else if(currentPage === 1) {
      setPagesArray([1, 2, 3]);
    }
  }, [currentPage]);

  // show map modal when clickedBrewery changes
  useEffect(() => {
    if (clickedBrewery) {
      setShowMap(true);
    } else {
      setShowMap(false);
    }
  }, [clickedBrewery]);

  // handle brewery click
  const handleBreweryClick = (e, id) => {
    e.preventDefault();
    window.location.href = `/brewery/${id}`;
  };

  // handle page change
  const handlePageChange = (e, num) => {
    setCurrentPage(num);
    e.target.blur();
  }

  // format phone number
  const formatPhoneNumber = (num) => `(${num.slice(0, 3)}) ${num.slice(3, 6)}-${num.slice(6)}`;

  return (
    <Layout>
      <div className='container mt-4'>
        <h4 className='text-center'>Search Results</h4>
        {results.length >= itemsPerPage && (
          <PaginationButtons handlePageChange={handlePageChange} currentPage={currentPage} pagesArray={pagesArray} />
        )}
        <div id='breweryResults' className='row mt-5'>
          {(() => {
            if (results.length == 0) {
              return null;
            }
            return results.map((brewery, index) => {
              return (
                <div key={index} className='col-12 mb-3 d-flex border-bottom pb-3 align-items-center'>
                  <img
                    src='https://placehold.co/150'
                    className='btn btn-lg'
                    onClick={(e) => handleBreweryClick(e, brewery.id)}
                  />
                  <div className='d-flex flex-column ms-5'>
                    <h5 className='ps-0 pb-0 text-dark' onClick={(e) => handleBreweryClick(e, brewery.id)}>
                      <a href='#' className='link-primary'>
                        {brewery.name}
                      </a>
                    </h5>
                    <h4>
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                      <small className='fs-6'>{brewery.rating} (0 reviews)</small>
                    </h4>
                    {(() => {
                      if (!brewery.phone) {
                        return null;
                      }
                      return <h6 className='lead fs-6 fw-normal'>{formatPhoneNumber(brewery.phone)}</h6>;
                    })()}
                    <h6 className='lead fs-6 fw-normal'>
                      {brewery.city}, {brewery.state}
                    </h6>
                    <h6 className='lead fs-6 fw-normal' onClick={(e) => setClickedBrewery(brewery)}>
                      <a href='#' className='link-warning'>
                        {brewery.street}
                      </a>
                    </h6>
                  </div>
                </div>
              );
            });
          })()}
        </div>
        {results.length >= itemsPerPage && (
          <PaginationButtons handlePageChange={handlePageChange} currentPage={currentPage} pagesArray={pagesArray} />
        )}
      </div>
      {(() => {
        if (!clickedBrewery) {
          return null;
        }
        return (
          <MapModalTemplate
            showMap={showMap}
            toggleShowMap={setShowMap}
            name={clickedBrewery.name}
            city={clickedBrewery.city}
            state={clickedBrewery.state}
            street={clickedBrewery.street}
          />
        );
      })()}
    </Layout>
  );
};

export default Results;
