import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';
import { GetBreweries, GetBreweriesBySearchTerm } from '@utils/openBreweryDBRequests';
import { GetReviewsByBrewery, GetImagesByBrewery, Authenticate } from '@utils/apiService';
import { MapModalTemplate } from '@utils/modalTemplates';
import Layout from '@utils/layout';
import PaginationButtons from './paginationButtons';
import LoadingPlaceholder from './loadingPlaceholder';
import './results.scss';

const Results = ({ queryParams }) => {
  // state variables
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [clickedBrewery, setClickedBrewery] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesArray, setPagesArray] = useState([1, 2]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [breweryRatings, setBreweryRatings] = useState([]);
  const [breweryImages, setBreweryImages] = useState([]);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const itemsPerPage = 10;

  const images = require.context('/app/assets/images/breweries', false, /\.(png|jpe?g|svg)$/);
  const placeholderImages = images.keys().map(images);

  const getRandomImage = () => {
    let index = Math.floor(Math.random() * placeholderImages.length);
    let randImg = placeholderImages[index];
    placeholderImages.splice(index, 1);
    return randImg;
  };

  // check user authentication, on page load
  useEffect(() => {
    Authenticate((error, response) => {
      if (error) {
        alert('Error authenticating user. Please try again later.');
      }
      if (response.authenticated) {
        setUserLoggedIn(true);
      }
    });
  }, []);

  // update query state when queryParams change
  useEffect(() => {
    const params = new URLSearchParams(queryParams);
    setQuery(JSON.parse(params.keys().next().value));
  }, [queryParams]);

  // fetch breweries when query or currentPage changes
  useEffect(() => {
    if (query) {
      setBreweryRatings([]);
      if (query.hasOwnProperty('query')) {
        GetBreweriesBySearchTerm(query, currentPage, itemsPerPage, (error, response) => {
          if (error) {
            alert(error + ' Please try again later.');
          } else {
            setResults(response.breweries);
            setTotal(parseInt(response.metadata.total));
            setLoading(false);
          }
        });
      } else {
        GetBreweries(query, currentPage, itemsPerPage, (error, response) => {
          if (error) {
            alert(error + ' Please try again later.');
          } else {
            setResults(response.breweries);
            setTotal(parseInt(response.metadata.total));
            setLoading(false);
          }
        });
      }
    }
  }, [query, currentPage]);

  // update pagesArray when currentPage changes
  useEffect(() => {
    const totalPages = Math.ceil(total / itemsPerPage);
    if (totalPages > 1) {
      if (currentPage > 1) {
        if (currentPage === totalPages) {
          setPagesArray([currentPage - 1, currentPage]);
        } else {
          setPagesArray([currentPage - 1, currentPage, currentPage + 1]);
        }
      }
    }
  }, [results]);

  // get average ratings and main image for each brewery
  useEffect(() => {
    if (results.length > 0) {
      // get average ratings for each brewery
      const ratingPromises = results.map(
        (brewery) =>
          new Promise((resolve) => {
            GetReviewsByBrewery(brewery.id, (response) => {
              resolve({
                rating: getAverageRating(response).toFixed(1),
                total: response.length,
                brewery_id: brewery.id,
              });
            });
          })
      );
      // get main image for each brewery
      const imagePromises = results.map(
        (brewery) =>
          new Promise((resolve) => {
            GetImagesByBrewery(brewery.id, (images) => {
              resolve({
                upload: images[images.length - 1] ? images[images.length - 1].upload : '',
              });
            });
          })
      );
      // set breweryRatings and breweryImages states
      Promise.all(ratingPromises).then((breweryRatings) => {
        setBreweryRatings(breweryRatings);
      });
      Promise.all(imagePromises).then((breweryImages) => {
        setBreweryImages(breweryImages);
      });
    }
  }, [results]);

  // show map modal when clickedBrewery changes
  useEffect(() => {
    if (clickedBrewery) {
      setShowMap(true);
    } else {
      setShowMap(false);
    }
  }, [clickedBrewery]);

  // get average rating from brewery ratings
  const getAverageRating = (reviews) => {
    let total = 0;
    reviews.forEach((review) => {
      total += review.rating;
    });
    let average = total / reviews.length;
    if (isNaN(average)) return 0;
    return parseFloat(average);
  };

  // handle brewery click
  const handleBreweryClick = (e, id) => {
    e.preventDefault();
    window.location.href = `/brewery/${id}`;
  };

  // handle page change
  const handlePageChange = (e, num) => {
    setCurrentPage(num);
    e.target.blur();
  };

  // format phone number
  const formatPhoneNumber = (num) => `(${num.slice(0, 3)}) ${num.slice(3, 6)}-${num.slice(6)}`;

  // build query string for results
  const buildQueryString = (query, total) => {
    let string = `${total} brewery results`;
    if (query) {
      if (query.name) string += ` for "${query.name.replace('_', ' ')}"`;
      if (query.query) string += ` for "${decodeURIComponent(query.query)}"`;
      if (query.city && !query.state) string += ` in "${query.city}"`;
      if (query.state && !query.city) string += ` in "${query.state}"`;
      if (query.state && query.city) string += ` in "${query.city}, ${query.state}"`;
    }
    return string;
  };

  return (
    <Layout currentComponent='results' userLoggedIn={userLoggedIn} setUserLoggedIn={setUserLoggedIn}>
      <div id='resultsContainer' className='container-xl pt-5 bg-secondary bg-opacity-10'>
        <div id='breweryResults' className='row'>
          {total > 0 && (
            <p className='text-capitalize fst-italic text-center text-sm-start mb-4 ms-0 ms-sm-3'>
              {buildQueryString(query, total)}
            </p>
          )}
          {total > itemsPerPage && !loading && (
            <PaginationButtons
              handlePageChange={handlePageChange}
              currentPage={currentPage}
              pagesArray={pagesArray}
              total={total}
              itemsPerPage={itemsPerPage}
            />
          )}
          {(() => {
            // display loading placeholders while fetching data
            if (loading || breweryRatings.length < results.length || breweryImages.length < results.length) {
              return (
                <>
                  <LoadingPlaceholder />
                  <LoadingPlaceholder />
                </>
              );
            }
            // display message if no results are found
            if (!loading && results.length == 0) {
              return (
                <div className='col-12 d-flex flex-column gap-3'>
                  <h3 className='text-center'>{buildQueryString(query, total)}</h3>
                  <a className='text-center' href='/'>
                    Go Back to Home Page
                  </a>
                </div>
              );
            }
            // display brewery results
            return results.map((brewery, index) => {
              return (
                <div
                  key={index}
                  className='brewery col-12 d-flex border-bottom py-5 align-items-center flex-column flex-sm-row'
                >
                  {breweryImages[index].upload !== '' ? (
                    <div
                      className='col-6 col-sm-5 col-md-3 brewery-main-img mb-3 rounded-2'
                      style={{ backgroundImage: `url(${breweryImages[index].upload})` }}
                      onClick={(e) => handleBreweryClick(e, brewery.id)}
                    ></div>
                  ) : (
                    <div
                      className='col-6 col-sm-5 col-md-3 brewery-main-img mb-3 rounded-2'
                      style={{ backgroundImage: `url(${getRandomImage()})` }}
                      onClick={(e) => handleBreweryClick(e, brewery.id)}
                    ></div>
                  )}
                  <div className='d-flex flex-column ms-1 ms-sm-5 text-center text-sm-start'>
                    <h4 className='ps-0 pb-0 text-dark mb-3 h4' onClick={(e) => handleBreweryClick(e, brewery.id)}>
                      <a href='#' className='link-primary text-ochre'>
                        {brewery.name}
                      </a>
                    </h4>
                    <h4 className='mb-2'>
                      {[...Array(5)].map((star, i) => {
                        return (
                          <FontAwesomeIcon
                            key={i}
                            icon={i < breweryRatings[index].rating ? faStar : faStarEmpty}
                            style={{ color: '#C06014' }}
                          />
                        );
                      })}
                      <small className='fs-6 ms-2'>{`${breweryRatings[index].rating} (${breweryRatings[index].total} reviews)`}</small>
                    </h4>
                    {(() => {
                      if (!brewery.phone) {
                        return null;
                      }
                      return <h6 className='lead fs-6 fw-normal'>{formatPhoneNumber(brewery.phone)}</h6>;
                    })()}
                    <h6 className='lead fs-6 fw-normal'>
                      {brewery.city}, {brewery.state}
                    </h6>
                    <h6 className='lead fs-6 fw-normal' onClick={(e) => setClickedBrewery(brewery)}>
                      <a href='#' className='text-primary'>
                        {brewery.street}
                      </a>
                    </h6>
                  </div>
                </div>
              );
            });
          })()}
          {total > itemsPerPage && !loading && (
            <PaginationButtons
              handlePageChange={handlePageChange}
              currentPage={currentPage}
              pagesArray={pagesArray}
              total={total}
              itemsPerPage={itemsPerPage}
            />
          )}
        </div>
      </div>
      {clickedBrewery && (
        <MapModalTemplate
          showMap={showMap}
          toggleShowMap={setShowMap}
          name={clickedBrewery.name}
          city={clickedBrewery.city}
          state={clickedBrewery.state}
          street={clickedBrewery.street}
        />
      )}
    </Layout>
  );
};

export default Results;
