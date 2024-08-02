import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';

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
          <div className='col-8 form-floating'>
            <input
              id='inputEmail'
              className={`form-control ${isEmailFocused ? (validEmail ? 'bg-success' : 'bg-danger-soft') : ''}`}
              type='text'
              name='email'
              placeholder='name@example.com'
              onChange={(e) => handleChange(e.target)}
              onFocus={() => setIsEmailFocused(true)}
              onBlur={handleEmailBlur}
              value={email}
              required={formType !== 'editprofile' ? true : false}
            />
            <label htmlFor='inputEmail' className='form-label'>
              Email
            </label>
          </div>
          {formType !== 'login' && (
            <div className='col-8 form-floating'>
              <input
                id='inputUsername'
                className={`form-control ${isNameFocused ? (validUsername ? 'bg-success' : 'bg-danger-soft') : ''}`}
                type='text'
                name='username'
                placeholder='my_username'
                onChange={(e) => handleChange(e.target)}
                onFocus={() => setIsNameFocused(true)}
                onBlur={handleUsernameBlur}
                value={username}
                required={formType !== 'editprofile' ? true : false}
              />
              <label htmlFor='inputUsername' className='form-label'>
                Username
              </label>
            </div>
          )}
          <div className='col-8 text-center form-floating'>
            <input
              id='inputPassword'
              className='form-control'
              type='password'
              name='password'
              placeholder='1234567890'
              onChange={(e) => handleChange(e.target)}
              value={password}
              required={formType !== 'editprofile' ? true : false}
            />
            <label htmlFor='inputPassword' className='form-label'>
              Password
            </label>
          </div>
          {formType !== 'login' && (
            <div className='col-10 d-flex flex-row justify-content-center gap-3'>
              <div className='col-5 text-center form-floating'>
                <input
                  id='inputCity'
                  className='form-control'
                  type='city'
                  name='city'
                  placeholder='Denver'
                  onChange={(e) => handleChange(e.target)}
                  value={city}
                />
                <label htmlFor='inputCity' className='form-label'>
                  City
                </label>
              </div>
              <div className='col-5 text-center form-floating'>
                <input
                  id='inputState'
                  className='form-control'
                  type='state'
                  name='state'
                  placeholder='Colorado'
                  onChange={(e) => handleChange(e.target)}
                  value={state}
                />
                <label htmlFor='inputState' className='form-label'>
                  State
                </label>
              </div>
            </div>
          )}
          {formType === 'signup' && (
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
}) => {
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
              onChange={(e) => setReview(e.target.value)}
              required
            ></textarea>
          </div>
          <div className='col-6 text-center mt-3'>
            <button type='submit' className='btn btn-outline-primary text-ochre border-0'>
              Submit
            </button>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer className='text-center'>
        {/* <Button variant='outline-primary' className='text-ochre border-0'>
          Submit
        </Button> */}
      </Modal.Footer>
    </Modal>
  );
};

export const ImageModal = ({ show, toggleShow, setImage, image, setCaption, caption, handleSubmit }) => {
  return (
    <Modal show={show} onHide={() => toggleShow(false)} centered fullscreen={'sm-down'} keyboard>
      <Modal.Header closeButton></Modal.Header>
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
          <div className='col-10'>
            <textarea
              name='caption'
              id='captionInput'
              className='form-control'
              placeholder='Leave your caption...'
              onChange={(e) => setCaption(e.target.value)}
              required
            ></textarea>
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
      <Modal.Header closeButton></Modal.Header>
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

export const PictureFullscreenModal = ({ show, toggleShow, image }) => {
  return (
    <Modal show={show} size='lg' onHide={() => toggleShow(false)} centered fullscreen={'sm-down'} keyboard>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <div className='fullscreen-img figure-img border' style={{ backgroundImage: `url(${image})` }}></div>
      </Modal.Body>
      <Modal.Footer className='text-center'></Modal.Footer>
    </Modal>
  );
};