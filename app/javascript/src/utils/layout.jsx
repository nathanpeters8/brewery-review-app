import React, { useState, useEffect } from 'react';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FormModalTemplate } from './modalTemplates';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Navbar, Nav } from 'react-bootstrap';
import { Authenticate, UserLogIn, UserSignOut, UserSignUp } from './apiService';

const Layout = (props) => {
  // state variables
  const [showLogIn, setShowLogIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  // check user authentication, on page load
  useEffect(() => {
    Authenticate((response) => {
      console.log(response);
      if(response.authenticated) {
        setUserLoggedIn(true);
      }
    })
  }, []);

  // sign up user, then log in
  const handleSignUp = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('user[username]', username);
    formData.append('user[email]', email);
    formData.append('user[password]', password);
    if (city) formData.append('user[city]', city);
    if (state) formData.append('user[state]', state);
    if (profilePic) formData.append('user[profile_picture]', profilePic);

    UserSignUp(formData, (response) => {
      console.log(response);
      handleLogIn(e);
    })
  }

  // log in user
  const handleLogIn = (e) => {
    e.preventDefault();
    UserLogIn(email, password, (response) => {
      console.log(response);
      if(!response.ok) {
        alert('Invalid email or password');
        return;
      }
      window.location.href = window.location.search;
    })
  }

  // log out user
  const handleLogOut = (e) => {
    e.preventDefault();
    UserSignOut((response) => {
      console.log(response);
      setUserLoggedIn(false);
      window.location.href = window.location.search;
    })
  }

  // handle navbar search input
  const handleSearch = (event) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm) params.append('query', encodeURIComponent(searchTerm));
    window.location.href = `/results?${params.toString()}`;
  };

  // handle login/signup form input changes
  const handleChange = (target) => {
    if (target.name === 'email') {
      setEmail(target.value);
    } else if (target.name === 'username') {
      setUsername(target.value);
    } else if (target.name === 'password') {
      setPassword(target.value);
    } else if (target.name === 'city') {
      setCity(target.value);
    } else if (target.name === 'state') {
      setState(target.value);
    } else if (target.type === 'file') {
      setProfilePic(target.files[0]);
    }
  }

  const signUpInfo = { username, email, password, city, state, profilePic };
  const logInInfo = { email, password };

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
            {userLoggedIn && (
              <>
                <Nav.Item>
                  <button className='btn text-ochre' onClick={(e) => (window.location.href = '/account')}>
                    My Account
                  </button>
                </Nav.Item>
                <Nav.Item>
                  <button className='btn text-ochre' onClick={(e) => handleLogOut(e)}>
                    Log Out
                  </button>
                </Nav.Item>
              </>
            )}
            {!userLoggedIn && (
              <>
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
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {props.children}
      
      {/* Log In Modal */}
      <FormModalTemplate
        show={showLogIn}
        toggleShow={setShowLogIn}
        formType='login'
        title='Log In'
        handleChange={handleChange}
        userInfo={logInInfo}
        submitMethod={handleLogIn}
      /> 

      {/* Sign Up Modal */}
      <FormModalTemplate
        show={showSignUp}
        toggleShow={setShowSignUp}
        formType='signup'
        title='Sign Up'
        handleChange={handleChange}
        userInfo={signUpInfo}
        submitMethod={handleSignUp}
      />
    </>
  );
};

export default Layout;
