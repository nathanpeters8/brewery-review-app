import React, { useState, useEffect } from 'react';
import {
  SubmitReview,
  GetReviewsByBrewery,
  UploadImage,
  GetImagesByBrewery,
  Authenticate,
  DeleteReview,
  DeleteImage,
  SocialMediaSearch,
} from '@utils/apiService';
import { GetBreweriesById } from '@utils/openBreweryDBRequests';
import { MapModalTemplate, ReviewModal, ImageModal, ConfirmModal } from '@utils/modalTemplates';
import BreweryReviews from './breweryReviews';
import BreweryImages from './breweryImages';
import LeftColumn from './leftColumn';
import Header from './header';
import Layout from '@utils/layout';
import './brewery.scss';

const Brewery = (props) => {
  const [id, setId] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isFixed, setIsFixed] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [brewery, setBrewery] = useState({});
  const [breweryReviews, setBreweryReviews] = useState([]);
  const [breweryImages, setBreweryImages] = useState([]);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [facebookLink, setFacebookLink] = useState('');
  const [instagramLink, setInstagramLink] = useState('');
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [ratingHover, setRatingHover] = useState(0);
  const [review, setReview] = useState('');
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [selectedContent, setSelectedContent] = useState(null);
  const [selectedContentID, setSelectedContentID] = useState(null);

  // Fix left column on scroll
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

  // Get current user
  useEffect(() => {
    Authenticate((response) => {
      setCurrentUser(response.username);
    });
  }, []);

  // Update id state when props.data.id changes
  useEffect(() => {
    setId(props.data.id);
  }, [props.data.id]);

  // Fetch brewery data when id changes
  useEffect(() => {
    if (id) {
      GetBreweriesById(id, (response) => {
        setBrewery(response);
        setLoading(false);
        GetReviewsByBrewery(id, (reviews) => {
          setBreweryReviews(reviews);
        });
        GetImagesByBrewery(id, (images) => {
          setBreweryImages(images);
        });
      });
    }
  }, [id]);

  // Search for social media links when brewery changes
  useEffect(() => {
    if (Object.keys(brewery).length > 0) {
      console.log('social media search for ' + brewery.name);
      SocialMediaSearch(brewery.name, (response) => {
        console.log(response);
        getSocialLinks(response.items);
      });
    }
  }, [brewery]);

  // Handle image upload
  const handleImageUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (image === null) {
      alert('Must provide an image');
    } else {
      formData.append('image[upload]', image);
      formData.append('image[caption]', caption);
      formData.append('image[brewery_id]', id);
      formData.append('image[brewery_name]', brewery.name);

      UploadImage(formData, (response) => {
        console.log(response);
        setImage(null);
        setShowImageModal(false);
        window.location.reload();
      });
    }
  };

  // Handle review submission
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (rating === 0 || review === '') {
      alert('Please provide a rating and review');
    } else {
      formData.append('review[rating]', rating);
      formData.append('review[content]', review);
      formData.append('review[brewery_id]', id);
      formData.append('review[brewery_name]', brewery.name);

      SubmitReview(formData, (response) => {
        console.log(response);
        setRating(0);
        setReview('');
        setShowReviewModal(false);
        window.location.reload();
      });
    }
  };

  // Show confirm modal
  const handleShowConfirmModal = (id, content) => {
    console.log(content);
    console.log(id);
    setSelectedContent(content);
    setSelectedContentID(id);
    setShowConfirmModal(true);
  };

  // Handle review deletion
  const handleReviewDelete = () => {
    DeleteReview(selectedContentID, (response) => {
      console.log(response);
      setShowConfirmModal(false);
      setSelectedContent(null);
      setSelectedContentID(null);
      window.location.reload();
    });
  };

  // Handle image deletion
  const handleImageDelete = () => {
    DeleteImage(selectedContentID, (response) => {
      console.log(response);
      setShowConfirmModal(false);
      setSelectedContent(null);
      setSelectedContentID(null);
      window.location.reload();
    });
  };

  // Get social media links from search results
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

  return (
    <Layout currentComponent='brewery'>
      <div className='container-xl pt-5 bg-secondary bg-opacity-10'>
        <div className='row'>
          {loading && <h4 className='text-center'>Loading...</h4>}
          <div className='col-12 col-md-8 mb-2 d-flex flex-column flex-sm-row py-2 justify-content-around align-items-center align-items-sm-start'>
            <Header brewery={brewery} breweryImages={breweryImages} breweryReviews={breweryReviews} />
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
              <LeftColumn
                brewery={brewery}
                setShowMap={setShowMap}
                setShowImageModal={setShowImageModal}
                setShowReviewModal={setShowReviewModal}
                facebookLink={facebookLink}
                instagramLink={instagramLink}
              />
            </div>
            <div className='col-12 col-md-8 d-flex flex-column align-items-center mt-3'>
              <BreweryImages
                breweryImages={breweryImages}
                currentUser={currentUser}
                handleShowConfirmModal={handleShowConfirmModal}
              />
              <BreweryReviews
                breweryReviews={breweryReviews}
                currentUser={currentUser}
                handleShowConfirmModal={handleShowConfirmModal}
              />
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

      <ReviewModal
        show={showReviewModal}
        toggleShow={setShowReviewModal}
        review={review}
        setReview={setReview}
        rating={rating}
        setRating={setRating}
        hover={ratingHover}
        setHover={setRatingHover}
        handleSubmit={handleReviewSubmit}
      />

      <ImageModal
        show={showImageModal}
        toggleShow={setShowImageModal}
        setImage={setImage}
        image={image}
        setCaption={setCaption}
        caption={caption}
        handleSubmit={handleImageUpload}
      />
      {(() => {
        if (selectedContent === 'review')
          return (
            <ConfirmModal
              show={showConfirmModal}
              toggleShow={setShowConfirmModal}
              handleDelete={handleReviewDelete}
              header='this review'
            />
          );
        if (selectedContent === 'image')
          return (
            <ConfirmModal
              show={showConfirmModal}
              toggleShow={setShowConfirmModal}
              handleDelete={handleImageDelete}
              header='this image'
            />
          );
      })()}
    </Layout>
  );
};

export default Brewery;
