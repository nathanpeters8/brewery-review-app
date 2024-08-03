import React, { useState, useEffect } from 'react';
import Layout from '@utils/layout';
import { FormModalTemplate, ConfirmModal, ProfilePictureModal } from '@utils/modalTemplates.jsx';
import * as ApiService from '@utils/apiService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faPencil, faImages, faX, faCamera } from '@fortawesome/free-solid-svg-icons';
import ImageTemplate from './imageTemplate';
import ReviewTemplate from './reviewTemplate';
import { TabMenu } from 'primereact/tabmenu';
import { Button } from 'primereact/button';
import './account.scss';

const Account = (props) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [userReviews, setUserReviews] = useState([]);
  const [userImages, setUserImages] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showProfilePicModal, setShowProfilePicModal] = useState(false);
  const [userId, setUserId] = useState('');
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [changedFields, setChangedFields] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
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
      if (response.authenticated) {
        setUserId(response.id);
        setUserLoggedIn(true);
        ApiService.GetProfile(response.id, (profile) => setUserInfo({ ...profile, password: '' }));
        ApiService.GetReviewsByUser(response.id, (reviews) => setUserReviews(reviews));
        ApiService.GetImagesByUser(response.id, (images) => setUserImages(images));
      } else {
        window.location.href = '/';
      }
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

  const itemRenderer = (item, index) => (
    <a className='d-flex align-items-center gap-2 text-ochre' onClick={() => setActiveIndex(index)}>
      <h5>{item.icon}</h5>
      <span className='fw-bold'>{item.name}</span>
    </a>
  );

  const items = [
    {
      name: 'Reviews',
      icon: <FontAwesomeIcon icon={faPencil} />,
      className: 'mx-3 mx-sm-5',
      template: (item) => itemRenderer(item, 0),
    },
    {
      name: 'Images',
      icon: <FontAwesomeIcon icon={faImages} />,
      className: 'mx-3 mx-sm-5',
      template: (item) => itemRenderer(item, 1),
    },
  ];

  return (
    <Layout currentComponent='account' userLoggedIn={userLoggedIn} setUserLoggedIn={setUserLoggedIn}>
      <div className='container-xl bg-secondary bg-opacity-10'>
        <div className='row justify-content-center'>
          <div
            className={`col-12 col-sm-8 col-md-3 d-flex flex-column flex-sm-row flex-md-column justify-content-between justify-content-md-start pt-md-5 align-items-center ${
              windowWidth >= 768 ? 'vh-100 border' : 'mt-4 border-bottom pb-4'
            }`}
          >
            <div
              className='avatar-image col-4 col-md-9 border mb-5 mb-sm-0 mb-md-5'
              style={{
                backgroundImage: `url(${
                  userInfo.profile_picture ? userInfo.profile_picture : 'https://placehold.co/150'
                })`,
              }}
            >
            </div>
            <div className='d-flex flex-column align-items-center gap-2 mb-3 mb-md-5'>
              <h4 className='text-center'>{userInfo.username}</h4>
              <h6 className='text-center'>{`${userInfo.city}, ${userInfo.state}`}</h6>
              <div className='d-flex flex-row gap-2'>
                <Button
                  icon={<FontAwesomeIcon icon={faPencil} />}
                  severity='warning'
                  rounded
                  raised
                  className='rounded border-0'
                  size='large'
                  tooltip='Edit Profile'
                  tooltipOptions={{ position: 'top', mouseTrack: true, mouseTrackTop: 15 }}
                  onClick={() => setShowEditModal(true)}
                />
                <Button
                  icon={<FontAwesomeIcon icon={faCamera} />}
                  rounded
                  raised
                  className='rounded bg-ochre border-0'
                  size='large'
                  tooltip='Upload Avatar'
                  tooltipOptions={{ position: 'top', mouseTrack: true, mouseTrackTop: 15 }}
                  onClick={() => setShowProfilePicModal(true)}
                />
                <Button
                  icon={<FontAwesomeIcon icon={faX} />}
                  severity='danger'
                  rounded
                  raised
                  className='rounded'
                  size='large'
                  tooltip='Delete Account'
                  tooltipOptions={{ position: 'top', mouseTrack: true, mouseTrackTop: 15 }}
                  onClick={() => setShowConfirmModal(true)}
                />
              </div>
            </div>
          </div>
          <div className='col-12 col-md-9 d-flex flex-column align-items-center mb-4'>
            <div className='col-11 col-md-9 mt-5 d-flex justify-content-center'>
              <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} />
            </div>
            {activeIndex === 0 &&
              (userReviews.length > 0 ? (
                userReviews.map((review, index) => (
                  <ReviewTemplate
                    key={index}
                    brewery_name={review.brewery_name}
                    content={review.content}
                    rating={review.rating}
                    created_at={review.created_at}
                    id={review.id}
                    brewery_id={review.brewery_id}
                    handleReviewDelete={handleReviewDelete}
                  />
                ))
              ) : (
                <div className='mt-5 text-center'>
                  <h5>No reviews yet :(</h5>
                </div>
              ))}
            {activeIndex === 1 &&
              (userImages.length > 0 ? (
                userImages.map((image, index) => (
                  <ImageTemplate
                    key={index}
                    image={image.upload}
                    created_at={image.created_at}
                    brewery_name={image.brewery_name}
                    brewery_id={image.brewery_id}
                    caption={image.caption}
                    handleImageDelete={handleImageDelete}
                  />
                ))
              ) : (
                <div className='mt-5 text-center'>
                  <h5>No images yet :(</h5>
                </div>
              ))}
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
