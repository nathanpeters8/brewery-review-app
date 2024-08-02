import React, { useState, useEffect } from 'react';
import Layout from '@utils/layout';
import { FormModalTemplate, ConfirmModal, ProfilePictureModal } from '@utils/modalTemplates.jsx';
import * as ApiService from '@utils/apiService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import ReviewsTable from './reviewsTable';
import ImagesTable from './imagesTable';
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

  // check user authentication and get user profile, reviews and images
  useEffect(() => {
    ApiService.Authenticate((response) => {
      setUserId(response.id);
      ApiService.GetProfile(response.id, (profile) => setUserInfo({ ...profile, password: '' }));
      ApiService.GetReviewsByUser(response.id, (reviews) => setUserReviews(reviews));
      ApiService.GetImagesByUser(response.id, (images) => setUserImages(images));
    });
  }, []);

  // handle form input changes and update changed fields
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
              <button
                className='btn btn-warning border-0 position-absolute top-0 end-0'
                onClick={() => setShowProfilePicModal(true)}
              >
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
              <ImagesTable userImages={userImages} handleImageDelete={handleImageDelete} />
            </div>
            <div className='col-11 col-md-9 table-responsive mt-5'>
              <h5 className='text-center text-decoration-underline mb-3'>My Reviews</h5>
              <ReviewsTable userReviews={userReviews} handleReviewDelete={handleReviewDelete} />
            </div>
          </div>
        </div>
      </div>
      <FormModalTemplate
        show={showEditModal}
        toggleShow={setShowEditModal}
        formType='editprofile'
        title='Edit Profile'
        handleChange={handleChange}
        userInfo={userInfo}
        submitMethod={handleEditProfile}
      />
      <ConfirmModal
        show={showConfirmModal}
        toggleShow={setShowConfirmModal}
        handleDelete={handleUserDelete}
        header='your profile'
      />
      <ProfilePictureModal
        show={showProfilePicModal}
        toggleShow={setShowProfilePicModal}
        handleChange={handleChange}
        handleSubmit={handleEditProfile}
      />
    </Layout>
  );
};

export default Account;
