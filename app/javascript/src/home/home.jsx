import React, { useState, useEffect } from 'react';
import Layout from '@utils/layout';
import './home.scss';

const Home = (props) => {

  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postal, setPostal] = useState('');

  const handleSearch = (event) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (name) params.append('name', name.replace(' ', '_').toLowerCase());
    if (city) params.append('city', city.toLowerCase());
    if (state) params.append('state', state.toLowerCase());
    if (postal) params.append('postal', postal);

    window.location.href = `/results?${params.toString()}`;
  };

  return (
    <Layout currentComponent='home'>
      <div className='container-xl pt-5 d-flex flex-column align-items-center bg-secondary bg-opacity-10 vh-100'>
        <div className='row'>
          <h4 className='text-center'>Search for breweries using any or all fields below:</h4>
        </div>
        <form
          className='row w-50 d-flex justify-content-center mt-4 border bg-secondary bg-opacity-25 py-3'
          onSubmit={handleSearch}
        >
          <div className='col-8 text-center text-dark'>
            <label htmlFor='breweryName' className='form-label'>
              Brewery Name
            </label>
            <input
              type='search'
              id='breweryName'
              name='name'
              className='form-control text-center text-ochre'
              onChange={(event) => setName(event.target.value)}
              value={name}
            />
          </div>
          <div className='col-5 text-center mt-3 text-dark'>
            <label htmlFor='city' className='form-label'>
              City
            </label>
            <input
              type='text'
              id='city'
              name='city'
              className='form-control text-center text-ochre'
              onChange={(event) => setCity(event.target.value)}
              value={city}
            />
          </div>
          <div className='col-5 text-center mt-3 text-dark'>
            <label htmlFor='state' className='form-label'>
              State
            </label>
            <input
              type='text'
              id='state'
              name='state'
              className='form-control text-center text-ochre'
              onChange={(event) => setState(event.target.value)}
              value={state}
            />
          </div>
          <div className='col-5 text-center mt-3 text-dark'>
            <label htmlFor='zipCode' className='form-label'>
              Zip Code
            </label>
            <input
              type='text'
              id='zipCode'
              name='postal'
              className='form-control text-center text-ochre'
              onChange={(event) => setPostal(event.target.value)}
              value={postal}
            />
          </div>
          <div className='col-8 text-center mt-4'>
            <button className='btn btn-lg btn-outline-secondary text-dark'>Search</button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Home;