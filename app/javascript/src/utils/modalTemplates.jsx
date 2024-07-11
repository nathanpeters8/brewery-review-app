import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

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
  setEmail,
  setPassword,
  setUsername,
  email,
  password,
  username,
}) => {
  return (
    <Modal show={show} onHide={() => toggleShow(false)} fullscreen={'sm-down'} keyboard>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className='row d-flex justify-content-center gap-3'>
          <div className='col-8 form-floating'>
            <input
              id='inputEmail'
              className='form-control'
              type='text'
              name='email'
              placeholder='name@example.com'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <label htmlFor='inputEmail' className='form-label'>
              Email
            </label>
          </div>
          {formType !== 'login' && (
            <div className='col-8 form-floating'>
              <input
                id='inputUsername'
                className='form-control'
                type='text'
                name='username'
                placeholder='my_username'
                onChange={(e) => setUsername(e.target.value)}
                value={username}
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
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <label htmlFor='inputPassword' className='form-label'>
              Password
            </label>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer className='text-center'>
        <Button variant='outline-primary' className='text-ochre border-0'>{title}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export const ReviewModal = ({show, setShow, setReview, review}) => {
  return (
    <Modal show={show} onHide={() => setShow(false)} centered fullscreen={'sm-down'} keyboard>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <div className='row d-flex justify-content-center'>
          <div className='col-10 d-flex flex-row justify-content-around align-items-center'>
            <h4 className=''>
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
            </h4>
            <p className='fs-6 font-monospace my-0'>Select your Rating</p>
          </div>
          <hr className='my-2 invisible' />
          <div className='col-10'>
            <textarea
              name='review'
              id='reviewInput'
              className='form-control'
              placeholder='Leave your review...'
              onChange={setReview}
              value={review}
              required
            ></textarea>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className='text-center'>
        <Button variant='outline-primary' className='text-ochre border-0'>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export const ImageModal = ({show, setShow, setImage, image}) => {
  return (
    <Modal show={show} onHide={() => setShow(false)} centered fullscreen={'sm-down'} keyboard>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <div className='row d-flex justify-content-center'>
          <div className='col-10'>
            <input
              type='file'
              name='image'
              id='imageInput'
              className='form-control'
              onChange={setImage}
              value={image}
              required
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className='text-center'>
        <Button variant='outline-primary' className='text-ochre border-0'>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}