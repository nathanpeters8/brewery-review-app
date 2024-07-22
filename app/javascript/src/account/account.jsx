import React, { useState, useEffect } from 'react';
import Layout from '@utils/layout';
import { GetImagesByUser, GetReviewsByUser, Authenticate, DeleteReview } from '@utils/apiService';
import './account.scss';

const Account = (props) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [userReviews, setUserReviews] = useState([]);
  const [userImages, setUserImages] = useState([]);

  // update window width on resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // check user authentication and get user reviews and images
  useEffect(() => {
    Authenticate((response) => {
      console.log(response);
      GetReviewsByUser(response.id, (reviews) => setUserReviews(reviews));
      GetImagesByUser(response.id, (images) => setUserImages(images));
    });
  }, []);

  const handleReviewDelete = (e, reviewId) => {
    e.preventDefault();
    DeleteReview(reviewId, (response) => {
      console.log(response);
      window.location.reload();
    });

  }

  return (
    <Layout currentComponent='account'>
      <div className='container-xl bg-secondary bg-opacity-10'>
        <div className='row justify-content-center'>
          <div
            className={`col-10 col-md-3 d-flex flex-row flex-md-column justify-content-between justify-content-md-center align-items-center ${
              windowWidth >= 768 ? 'vh-100 border' : 'mt-4 border-bottom pb-4'
            }`}
          >
            <img src='https://placehold.co/150' className='mb-0 mb-md-5' />
            <div className='d-flex flex-column gap-2 mb-0 mb-md-5'>
              <h5 className='text-center'>Username</h5>
              <h5 className='text-center'>City, State</h5>
            </div>
            <div className='d-flex flex-column gap-2'>
              <button className='btn btn-outline-warning text-ochre border-0'>Edit Account</button>
              <button className='btn btn-outline-danger text-ochre border-0'>Delete Account</button>
            </div>
          </div>
          <div className='col-12 col-md-9 d-flex flex-column align-items-center'>
            <div className='col-11 col-md-9 table-responsive mt-5'>
              <h5 className='text-center text-decoration-underline mb-3'>My Uploaded Images</h5>
              <table className='table table-striped table-hover table-bordered table-secondary align-items-center'>
                <thead>
                  <tr className='align-middle text-center'>
                    <th></th>
                    <th>Brewery Name</th>
                    <th>Date Posted</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {userImages.length > 0 ? (
                    userImages.map((image, index) => (
                      <tr key={index} className='align-middle text-center'>
                        <td className='d-flex justify-content-center'>
                          <div className='user-image border' style={{ backgroundImage: `url(${image.upload})` }}></div>
                        </td>
                        <td>{image.brewery_name}</td>
                        <td>{image.created_at.split('T')[0]}</td>
                        <td>
                          <button className='btn btn-sm btn-outline-danger border-0'>Delete</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className='align-middle text-center'>
                      <td>No Images Yet</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className='col-11 col-md-9 table-responsive mt-5'>
              <h5 className='text-center text-decoration-underline mb-3'>My Reviews</h5>
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
                          <button className='btn btn-sm btn-outline-danger border-0' onClick={(e) => handleReviewDelete(e, review.id)}>Delete</button>
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
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Account;
