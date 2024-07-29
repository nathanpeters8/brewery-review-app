import React, { useState, useEffect } from 'react';
import Layout from '@utils/layout';
import { getAllStates, getCities } from '@utils/fetchHelper';
import { GetCitySuggestions } from '@utils/apiService';
import Select from 'react-select';
import './home.scss';

const Home = (props) => {
  // state variables
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [stateSuggestions, setStateSuggestions] = useState([]);
  const [citySuggestions, setCitySuggestions] = useState([]);

  const debounce = (func, wait) => {
    let timeout;
    return function (...args) {
      const context = this;
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        timeout = null;
        func.apply(context, args);
      }, wait);
    };
  };

  const fetchCitySuggestions = (value) => {
    if (value) {
      GetCitySuggestions(value, state, (response) => {
        const cityArray = response.map((city) => ({
          label: city.name,
          value: city.name,
          state: city.state_name,
        }));

        // Use a Map to track occurrences of city names
        const cityMap = new Map();
        cityArray.forEach((city) => {
          if (cityMap.has(city.value)) {
            cityMap.get(city.value).push(city.state);
          } else {
            cityMap.set(city.value, [city.state]);
          }
        });

        // Modify labels for duplicate city names
        const uniqueCities = cityArray.map((city) => {
          const states = cityMap.get(city.value);
          if (states.length > 1) {
            return {
              ...city,
              label: `${city.label} (${city.state})`,
            };
          }
          return city;
        });

        setCitySuggestions(uniqueCities);
      });
    }
  };

  const fetchStateSuggestions = (value = null) => {
    if (value) {
      const suggestions = getAllStates()
        .filter((state) => state.toLowerCase().includes(value.toLowerCase()))
        .map((state) => ({ label: state, value: state }));
      setStateSuggestions(suggestions);
    } else {
      setStateSuggestions(getAllStates().map((state) => ({ label: state, value: state })));
    }
  };

  useEffect(() => {
    console.log(citySuggestions);
  }, [citySuggestions]);

  useEffect(() => {
    console.log(state);
  }, [state]);

  // handle search form submission
  const handleSearch = (event) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (name) params.append('name', name.replace(' ', '_').toLowerCase());
    if (city) params.append('city', city.toLowerCase());
    if (state) params.append('state', state.toLowerCase());

    window.location.href = `/results?${params.toString()}`;
  };

  const handleCityChange = (selectedOption) => {
    if (selectedOption) {
      setCity(selectedOption.value);
      setState(selectedOption.state);
    } else {
      setCity('');
    }
  }

  const debounceFetchCities = debounce(fetchCitySuggestions, 1000);

  return (
    <Layout currentComponent='home'>
      <div className='container-xl pt-5 d-flex flex-column align-items-center bg-secondary bg-opacity-10 vh-100'>
        <div className='row'>
          <h4 className='text-center text-ochre'>Search for breweries using any or all fields below:</h4>
        </div>
        {/* Brewery Search Form */}
        <form
          id='homeBrewerySearch'
          className='row d-flex justify-content-center mt-4 border bg-secondary bg-opacity-25 py-5'
          onSubmit={handleSearch}
        >
          <div className='col-10 col-sm-8 text-center text-dark'>
            <label htmlFor='breweryName' className='form-label'>
              Brewery Name
            </label>
            <input
              type='search'
              id='breweryName'
              name='name'
              className='form-control text-center text-ochre'
              onChange={(event) => setName(event.target.value)}
              value={name}
            />
          </div>
          <div className='col-10 col-sm-5 text-center mt-3 text-dark'>
            <label htmlFor='city' className='form-label'>
              City
            </label>
            <Select
              id='city'
              components={{ DropdownIndicator: () => null }}
              options={citySuggestions}
              onInputChange={(value) => debounceFetchCities(value)}
              onChange={(selectedOption) => handleCityChange(selectedOption)}
              value={citySuggestions.find((option) => option.value === city)}
              styles={{
                option: (styles, state) => ({
                  ...styles,
                  color: '#C06014',
                  backgroundColor: state.isFocused ? 'lightgrey' : 'transparent',
                }),
                singleValue: (styles) => ({ ...styles, color: '#C06014' }),
              }}
              isClearable={true}
              openMenuOnClick={false}
            />
          </div>
          <div className='col-10 d-flex flex-column col-sm-5 text-center mt-3 text-dark'>
            <label htmlFor='state' className='form-label'>
              State
            </label>
            <Select
              id='state'
              components={{ DropdownIndicator: () => null }}
              options={stateSuggestions}
              onFocus={() => fetchStateSuggestions()}
              onInputChange={(value) => fetchStateSuggestions(value)}
              onChange={(selectedOption) => (selectedOption ? setState(selectedOption.value) : setState(''))}
              value={stateSuggestions.find((option) => option.value === state)}
              styles={{
                option: (styles, state) => ({
                  ...styles,
                  color: '#C06014',
                  backgroundColor: state.isFocused ? 'lightgrey' : 'transparent',
                }),
                singleValue: (styles) => ({ ...styles, color: '#C06014' }),
              }}
              classNames={{ control: (state) => 'text-center text-ochre' }}
              isClearable={true}
              openMenuOnClick={true}
            />
          </div>
          <div className='col-8 text-center mt-5'>
            <button className='btn btn-lg btn-outline-secondary text-ochre border-0'>Search</button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Home;
