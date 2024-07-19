import React from 'react';
import { Placeholder } from 'react-bootstrap';

const LoadingPlaceholder = (props) => {
  return (
    <div className='col-12 d-flex border-bottom py-5 align-items-center flex-column flex-sm-row'>
      <div className='col-6 col-sm-5 col-md-3 mb-3 rounded-2 text-center text-sm-start'>
        <Placeholder as='h1' animation='wave'>
          <Placeholder xs={10} className='text-ochre text-center' />
        </Placeholder>
      </div>
      <div className='col-6 d-flex flex-column ms-1 ms-sm-5 text-center text-sm-start'>
        <Placeholder as='h4' animation='glow'>
          <Placeholder xs={8} className='text-ochre' />
        </Placeholder>
        <Placeholder as='h4' animation='glow'>
          <Placeholder xs={7} className='text-ochre' />
        </Placeholder>
        <Placeholder as='h6' animation='glow'>
          <Placeholder xs={6} className='text-ochre' />
        </Placeholder>
        <Placeholder as='h6' animation='glow'>
          <Placeholder xs={5} className='text-ochre' />
        </Placeholder>
        <Placeholder as='h6' animation='glow'>
          <Placeholder xs={5} className='text-ochre' />
        </Placeholder>
      </div>
    </div>
  );
}

export default LoadingPlaceholder;