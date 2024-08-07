import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faTrash, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';
import { Button } from 'primereact/button';

const ReviewTemplate = ({ index, brewery_name, content, rating, created_at, id, brewery_id, handleReviewDelete }) => {
  return (
    <div className='content-div col-11 col-md-9 mt-4 pb-3 border-bottom p-2 rounded' key={index}>
      <h5 className='fw-bold'>{brewery_name}</h5>
      <h6 className='fst-italic'>
        {new Date(created_at).toLocaleString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })}
      </h6>
      <h6 className='mt-2'>
        {[...Array(5)].map((star, i) => {
          return (
            <FontAwesomeIcon key={i} icon={i < rating ? faStar : faStarEmpty} size='lg' style={{ color: '#C06014' }} />
          );
        })}
      </h6>
      <p className='fst-italic mt-3'>"{content}"</p>
      <div className='buttons d-flex flex-row gap-2 mt-3 mt-sm-5'>
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
          tooltip='Delete Review'
          tooltipOptions={{ position: 'top', mouseTrack: true, mouseTrackTop: 15 }}
          onClick={(e) => handleReviewDelete(e, id)}
        />
      </div>
    </div>
  );
};

export default ReviewTemplate;
