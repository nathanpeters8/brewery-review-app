import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FormModalTemplate } from './modalTemplates';
import { GetBreweriesBySearchTerm } from './breweryDBRequests';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Navbar, Nav } from 'react-bootstrap';

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
    if (searchTerm) params.append('query', encodeURIComponent(searchTerm));
    window.location.href = `/results?${params.toString()}`;
  };

  return (
    <>
      <Navbar expand='md' className='sticky-top border-bottom bg-secondary bg-opacity-25 ps-2'>
        <a href='/' className='navbar-brand'>
          <h4 className='text-ochre mb-0'>Brewery Review</h4>
        </a>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav' className='justify-content-end'>
          <Nav className='d-flex flex-row gap-3 flex-column flex-md-row align-items-end pt-3 pt-md-0 ms-auto'>
            {(props.currentComponent === 'results' || props.currentComponent === 'brewery') && (
              <form className='btn-group form-inline' onSubmit={handleSearch}>
                <input
                  type='search'
                  name='search'
                  id='brewSearch'
                  className='form-control'
                  placeholder='Find another brewery...'
                  onChange={(e) => setSearchTerm(e.target.value)}
                  value={searchTerm}
                />
                <button className='btn btn-sm bg-ochre text-light' type='submit'>
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
              </form>
            )}
            <Nav.Item>
              <button className='btn text-ochre' onClick={(e) => (window.location.href = '/account')}>
                My Account
              </button>
            </Nav.Item>
            <Nav.Item>
              <button className='btn text-ochre' onClick={(e) => setShowLogIn(true)}>
                Log in
              </button>
            </Nav.Item>
            <Nav.Item>
              <button className='btn text-ochre' onClick={(e) => setShowSignUp(true)}>
                Sign up
              </button>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
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
