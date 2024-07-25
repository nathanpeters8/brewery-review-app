import React, { useState, useEffect } from 'react';
import Layout from '@utils/layout';
import { FormModalTemplate, ConfirmModal, ProfilePictureModal } from '@utils/modalTemplates.jsx';
import * as ApiService from '@utils/apiService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import './account.scss';

const Account = (props) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [userReviews, setUserReviews] = useState([]);
  const [userImages, setUserImages] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showProfilePicModal, setShowProfilePicModal] = useState(false);
  const [userId, setUserId] = useState('');
  const [changedFields, setChangedFields] = useState([]);
  const [userInfo, setUserInfo] = useState({
    email: '',
    username: '',
    password: '',
    city: '',
    state: '',
    profile_picture: '',
  });

  // update window width on resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // check user authentication and get user reviews and images
  useEffect(() => {
    ApiService.Authenticate((response) => {
      setUserId(response.id);
      ApiService.GetProfile(response.id, (profile) => setUserInfo({ ...profile, password: '' }));
      ApiService.GetReviewsByUser(response.id, (reviews) => setUserReviews(reviews));
      ApiService.GetImagesByUser(response.id, (images) => setUserImages(images));
    });
  }, []);

  // handle form input changes
  const handleChange = (target) => {
    if (target.type === 'file') {
      setUserInfo({ ...userInfo, profile_picture: target.files[0] });
    } else {
      setUserInfo({ ...userInfo, [target.name]: target.value });
    }

    if (!changedFields.includes(target.name)) setChangedFields([...changedFields, target.name]);
  };

  // handle edit profile form submission
  const handleEditProfile = (e) => {
    e.preventDefault();

    // create form data with changed fields
    const formData = new FormData();
    if (changedFields) {
      changedFields.forEach((field) => {
        formData.append(`user[${field}]`, userInfo[field]);
      });
    }

    // send updated info to API
    ApiService.EditProfile(formData, userId, (response) => {
      console.log(response);
      setShowEditModal(false);
      setShowProfilePicModal(false);
      window.location.reload();
    });
  };

  // handle review deletion
  const handleReviewDelete = (e, reviewId) => {
    e.preventDefault();
    ApiService.DeleteReview(reviewId, (response) => {
      console.log(response);
      window.location.reload();
    });
  };

  // handle image deletion
  const handleImageDelete = (e, imageId) => {
    e.preventDefault();
    ApiService.DeleteImage(imageId, (response) => {
      console.log(response);
      window.location.reload();
    });
  };

  // handle user deletion
  const handleUserDelete = (e) => {
    e.preventDefault();
    ApiService.UserSignOut((response) => {
      ApiService.DeleteUser(userId, (r) => {
        console.log(r);
        window.location.href = '/';
      });
    });
  };

  return (
    <Layout currentComponent='account'>
      <div className='container-xl bg-secondary bg-opacity-10'>
        <div className='row justify-content-center'>
          <div
            className={`col-12 col-md-3 d-flex flex-row flex-md-column justify-content-between justify-content-md-start pt-md-5 align-items-center ${
              windowWidth >= 768 ? 'vh-100 border' : 'mt-4 border-bottom pb-4'
            }`}
          >
            <div
              className='avatar-image col-4 col-md-9 border mb-0 mb-md-5 position-relative'
              style={{
                backgroundImage: `url(${
                  userInfo.profile_picture ? userInfo.profile_picture : 'https://placehold.co/150'
                })`,
              }}
            >
              <button className='btn btn-lg text-ochre border-0 position-absolute top-0 end-0' onClick={() => setShowProfilePicModal(true)}>
                <FontAwesomeIcon icon={faPenToSquare} />
              </button>
            </div>
            <div className='d-flex flex-column gap-2 mb-0 mb-md-5'>
              <h5 className='text-center'>{userInfo.username}</h5>
              <h5 className='text-center'>{`${userInfo.city}, ${userInfo.state}`}</h5>
            </div>
            <div className='d-flex flex-column gap-2'>
              <button className='btn btn-outline-warning text-ochre border-0' onClick={() => setShowEditModal(true)}>
                Edit Account
              </button>
              <button className='btn btn-outline-danger text-ochre border-0' onClick={() => setShowConfirmModal(true)}>
                Delete Account
              </button>
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
                          <div className='d-flex flex-column gap-1'>
                            <button
                              className='btn btn-sm btn-outline-primary text-ochre border-0'
                              onClick={() => (window.location.href = `/brewery/${image.brewery_id}`)}
                            >
                              View
                            </button>
                            <button
                              className='btn btn-sm btn-outline-danger border-0'
                              onClick={(e) => handleImageDelete(e, image.id)}
                            >
                              Delete
                            </button>
                          </div>
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
            </div>
          </div>
        </div>
      </div>
      <FormModalTemplate
        show={showEditModal}
        setShow={setShowEditModal}
        formType='editprofile'
        title='Edit Profile'
        handleChange={handleChange}
        userInfo={userInfo}
        submitMethod={handleEditProfile}
      />
      <ConfirmModal
        show={showConfirmModal}
        setShow={setShowConfirmModal}
        handleDelete={handleUserDelete}
        header='your profile'
      />
      <ProfilePictureModal
        show={showProfilePicModal}
        setShow={setShowProfilePicModal}
        handleChange={handleChange}
        handleSubmit={handleEditProfile}
      />
    </Layout>
  );
};

export default Account;