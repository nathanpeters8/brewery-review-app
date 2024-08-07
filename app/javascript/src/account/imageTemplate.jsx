import React from 'react';
import { Button } from 'primereact/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const ImageTemplate = ({ index, image, created_at, brewery_name, brewery_id, id, caption, handleImageDelete }) => {
  return (
    <div
      className='content-div col-11 col-md-9 d-flex flex-column flex-sm-row align-items-center text-center text-sm-start mt-4 px-2 py-3 border-bottom gap-3'
      key={index}
    >
      <div className='col-6 col-sm-4 p-2'>
        <div className='brewery-image rounded-3' style={{ backgroundImage: `url(${image})` }}></div>
      </div>
      <div className='col-10 d-flex flex-column justify-content-center'>
        <h5 className='fw-bold'>{brewery_name}</h5>
        <p className='fs-6 fst-italic fw-light'>
          {new Date(created_at).toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
        <small className='fst-italic'>"{caption}"</small>
        <div className='buttons d-flex flex-row justify-content-center justify-content-sm-start gap-2 mt-3 mt-sm-5'>
          <Button
            icon={<FontAwesomeIcon icon={faArrowRight} />}
            rounded
            raised
            className='rounded bg-ochre border-0'
            size='large'
            tooltip='Go To Brewery'
            tooltipOptions={{ position: 'top', mouseTrack: true, mouseTrackTop: 15 }}
            onClick={(e) => (window.location.href = `/brewery/${brewery_id}`)}
          />
          <Button
            icon={<FontAwesomeIcon icon={faTrash} />}
            severity='danger'
            rounded
            raised
            className='rounded'
            size='large'
            tooltip='Delete Image'
            tooltipOptions={{ position: 'top', mouseTrack: true, mouseTrackTop: 15 }}
            onClick={(e) => handleImageDelete(e, id)}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageTemplate;
