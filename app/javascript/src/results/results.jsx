import React from 'react';
import Layout from '@src/layout';
import './results.scss';

const Results = (props) => {
  return (
    <Layout>
      <div className='container mt-4'>
        <h4 className='text-center'>Search Results</h4>
        <div id='breweryResults' className='row mt-5'>
          <div className='col-12 mb-3 d-flex border-bottom pb-3 align-items-center'>
            <img src='https://placehold.co/150' alt='' />
            <div className="d-flex flex-column ms-5">
              <h5 className='text-decoration-underline'>Brewery Name</h5>
              <h4>***** <small className='fs-6'>5.0 (5 reviews)</small></h4>
              <h6 className='lead fs-6 fw-normal'>Type</h6>
              <h6 className='lead fs-6 fw-normal'>City, State</h6>
              <h6 className='lead fs-6 fw-normal'>Address</h6>
            </div>
          </div>
          <div className='col-12 mb-3 d-flex border-bottom pb-3 align-items-center'>
            <img src='https://placehold.co/150' alt='' />
            <div className="d-flex flex-column ms-5">
              <h5 className='text-decoration-underline'>Brewery Name</h5>
              <h4>***** <small className='fs-6'>5.0 (5 reviews)</small></h4>
              <h6 className='lead fs-6 fw-normal'>Type</h6>
              <h6 className='lead fs-6 fw-normal'>City, State</h6>
              <h6 className='lead fs-6 fw-normal'>Address</h6>
            </div>
          </div>
          <div className='col-12 mb-3 d-flex border-bottom pb-3 align-items-center'>
            <img src='https://placehold.co/150' alt='' />
            <div className="d-flex flex-column ms-5">
              <h5 className='text-decoration-underline'>Brewery Name</h5>
              <h4>***** <small className='fs-6'>5.0 (5 reviews)</small></h4>
              <h6 className='lead fs-6 fw-normal'>Type</h6>
              <h6 className='lead fs-6 fw-normal'>City, State</h6>
              <h6 className='lead fs-6 fw-normal'>Address</h6>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Results;