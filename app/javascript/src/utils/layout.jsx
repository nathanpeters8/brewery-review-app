import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FormModalTemplate } from './modalTemplates';
import { GetBreweriesBySearchTerm } from './breweryDBRequests';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Layout = (props) => {
  const [showLogIn, setShowLogIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSearch = (event) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if(searchTerm) params.append('query', encodeURIComponent(searchTerm));
    window.location.href = `/results?${params.toString()}`;
  }

  return (
    <>
      <nav className='navbar navbar-expand border-bottom bg-light'>
        <div className='container-fluid'>
          <a href='/' className='navbar-brand'>
            Brewery Review
          </a>
          {(props.currentComponent === 'results' || props.currentComponent === 'brewery') && (
            <form className='btn-group col-3' onSubmit={handleSearch}>
              <input
                type='search'
                name='search'
                id='brewSearch'
                className='form-control w-100'
                placeholder='Find another brewery...'
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
              />
              <button className='btn btn-sm btn-primary' type='submit'>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </form>
          )}
          <ul className='navbar-nav'>
            <div className='d-flex flex-row gap-2'>
              <li className='nav-item'>
                <button className='btn btn-outline-primary' onClick={(e) => (window.location.href = '/account')}>
                  My Account
                </button>
              </li>
              <li className='nav-item'>
                <button className='btn btn-outline-primary' onClick={(e) => setShowLogIn(true)}>
                  Log in
                </button>
              </li>
              <li className='nav-item'>
                <button className='btn btn-outline-primary' onClick={(e) => setShowSignUp(true)}>
                  Sign up
                </button>
              </li>
            </div>
          </ul>
        </div>
      </nav>
      {props.children}

      <FormModalTemplate
        show={showLogIn}
        toggleShow={setShowLogIn}
        formType='login'
        title='Log In'
        setEmail={setEmail}
        setPassword={setPassword}
        setUsername={setUsername}
        email={email}
        password={password}
        username={username}
      />

      <FormModalTemplate
        show={showSignUp}
        toggleShow={setShowSignUp}
        formType='signup'
        title='Sign Up'
        setEmail={setEmail}
        setPassword={setPassword}
        setUsername={setUsername}
        email={email}
        password={password}
        username={username}
      />
    </>
  );
};

export default Layout;
