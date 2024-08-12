import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';
import { Password } from 'primereact/password';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';

export const MapModalTemplate = ({ showMap, toggleShowMap, name, city, state, street }) => {
  return (
    <Modal show={showMap} onHide={() => toggleShowMap(false)} centered fullscreen={'sm-down'} keyboard>
      <Modal.Header closeButton>
        <Modal.Title>{name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='d-flex justify-content-center'>
          <iframe
            width='475'
            height='400'
            loading='lazy'
            allowFullScreen
            referrerPolicy='no-referrer-when-downgrade'
            src={`https://www.google.com/maps/embed/v1/search?q=${street} ${encodeURIComponent(
              name
            )} ${city}}&maptype=satellite&zoom=16&key=${process.env.GOOGLE_MAPS_API_KEY}`}
          ></iframe>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export const FormModalTemplate = ({
  show,
  toggleShow,
  formType,
  title,
  handleChange,
  userInfo,
  submitMethod,
  validEmail = null,
  validUsername = null,
  setValidEmail = null,
  setValidUsername = null,
}) => {
  const { email, username, password, city, state } = userInfo;

  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);

  const handleUsernameBlur = () => {
    setIsNameFocused(false);
    if (setValidUsername && !username) {
      setValidUsername(false);
    }
  };

  const handleEmailBlur = () => {
    setIsEmailFocused(false);
    if (setValidEmail && !email) {
      setValidEmail(false);
    }
  };

  return (
    <Modal show={show} onHide={() => toggleShow(false)} fullscreen={'sm-down'} keyboard>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className='row d-flex justify-content-center gap-3' onSubmit={submitMethod}>
          <div className='col-8 d-flex justify-content-center mt-3'>
            <FloatLabel>
              <InputText
                id='inputEmail'
                className={`${
                  isEmailFocused && formType === 'signup' ? (validEmail ? 'bg-success-soft' : 'bg-danger-soft') : ''
                }`}
                name='email'
                onChange={(e) => handleChange(e.target)}
                value={email}
                required={formType !== 'editprofile' ? true : false}
                onFocus={() => setIsEmailFocused(true)}
                onBlur={handleEmailBlur}
              />
              <label htmlFor='inputEmail' className='form-label'>
                Email
              </label>
            </FloatLabel>
          </div>
          {formType !== 'login' && (
            <div className='col-8 d-flex justify-content-center mt-2'>
              <FloatLabel>
                <InputText
                  id='inputUsername'
                  className={`${
                    isNameFocused && formType === 'signup' ? (validUsername ? 'bg-success-soft' : 'bg-danger-soft') : ''
                  }`}
                  name='username'
                  onChange={(e) => handleChange(e.target)}
                  value={username}
                  required={formType !== 'editprofile' ? true : false}
                  onFocus={() => setIsNameFocused(true)}
                  onBlur={handleUsernameBlur}
                />
                <label htmlFor='inputUsername' className='form-label'>
                  Username
                </label>
              </FloatLabel>
            </div>
          )}
          <div className='col-8 d-flex justify-content-center mt-2'>
            <FloatLabel>
              <Password
                inputId='inputPassword'
                name='password'
                onChange={(e) => handleChange(e.target)}
                value={password}
                required={formType !== 'editprofile' ? true : false}
                feedback={false}
                toggleMask
              />
              <label htmlFor='inputPassword'>Password</label>
            </FloatLabel>
          </div>
          {formType !== 'login' && (
            <div className='col-10 d-flex flex-row justify-content-center gap-3 mt-3'>
              <div className='col-5 d-flex justify-content-center'>
                <FloatLabel>
                  <InputText
                    id='inputCity'
                    className='col-12'
                    name='city'
                    onChange={(e) => handleChange(e.target)}
                    value={city}
                    required
                  />
                  <label htmlFor='inputCity'>City</label>
                </FloatLabel>
              </div>
              <div className='col-5 d-flex justify-content-center'>
                <FloatLabel>
                  <InputText
                    id='inputState'
                    className='col-12'
                    name='state'
                    onChange={(e) => handleChange(e.target)}
                    value={state}
                    required
                  />
                  <label htmlFor='inputState'>State</label>
                </FloatLabel>
              </div>
            </div>
          )}
          {formType === 'signup' && (
            <div className='col-10 mt-3 text-center'>
              <label htmlFor='profilePic' className='text-secondary mb-1'>
                Upload Profile Picture
              </label>
              <input
                id='profilePic'
                type='file'
                name='profile_picture'
                accept='image/*'
                className='form-control'
                onChange={(e) => handleChange(e.target)}
              />
            </div>
          )}
          <div className='col-6 text-center'>
            <button type='submit' className='btn btn-outline-primary text-ochre border-0'>
              {title}
            </button>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer className='text-center'></Modal.Footer>
    </Modal>
  );
};

export const ReviewModal = ({
  show,
  toggleShow,
  review,
  setReview,
  rating,
  setRating,
  hover,
  setHover,
  handleSubmit,
  userLoggedIn
}) => {
  const [charCount, setCharCount] = useState(0);
  const [validCharCount, setValidCharCount] = useState(false);
  const charLimits = [5, 500];

  const handleReviewChange = (e) => {
    setReview(e.target.value);
    setCharCount(e.target.value.length);
    if (e.target.value.length >= charLimits[0] && e.target.value.length <= charLimits[1]) {
      setValidCharCount(true);
    } else {
      setValidCharCount(false);
    }
  };

  if(!userLoggedIn) {
    return (
      <Modal show={show} onHide={() => toggleShow(false)} centered fullscreen={'sm-down'} keyboard>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <p className='text-center'>You must be logged in to leave a review.</p>
        </Modal.Body>
        <Modal.Footer className='text-center'></Modal.Footer>
      </Modal>
    );
  }

  return (
    <Modal show={show} onHide={() => toggleShow(false)} centered fullscreen={'sm-down'} keyboard>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <form className='row d-flex justify-content-center' onSubmit={handleSubmit}>
          <div className='col-10 d-flex flex-row justify-content-around align-items-center'>
            <div className='d-flex flex-row'>
              {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                return (
                  <button
                    type='button'
                    key={i}
                    className='btn btn-lg p-0 mx-0 border-0'
                    onClick={(e) => setRating(ratingValue)}
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(0)}
                  >
                    <FontAwesomeIcon
                      icon={ratingValue <= (hover || rating) ? faStar : faStarEmpty}
                      size='lg'
                      style={{ color: '#C06014' }}
                    />
                  </button>
                );
              })}
            </div>
            <p className='fs-6 font-monospace my-0'>Select your Rating</p>
          </div>
          <hr className='my-2 invisible' />
          <div className='col-10'>
            <textarea
              name='review'
              id='reviewInput'
              className='form-control'
              placeholder='Leave your review...'
              onChange={(e) => handleReviewChange(e)}
              required
            ></textarea>
            <h6 className={`mt-1 ${!validCharCount ? 'text-danger' : ''}`}>{charCount}</h6>
          </div>
          <div className='col-6 text-center mt-3'>
            <button
              type='submit'
              className={`btn btn-outline-secondary text-ochre border-0 ${
                !validCharCount || !rating ? 'disabled' : ''
              }`}
            >
              Submit
            </button>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer className='text-center'></Modal.Footer>
    </Modal>
  );
};

