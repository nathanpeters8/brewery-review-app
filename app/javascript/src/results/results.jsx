import React, { useState, useEffect } from 'react';
import Layout from '@src/layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { GetBreweries } from '../utils/breweryDBRequests';

import './results.scss';

const Results = ({queryParams}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(queryParams);
    setQuery(JSON.parse(params.keys().next().value));
  }, [queryParams]);

  useEffect(() => {
    if (query) {
      console.log(query);
      GetBreweries(query, (response) => {
        console.log(response);
        setResults(response);
      });
    }
  }, [query]);

  const handleBreweryClick = (e, id) => {
    e.preventDefault();
    window.location.href = `/brewery/${id}`;
  }

  return (
    <Layout>
      <div className='container mt-4'>
        <h4 className='text-center'>Search Results</h4>
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
                    <h5
                      className='ps-0 pb-0 btn btn-lg btn-link text-dark'
                      onClick={(e) => handleBreweryClick(e, brewery.id)}
                    >
                      {brewery.name}
                    </h5>
                    <h4>
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                      <small className='fs-6'>{brewery.rating} (0 reviews)</small>
                    </h4>
                    <h6 className='lead fs-6 fw-normal'>{brewery.brewery_type}</h6>
                    <h6 className='lead fs-6 fw-normal'>
                      {brewery.city}, {brewery.state}
                    </h6>
                    <h6 className='lead fs-6 fw-normal'>{brewery.street}</h6>
                  </div>
                </div>
              );
            });
          })()}
        </div>
      </div>
    </Layout>
  );
};

export default Results;
