import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Layout from '@utils/layout';
import { GetBreweriesById } from '@utils/breweryDBRequests';
import { MapModalTemplate, ReviewModal, ImageModal } from '@utils/modalTemplates';
import './brewery.scss';

const Brewery = (props) => {
  const [id, setId] = useState('');
  const [brewery, setBrewery] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  useEffect(() => {
    setId(props.data.id);
  }, [props.data.id]);

  useEffect(() => {
    if (id) {
      GetBreweriesById(id, (response) => {
        console.log(response);
        setBrewery(response);
      });
    }
  }, [id]);

  const formatPhoneNumber = (num) => `(${num.slice(0, 3)}) ${num.slice(3, 6)}-${num.slice(6)}`;

  return (
    <Layout>
      <div className='container'>
        <div className='row justify-content-start'>
          <div className='col-8 mb-2 d-flex py-2 justify-content-around'>
            <img src='https://placehold.co/200' />
            <div className='d-flex flex-column'>
              <h4 className=''>{brewery.name}</h4>
              <h5>
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <small className='fs-6 ms-3'>5.0 (5 reviews)</small>
              </h5>
              <h6 className='lead fs-6 fw-normal'>{brewery.brewery_type}</h6>
              <h6 className='lead fs-6 fw-normal'>
                {brewery.city}, {brewery.state}
              </h6>
            </div>
          </div>
          <hr />
          <div className='col-12 d-flex'>
            <div className='col-4 d-flex flex-column align-items-center border-end border-secondary'>
              <div className='border p-5 bg-light'>
                {(() => {
                  if (!brewery.phone) {
                    return null;
                  }
                  return <h6>{formatPhoneNumber(brewery.phone)}</h6>;
                })()}
                <h6>{brewery.street}</h6>
                <h6>Open Until 11:00pm</h6>
              </div>
              <button className='btn btn-warning mt-3' onClick={(e) => setShowMap(true)}>
                Show Map
              </button>
              <button className='btn btn-warning mt-3' onClick={(e) => setShowImageModal(true)}>Upload Image</button>
              <button className='btn btn-warning mt-3' onClick={(e) => setShowReviewModal(true)}>Leave a Review</button>
            </div>
            <div className='col-8 d-flex flex-column align-items-center mt-3'>
              <div className='col-10 d-flex flex-row justify-content-center gap-3 pb-4 ms-4 border-bottom'>
                <img src='https://placehold.co/125' />
                <img src='https://placehold.co/125' />
                <img src='https://placehold.co/125' />
                <img src='https://placehold.co/125' />
              </div>
              <div className='col-6 d-flex align-items-center flex-column'>
                <div className='brewery border-bottom pb-3 mt-5'>
                  <div className='d-flex flex-row justify-content-between'>
                    <h5>Username</h5>
                    <h6 className='lead fs-6'>MM/DD/YYYY</h6>
                  </div>
                  <h6>
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                  </h6>
                  <h6 className='text-center mt-3'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt maxime sunt natus quod placeat!
                    Reiciendis similique illo odio quas voluptas eaque repellendus fuga, provident sed quod amet quaerat
                    libero cupiditate!
                  </h6>
                </div>
                <div className='brewery border-bottom pb-3 mt-5'>
                  <div className='d-flex flex-row justify-content-between'>
                    <h5>Username</h5>
                    <h6 className='lead fs-6'>MM/DD/YYYY</h6>
                  </div>
                  <h6>
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                  </h6>
                  <h6 className='text-center mt-3'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt maxime sunt natus quod placeat!
                    Reiciendis similique illo odio quas voluptas eaque repellendus fuga, provident sed quod amet quaerat
                    libero cupiditate!
                  </h6>
                </div>
                <div className='brewery border-bottom pb-3 mt-5'>
                  <div className='d-flex flex-row justify-content-between'>
                    <h5>Username</h5>
                    <h6 className='lead fs-6'>MM/DD/YYYY</h6>
                  </div>
                  <h6>
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                  </h6>
                  <h6 className='text-center mt-3'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt maxime sunt natus quod placeat!
                    Reiciendis similique illo odio quas voluptas eaque repellendus fuga, provident sed quod amet quaerat
                    libero cupiditate!
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MapModalTemplate showMap={showMap} toggleShowMap={setShowMap} name={brewery.name} city={brewery.city} state={brewery.state} street={brewery.street} />

      <ReviewModal show={showReviewModal} setShow={setShowReviewModal}/>

      <ImageModal show={showImageModal} setShow={setShowImageModal} />
    </Layout>
  );
}

export default Brewery;
