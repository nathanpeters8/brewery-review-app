import React from 'react';

const Layout = (props) => {
  return (
    <>
      <nav className='navbar navbar-expand border-bottom'>
        <div className='container-fluid'>
          <a href='/' className='navbar-brand'>
            Brewery Review
          </a>
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <button className='btn btn-outline-primary'>Log in</button>
            </li>
            <li className='nav-item'>
              <button className='btn btn-outline-primary'>Sign up</button>
            </li>
          </ul>
        </div>
      </nav>
      {props.children}
    </>
  );
};

export default Layout;
