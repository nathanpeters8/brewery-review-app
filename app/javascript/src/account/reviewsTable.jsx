import React, { useState, useEffect } from 'react';

const ReviewsTable = ({ userReviews, handleReviewDelete }) => {
  return (
    <table className='table table-striped table-hover table-bordered table-secondary align-items-center'>
      <thead>
        <tr className='align-middle text-center'>
          <th>Brewery Name</th>
          <th>Review</th>
          <th>Date Posted</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {userReviews.length > 0 ? (
          userReviews.map((review, index) => (
            <tr key={index} className='align-middle text-center'>
              <td>{review.brewery_name}</td>
              <td id='reviewCell'>
                <textarea
                  name='review'
                  className='form-control-plaintext lh-sm small'
                  value={review.content}
                  readOnly
                ></textarea>
              </td>
              <td>{review.created_at.split('T')[0]}</td>
              <td>
                <div className='d-flex flex-column gap-1'>
                  <button
                    className='btn btn-sm btn-outline-primary text-ochre border-0'
                    onClick={() => (window.location.href = `/brewery/${review.brewery_id}`)}
                  >
                    View
                  </button>
                  <button
                    className='btn btn-sm btn-outline-danger border-0'
                    onClick={(e) => handleReviewDelete(e, review.id, review.brewery_id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr className='align-middle text-center'>
            <td className='w-25'>No Reviews Yet</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ReviewsTable;
