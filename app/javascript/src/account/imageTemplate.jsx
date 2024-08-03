import React from 'react';
import { Button } from 'primereact/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faArrowRight } from '@fortawesome/free-solid-svg-icons';


const ImageTemplate = ({ index, image, created_at, brewery_name, caption, handleReviewDelete }) => {
  return (
    <div
      className='content-div col-11 col-md-9 d-flex flex-column flex-sm-row align-items-center text-center text-sm-start mt-4 px-2 py-3 border-bottom gap-3'
      key={index}
    >
      <div className="col-6 col-sm-4 p-2">
        <div className='brewery-image rounded-3' style={{ backgroundImage: `url(${image})` }}></div>
      </div>
      <div className='col-10 d-flex flex-column justify-content-center'>
        <h5>{brewery_name}</h5>
        <h6>
          {created_at.split('T')[0]}, {created_at.split('T')[1].split('.')[0]}
        </h6>
        <small className='fst-italic'>"{caption}"</small>
        <div className='buttons d-flex flex-row justify-content-center justify-content-sm-start gap-2 mt-3 mt-sm-5'>
          <Button
            icon={<FontAwesomeIcon icon={faArrowRight} />}
            severity='warning'
            rounded       
            raised
            className='rounded'
            size='large'
          />
          <Button
            icon={<FontAwesomeIcon icon={faTrash} />}
            severity='danger'
            rounded
            raised
            className='rounded'
            size='large'
          />
        </div>
      </div>
    </div>
  );
};

export default ImageTemplate;
