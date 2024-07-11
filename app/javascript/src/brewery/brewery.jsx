import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import Layout from '@utils/layout';
import { GetBreweriesById } from '@utils/breweryDBRequests';
import { SocialMediaSearch } from '@utils/googleRequests';
import { MapModalTemplate, ReviewModal, ImageModal } from '@utils/modalTemplates';
import './brewery.scss';

const Brewery = (props) => {
  const [id, setId] = useState('');
  const [brewery, setBrewery] = useState({});
  const [showMap, setShowMap] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [facebookLink, setFacebookLink] = useState('');
  const [instagramLink, setInstagramLink] = useState('');
  const [isFixed, setIsFixed] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const column = document.querySelector('#leftColumn');
    const columnOffsetTop = column.offsetTop;

    const onScroll = () => {
      if (window.scrollY >= columnOffsetTop - 50) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setId(props.data.id);
  }, [props.data.id]);

  useEffect(() => {
    if (id) {
      GetBreweriesById(id, (response) => {
        setBrewery(response);
      });
    }
  }, [id]);

  useEffect(() => {
    if (Object.keys(brewery).length > 0) {
      console.log('social media search for ' + brewery.name);
      // SocialMediaSearch(brewery.name, (response) => {
      //   console.log(response);
      //   getSocialLinks(response.items);
      // });
    }
  }, [brewery]);

  const getSocialLinks = (results) => {
    let facebookLink = null;
    let instagramLink = null;

    for (const item of results) {
      if (!facebookLink && item.link.includes('facebook.com')) {
        facebookLink = item.link;
      } else if (!instagramLink && item.link.includes('instagram.com')) {
        instagramLink = item.link;
      }

      if (facebookLink && instagramLink) break;
    }

    setFacebookLink(facebookLink);
    setInstagramLink(instagramLink);
  };

  const formatPhoneNumber = (num) => `(${num.slice(0, 3)}) ${num.slice(3, 6)}-${num.slice(6)}`;

  return (
    <Layout currentComponent='brewery'>
      <div className='container-xl pt-5 bg-secondary bg-opacity-10'>
        <div className='row'>
          <div className='col-12 col-md-8 mb-2 d-flex flex-column flex-sm-row py-2 justify-content-around align-items-center align-items-sm-start'>
            <img src='https://placehold.co/200' className='ms-0 ms-md-5' />
            <div className='col-md-6 d-flex flex-column text-ochre text-center text-md-start ms-0 ms-md-5 mt-3 mt-md-0 justify-content-around'>
              <h4 className=''>{brewery.name}</h4>
              <h6 className='lead fs-6 fw-normal text-capitalize'>{brewery.brewery_type}</h6>
              <h6 className='lead fs-6 fw-normal'>
                {brewery.city}, {brewery.state}
              </h6>
              <h5 className='text-dark mt-3'>
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <small className='fs-6 ms-1'>5.0 (5 reviews)</small>
              </h5>
            </div>
          </div>
          <hr />
          <div className='col-12 d-flex flex-column flex-md-row'>
            <div
              id='leftColumn'
              className={`col-12 col-md-4 d-flex flex-row flex-md-column align-items-center ${
                windowWidth >= 768
                  ? 'border-end border-secondary px-0 px-md-1'
                  : 'border-bottom border-secondary pb-3 justify-content-around'
              } ${isFixed && windowWidth >= 768 ? 'position-sticky top-0 vh-100 justify-content-center' : ''}`}
            >
              <div className='col-6 col-sm-5 col-md-10 d-flex flex-column justify-content-center align-items-center border px-4 py-5 bg-light text-ochre gap-2'>
                <h4 className='d-flex flex-row gap-3'>
                  {brewery.website_url !== null && (
                    <a href={brewery.website_url} className='link-dark' target='_blank' rel='noreferrer'>
                      <FontAwesomeIcon icon={faGlobe} />
                    </a>
                  )}
                  <a href={facebookLink} className='link-dark' target='_blank' rel='noreferrer'>
                    <FontAwesomeIcon icon={faFacebook} />
                  </a>
                  <a href={instagramLink} className='link-dark' target='_blank' rel='noreferrer'>
                    <FontAwesomeIcon icon={faInstagram} />
                  </a>
                </h4>
                {(() => {
                  if (!brewery.phone) {
                    return null;
                  }
                  return <h6>{formatPhoneNumber(brewery.phone)}</h6>;
                })()}
                <h6>{brewery.street}</h6>
                {/* <h6>Open Until 11:00pm</h6> */}
              </div>
              <div id='breweryButtonDiv' className='d-flex flex-column'>
                <button
                  className='btn btn-outline-secondary border-0 text-ochre mt-3'
                  onClick={(e) => setShowMap(true)}
                >
                  Show Map
                </button>
                <button
                  className='btn btn-outline-secondary border-0 text-ochre mt-3'
                  onClick={(e) => setShowImageModal(true)}
                >
                  Upload Image
                </button>
                <button
                  className='btn btn-outline-secondary border-0 text-ochre mt-3'
                  onClick={(e) => setShowReviewModal(true)}
                >
                  Leave a Review
                </button>
              </div>
            </div>
            <div className='col-12 col-md-8 d-flex flex-column align-items-center mt-3'>
              <div className='col-11 d-flex flex-row justify-content-start gap-3 py-5 border-bottom border-secondary overflow-scroll overflow-hidden'>
                <img src='https://placehold.co/150' />
                <img src='https://placehold.co/150' />
                <img src='https://placehold.co/150' />
                <img src='https://placehold.co/150' />
                <img src='https://placehold.co/150' />
                <img src='https://placehold.co/150' />
              </div>
              <div className='col-8 col-md-6 d-flex align-items-center flex-column'>
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
      <MapModalTemplate
        showMap={showMap}
        toggleShowMap={setShowMap}
        name={brewery.name}
        city={brewery.city}
        state={brewery.state}
        street={brewery.street}
      />

      <ReviewModal show={showReviewModal} setShow={setShowReviewModal} />

      <ImageModal show={showImageModal} setShow={setShowImageModal} />
    </Layout>
  );
};

export default Brewery;
