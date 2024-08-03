import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faTrash, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';
import { Button } from 'primereact/button';

const ReviewTemplate = ({ index, brewery_name, content, rating, created_at, id, brewery_id, handleReviewDelete }) => {
  return (
    <div className='content-div col-11 col-md-9 mt-4 pb-3 border-bottom p-2 rounded' key={index}>
      <h5>{brewery_name}</h5>
      {created_at.split('T')[0]}, {created_at.split('T')[1].split('.')[0]}
      <h6 className='mt-2'>
        {[...Array(5)].map((star, i) => {
          return (
            <FontAwesomeIcon key={i} icon={i < rating ? faStar : faStarEmpty} size='lg' style={{ color: '#C06014' }} />
          );
        })}
      </h6>
      <p className='fst-italic mt-3'>{content}</p>
      <div className='buttons d-flex flex-row gap-2 mt-3 mt-sm-5'>
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
  );
};

export default ReviewTemplate;
