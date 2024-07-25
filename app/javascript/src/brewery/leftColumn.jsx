import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import './brewery.scss';

const LeftColumn = ({ brewery, setShowMap, setShowImageModal, setShowReviewModal, facebookLink, instagramLink }) => {
  // Format phone number
  const formatPhoneNumber = (num) => `(${num.slice(0, 3)}) ${num.slice(3, 6)}-${num.slice(6)}`;

  return (
    <>
      <div className='col-6 col-sm-5 col-md-10 d-flex flex-column justify-content-center align-items-center border px-4 py-5 bg-light text-ochre gap-2'>
        <h3 className='d-flex flex-row gap-3'>
          {brewery.website_url && (
            <a href={brewery.website_url} className='link-dark social-links' target='_blank' rel='noreferrer'>
              <FontAwesomeIcon icon={faGlobe} />
            </a>
          )}
          <a href={facebookLink} className='link-dark social-links' target='_blank' rel='noreferrer'>
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href={instagramLink} className='link-dark social-links' target='_blank' rel='noreferrer'>
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </h3>
        {brewery.phone && <h6>{formatPhoneNumber(brewery.phone)}</h6>}
        <h6>{brewery.street}</h6>
      </div>
      <div id='breweryButtonDiv' className='d-flex flex-column'>
        <button className='btn btn-outline-secondary border-0 text-ochre mt-3' onClick={(e) => setShowMap(true)}>
          Show Map
        </button>
        <button className='btn btn-outline-secondary border-0 text-ochre mt-3' onClick={(e) => setShowImageModal(true)}>
          Upload Image
        </button>
        <button
          className='btn btn-outline-secondary border-0 text-ochre mt-3'
          onClick={(e) => setShowReviewModal(true)}
        >
          Leave a Review
        </button>
      </div>
    </>
  );
};

export default LeftColumn;