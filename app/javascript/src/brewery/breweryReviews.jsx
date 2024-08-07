import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';
import './brewery.scss';

const BreweryReviews = ({ breweryReviews, currentUser, handleShowConfirmModal }) => {
  return (
    <>
      <h4 className='text-center text-decoration-underline mb-3 mt-5'>User Reviews</h4>
      <div className='col-9 d-flex align-items-center flex-column pb-5'>
        {breweryReviews.length > 0 ? (
          breweryReviews.map((review, index) => (
            <div className='d-flex flex-row mt-5 justify-content-around w-100' key={index}>
              {review.user.profile_picture && (
                <div
                  className='avatar-image col-2 mb-3 rounded-circle align-self-start me-4'
                  style={{ backgroundImage: `url(${review.user.profile_picture})` }}
                ></div>
              )}
              {!review.user.profile_picture && (
                <div
                  className='avatar-image col-2 mb-3 rounded-circle align-self-start me-4'
                  style={{ backgroundImage: `url(https://placehold.co/100)` }}
                ></div>
              )}
              <div className='border-bottom pb-3 w-100'>
                <div className='d-flex flex-row justify-content-between align-items-center'>
                  <h5 className='fw-bold'>@{review.user.username}</h5>
                  <h6 className='lead fs-6'>{new Date(review.created_at).toLocaleDateString()}</h6>
                  {currentUser === review.user.username && (
                    <button
                      className='review-delete btn p-0'
                      onClick={(e) => handleShowConfirmModal(review.id, 'review')}
                    >
                      <FontAwesomeIcon icon={faTrash} style={{ color: '#C06014' }} />
                    </button>
                  )}
                </div>
                <h6>
                  {[...Array(5)].map((star, i) => {
                    return (
                      <FontAwesomeIcon
                        key={i}
                        icon={i < review.rating ? faStar : faStarEmpty}
                        size='lg'
                        style={{ color: '#C06014' }}
                      />
                    );
                  })}
                </h6>
                <h6 className='mt-4'>{review.content}</h6>
              </div>
            </div>
          ))
        ) : (
          <h6 className='mt-5 text-center fst-italic'>No Reviews Yet</h6>
        )}
      </div>
    </>
  );
};

export default BreweryReviews;
