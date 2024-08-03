import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './brewery.scss';

const BreweryImages = ({ breweryImages, currentUser, handleShowConfirmModal, handleShowFullscreen }) => {
  return (
    <div
      className={`col-11 d-flex flex-row border-bottom border-secondary overflow-scroll overflow-hidden py-2 ${
        breweryImages.length > 0 ? 'justify-content-start gap-3' : 'justify-content-center'
      }`}
    >
      {breweryImages.length > 0 ? (
        breweryImages.map((image, index) => (
          <figure className='figure col-7 col-sm-5 col-lg-4 d-flex flex-column border-end pe-3 pt-3' key={index}>
            <div
              className='user-image figure-img border'
              onClick={(e) => handleShowFullscreen(e, image.upload)}
              style={{ backgroundImage: `url(${image.upload})` }}
            ></div>
            <div className='d-flex flex-row justify-content-between figure-caption'>
              <p className='pt-2'>{image.caption}</p>
              {currentUser === image.user.username && (
                <button className='image-delete btn p-0' onClick={(e) => handleShowConfirmModal(image.id, 'image')}>
                  <FontAwesomeIcon icon={faTrash} style={{ color: '#C06014' }} />
                </button>
              )}
            </div>
          </figure>
        ))
      ) : (
        <h4 className='mt-5 text-center'>No Images Yet</h4>
      )}
    </div>
  );
};

export default BreweryImages;
