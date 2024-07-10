import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FormModalTemplate } from './modalTemplates';

const Layout = (props) => {
  const [showLogIn, setShowLogIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <nav className='navbar navbar-expand border-bottom bg-light'>
        <div className='container-fluid'>
          <a href='/' className='navbar-brand'>
            Brewery Review
          </a>
          <ul className='navbar-nav'>
            <div className='d-flex flex-row gap-2'>
              <li className='nav-item'>
                <button className='btn btn-outline-primary' onClick={(e) => setShowLogIn(true)}>
                  Log in
                </button>
              </li>
              <li className='nav-item'>
                <button className='btn btn-outline-primary' onClick={(e) => setShowSignUp(true)}>Sign up</button>
              </li>
            </div>
          </ul>
        </div>
      </nav>
      {props.children}

      <FormModalTemplate show={showLogIn} toggleShow={setShowLogIn} formType='login' title='Log In' setEmail={setEmail} setPassword={setPassword} setUsername={setUsername} email={email} password={password} username={username}/>

      <FormModalTemplate show={showSignUp} toggleShow={setShowSignUp} formType='signup' title='Sign Up' setEmail={setEmail} setPassword={setPassword} setUsername={setUsername} email={email} password={password} username={username}/>
    </>
  );
};

export default Layout;
