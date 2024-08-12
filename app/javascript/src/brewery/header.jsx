import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';
import './brewery.scss';

const Header = ({ brewery, breweryImages, breweryReviews, placeholderImage }) => {
  // Get average rating from reviews
  const getAverageRating = () => {
    let total = 0;
    breweryReviews.forEach((review) => {
      total += review.rating;
    });
    let average = total / breweryReviews.length;
    if (isNaN(average)) return 0;
    return average;
  };

  return (
    <>
      {breweryImages.length > 0 ? (
        <div
          className='col-7 col-sm-5 col-lg-4 brewery-main-img border'
          style={{ backgroundImage: `url(${breweryImages[breweryImages.length - 1].upload})` }}
        ></div>
      ) : (
        <div
          className='col-7 col-sm-5 col-lg-4 brewery-main-img border'
          style={{ backgroundImage: `url(${placeholderImage})` }}
        ></div>
      )}
      <div className='col-md-6 d-flex flex-column text-ochre text-center text-md-start ms-0 ms-md-5 mt-3 mt-md-0 justify-content-around'>
        <h3 className=''>{brewery.name}</h3>
        <h5 className='lead fs-6 fw-normal text-capitalize'>{brewery.brewery_type}</h5>
        <h5 className='lead fs-6 fw-normal'>
          {brewery.city}, {brewery.state}
        </h5>
        <h5 className='text-dark mt-2'>
          {[...Array(5)].map((star, i) => {
            return (
              <FontAwesomeIcon
                key={i}
                icon={i < Math.ceil(getAverageRating(breweryReviews)) ? faStar : faStarEmpty}
                size='lg'
                style={{ color: '#C06014' }}
              />
            );
          })}
          <small className='fs-6 ms-2'>{`${getAverageRating().toFixed(1)} (${breweryReviews.length} reviews)`}</small>
        </h5>
      </div>
    </>
  );
};

export default Header;
