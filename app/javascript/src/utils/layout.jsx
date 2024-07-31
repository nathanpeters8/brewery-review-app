import React, { useState, useEffect, useCallback } from 'react';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FormModalTemplate } from './modalTemplates';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Navbar, Nav } from 'react-bootstrap';
import { AutoComplete } from 'primereact/autocomplete';
import { Authenticate, UserLogIn, UserSignOut, UserSignUp, GetUser, GetEmail } from './apiService';
import { GetBreweriesForAutoComplete } from './openBreweryDBRequests';
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css';

const Layout = (props) => {
  // state variables
  const [showLogIn, setShowLogIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validUsername, setValidUsername] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [brewerySuggestions, setBrewerySuggestions] = useState([]);

  // check user authentication, on page load
  useEffect(() => {
    Authenticate((response) => {
      console.log(response);
      if (response.authenticated) {
        setUserLoggedIn(true);
      }
    });
  }, []);

  // check if username is valid during sign up
  useEffect(() => {
    if (showSignUp) {
      console.log(username);
      if (username.length >= 3 && username.length <= 20) {
        const specialCharacters = /[!@#$%^&*(),.?":{}|<>]/;
        if (specialCharacters.test(username)) {
          setValidUsername(false);
        } else {
          debounceFindUser(username);
        }
      } else {
        setValidUsername(false);
      }
    }
  }, [username]);

  useEffect(() => {
    if(showSignUp) {
      console.log(encodeURIComponent(email));
      if (email.length > 0) {
        const emailCharacters = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{3,}$/;
        if(!emailCharacters.test(email)) {
          setValidEmail(false);
        } else {
          debounceFindEmail(email);
        }
      } else {
        setValidEmail(false);
      }
    }
  }, [email]);

  // debounce function
  const debounce = (func, wait) => {
    let timeout;
    return function (...args) {
      const context = this;
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        timeout = null;
        func.apply(context, args);
      }, wait);
    };
  };

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
    });
  };

  // log in user
  const handleLogIn = (e) => {
    e.preventDefault();
    UserLogIn(email, password, (response) => {
      console.log(response);
      if (!response.ok) {
        alert('Invalid email or password');
        return;
      }
      window.location.href = window.location.search;
    });
  };

  // log out user
  const handleLogOut = (e) => {
    e.preventDefault();
    UserSignOut((response) => {
      console.log(response);
      setUserLoggedIn(false);
      window.location.href = window.location.search;
    });
  };

  // handle navbar search input
  const handleSearch = (event) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm) params.append('query', encodeURIComponent(searchTerm.value));
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
  };

  // Fetch brewery suggestions
  const fetchBrewerySuggestions = () => {
    if (searchTerm) {
      GetBreweriesForAutoComplete(searchTerm, (response) => {
        console.log(response);
        setBrewerySuggestions(
          [...new Set(response.map((brewery) => brewery.name))].map((brewery) => ({ label: brewery, value: brewery }))
        );
      });
    }
  };

  const findUser = (username) => {
    if (!username) return;

    GetUser(username, (response) => {
      if (response.success) {
        setValidUsername(false);
        alert('Username already exists');
        setUsername('');
      } else {
        setValidUsername(true);
      }
    });
  };

  const findEmail = (email) => {
    if (!email) return;

    GetEmail(encodeURIComponent(email), (response) => {
      if (response.success) {
        setValidEmail(false);
        alert('Email already exists');
        setEmail('');
      } else {
        setValidEmail(true);
      }
    });
  }

  const debounceFetchBreweries = debounce(fetchBrewerySuggestions, 1000);
  const debounceFindUser = useCallback(debounce(findUser, 1000), []);
  const debounceFindEmail = debounce(findEmail, 1000);

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
            {props.currentComponent !== 'home' && (
              <form className='btn-group form-inline' onSubmit={handleSearch}>
                <AutoComplete
                  id='brewSearch'
                  value={searchTerm}
                  suggestions={brewerySuggestions}
                  completeMethod={debounceFetchBreweries}
                  field='label'
                  onChange={(e) => setSearchTerm(e.value)}
                  inputClassName='w-100 h-100 border-none text-center text-ochre'
                  placeholder='Find another brewery...'
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
        validEmail={validEmail}
        validUsername={validUsername}
        setValidEmail={setValidEmail}
        setValidUsername={setValidUsername}
      />
    </>
  );
};

export default Layout;
