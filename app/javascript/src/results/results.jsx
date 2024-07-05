import React, { useState, useEffect } from 'react';
import Layout from '@src/layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import './results.scss';
import { GetBreweriesByName } from '../utils/breweryDBRequests';

const Results = (props) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    setQuery(props.data.query);
  }, [props.data.query]);

  useEffect(() => {
    if (query) {
      GetBreweriesByName(query, (response) => {
        console.log(response);
        setResults(response);
      });
    }
  }, [query]);

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
                  <img src='https://placehold.co/150' alt='' />
                  <div className='d-flex flex-column ms-5'>
                    <h5 className='text-decoration-underline'>{brewery.name}</h5>
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