export const ImageModal = ({ show, toggleShow, setImage, image, setCaption, caption, handleSubmit, userLoggedIn }) => {
  const [charCount, setCharCount] = useState(0);
  const [validCharCount, setValidCharCount] = useState(true);
  const charLimit = 100;

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
    setCharCount(e.target.value.length);
    if (e.target.value.length <= charLimit) {
      setValidCharCount(true);
    } else {
      setValidCharCount(false);
    }
  };

  if (!userLoggedIn) {
    return (
      <Modal show={show} onHide={() => toggleShow(false)} centered fullscreen={'sm-down'} keyboard>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <p className='text-center'>You must be logged in to upload an image.</p>
        </Modal.Body>
        <Modal.Footer className='text-center'></Modal.Footer>
      </Modal>
    );
  }

  return (
    <Modal show={show} onHide={() => toggleShow(false)} centered fullscreen={'sm-down'} keyboard>
      <Modal.Header closeButton>Upload an Image</Modal.Header>
      <Modal.Body>
        <form className='row d-flex justify-content-center' onSubmit={handleSubmit}>
          <div className='col-10'>
            <input
              type='file'
              name='upload'
              accept='image/*'
              id='imageInput'
              className='form-control'
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </div>
          <div className='col-10 mt-3'>
            <textarea
              name='caption'
              id='captionInput'
              className='form-control'
              placeholder='Leave a caption (optional)'
              onChange={(e) => handleCaptionChange(e)}
            ></textarea>
            {charCount > 0 && <h6 className={`mt-1 ${!validCharCount ? 'text-danger' : ''}`}>{charCount}</h6>}
          </div>
          <div className='col-6 text-center mt-3'>
            <button
              type='submit'
              className={`btn btn-outline-secondary text-ochre border-0 ${!validCharCount ? 'disabled' : ''}`}
            >
              Upload
            </button>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer className='text-center'></Modal.Footer>
    </Modal>
  );
};

export const ConfirmModal = ({ show, toggleShow, handleDelete, header }) => {
  return (
    <Modal show={show} onHide={() => toggleShow(false)} centered fullscreen={'sm-down'} keyboard>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <Modal.Body>
          <p>{`Are you sure you want to delete ${header}?`}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => toggleShow(false)}>
            No
          </Button>
          <Button variant='danger' onClick={handleDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
};

export const ProfilePictureModal = ({ show, toggleShow, handleChange, handleSubmit }) => {
  return (
    <Modal show={show} onHide={() => toggleShow(false)} centered fullscreen={'sm-down'} keyboard>
      <Modal.Header closeButton>
        <Modal.Title>Upload Avatar</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className='row d-flex justify-content-center' onSubmit={handleSubmit}>
          <div className='col-10'>
            <input
              type='file'
              name='profile_picture'
              accept='image/*'
              className='form-control'
              onChange={(e) => handleChange(e.target)}
              required
            />
          </div>
          <div className='col-6 text-center mt-3'>
            <button type='submit' className='btn btn-outline-primary text-ochre border-0'>
              Upload
            </button>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer className='text-center'></Modal.Footer>
    </Modal>
  );
};

export const PictureFullscreenModal = ({ show, toggleShow, imageDetails }) => {
  return (
    <Modal show={show} size='lg' onHide={() => toggleShow(false)} centered fullscreen={'sm-down'} keyboard>
      <Modal.Header closeButton>
        {imageDetails.caption !== '' && <p className='fs-5 text-secondary'>"{imageDetails.caption}"</p>}
      </Modal.Header>
      <Modal.Body>
        <div
          className='fullscreen-img figure-img border'
          style={{ backgroundImage: `url(${imageDetails.image})` }}
        ></div>
      </Modal.Body>
      <Modal.Footer className='d-flex flex-column align-items-start'>
        <p className='fs-5'>{`Posted by ${imageDetails.user}`}</p>
        <p className='fs-6 text-secondary fst-italic'>
          {`Created on: ${new Date(imageDetails.created_at).toLocaleString()}`}{' '}
        </p>
      </Modal.Footer>
    </Modal>
  );
};
