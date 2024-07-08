import React, { useState, useEffect } from 'react';
import Layout from '@src/layout';
import { GetBreweriesByName } from '../utils/breweryDBRequests';
import './home.scss';

const Home = (props) => {

  const [name, setName] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = (event) => {
    event.preventDefault();
    const encodedName = encodeURIComponent(name);
    const underscoreName = name.replace(' ', '_');

    // GetBreweriesByName(encodedName, (response) => {
    //   console.log(response);
    //   setResults(response);
    // })

    window.location.href = `/results/${underscoreName}`;
  };

  return (
    <Layout>
      <div className="container pt-5">
        <div className="row">
          <h4 className='text-center'>Search for breweries using any of all fields below:</h4>
        </div>
        <form className='row d-flex justify-content-center mt-4 border py-3' onSubmit={handleSearch}>
          <div className="col-8 text-center">
            <label htmlFor="breweryName" className='form-label'>Brewery Name</label>
            <input type="search" id="breweryName" name='name' className='form-control text-center' onChange={(event) => setName(event.target.value)} value={name}/>
          </div>
          <div className="col-5 text-center mt-3">
            <label htmlFor="state" className='form-label'>State</label>
            <input type="text" id="state" name='state' className='form-control text-center'/>
          </div>
          <div className="col-5 text-center mt-3">
            <label htmlFor="city" className='form-label'>City</label>
            <input type="text" id="city" name='city' className='form-control text-center'/>
          </div>
          <div className="col-5 text-center mt-3">
            <label htmlFor="zipCode" className='form-label'>Zip Code</label>
            <input type="text" id="zipCode" name='zip' className='form-control text-center'/>
          </div>
          <div className="col-8 text-center mt-4">
            <button className="btn btn-lg btn-primary">Search</button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Home;