import React from 'react';
import { Carousel } from 'primereact/carousel';

const BreweryCarousel = ({ breweries, setClickedBrewery, setShowMapModal }) => {
  
  // handle opening map modal
  const handleOpenMap = (brewery) => {
    setClickedBrewery(brewery);
    setShowMapModal(true);
  };

  // carousel item template
  const itemTemplate = (brewery) => {
    return (
      <div className='border border-light border-round m-2 text-center py-5 px-3 overflow-hidden'>
        <div>
          <img src='https://placehold.co/100' alt='' />
        </div>
        <div className='mt-2 d-flex flex-column gap-1'>
          <a className='h5 text-ochre' href={`/brewery/${brewery.id}`}>
            {brewery.name}
          </a>
          <h6 className='text-capitalize'>{brewery.street}</h6>
          <h6>{brewery.phone ? formatPhoneNumber(brewery.phone) : ''}</h6>
        </div>
        <button
          className='btn btn-outline-secondary mt-2 text-ochre border-none'
          onClick={() => handleOpenMap(brewery)}
        >
          View Map
        </button>
      </div>
    );
  };

  // responsive options for carousel
  const responsiveOptions = [
    {
      breakpoint: '1199px',
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: '991px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '575px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  // format phone number
  const formatPhoneNumber = (num) => `(${num.slice(0, 3)}) ${num.slice(3, 6)}-${num.slice(6)}`;

  return (
    <div className='card bg-secondary bg-opacity-10'>
      <Carousel
        value={breweries}
        numVisible={3}
        numScroll={1}
        itemTemplate={itemTemplate}
        responsiveOptions={responsiveOptions}
        autoplayInterval={3000}
        circular
      />
    </div>
  );
};

export default BreweryCarousel;
