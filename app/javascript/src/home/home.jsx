import React, { useState, useEffect, useRef } from 'react';
import Layout from '@utils/layout';
import { getAllStates } from '@utils/fetchHelper';
import { GetCitySuggestions } from '@utils/apiService';
import { GetBreweriesForAutoComplete } from '@utils/openBreweryDBRequests';
import Select from 'react-select';
import { AutoComplete } from 'primereact/autocomplete';
import './home.scss';
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css';

const Home = (props) => {
  // state variables
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [stateSuggestions, setStateSuggestions] = useState([]);
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [brewerySuggestions, setBrewerySuggestions] = useState([]);
  const [citiesLoading, setCitiesLoading] = useState(false);
  const stateInputRef = useRef(null);

  // debounce function
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

  // fetch city suggestions
  const fetchCitySuggestions = (value) => {
    if (value) {
      setCitiesLoading(true);

      // Get city suggestions based on input value
      GetCitySuggestions(value, state, (response) => {
        const cityArray = response.map((city) => ({
          label: city.name,
          value: city.name,
          state: city.state_name,
        }));

        // Create a map of city names to states
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
              label: (
                <span>
                  {city.label}{' '}
                  <span className='text-secondary' style={{ fontSize: 'smaller', fontStyle: 'italic' }}>
                    ({city.state})
                  </span>
                </span>
              ),
            };
          }
          return city;
        });

        setCitySuggestions(uniqueCities);
        setCitiesLoading(false);
      });
    }
  };

  // Fetch state suggestions
  const fetchStateSuggestions = (value = null) => {
    if (value) {
      // Filter states based on input value
      const suggestions = getAllStates()
        .filter((state) => state.toLowerCase().includes(value.toLowerCase()))
        .map((state) => ({ label: state, value: state }));
      setStateSuggestions(suggestions);
    } else {
      // Get all states
      setStateSuggestions(getAllStates().map((state) => ({ label: state, value: state })));
    }
  };
  
  // Fetch brewery suggestions
  const fetchBrewerySuggestions = () => {
    if(name) {
      GetBreweriesForAutoComplete(name, (response) => {
        console.log(response);
        setBrewerySuggestions([...new Set(response.map((brewery) => brewery.name))].map((brewery) => ({ label: brewery, value: brewery })));
      });
    }
  };

  // handle search form submission
  const handleSearch = (event) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (name) {
      if(typeof name === 'object') {
        params.append('name', name.value.replace(' ', '_').toLowerCase());
      } else {
        params.append('name', name.replace(' ', '_').toLowerCase());
      }
    } 
    if (city) params.append('city', city.toLowerCase());
    if (state) params.append('state', state.toLowerCase());

    window.location.href = `/results?${params.toString()}`;
  };

  // handle city selection
  const handleCityChange = (selectedOption) => {
    if (selectedOption) {
      setCity(selectedOption.value);
      setState(selectedOption.state);
      // Focus on state input after selecting city
      if (stateInputRef.current) {
        stateInputRef.current.focus();
      }
    } else {
      setCity('');
      setState('');
    }
    setCitiesLoading(false);
  };

  // debounce functions
  const debounceFetchCities = debounce(fetchCitySuggestions, 1000);
  const debounceFetchBreweries = debounce(fetchBrewerySuggestions, 1000);

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
            <div className="card justify-content-center">
              <AutoComplete 
                id='breweryName'
                value={name}
                suggestions={brewerySuggestions}
                completeMethod={debounceFetchBreweries}
                field="label"
                onChange={(e) => setName(e.value)}
                inputClassName='w-100 h-100 border-none text-center text-ochre'
              />
            </div>
          </div>
          <div className='col-10 col-sm-5 text-center mt-3 text-dark'>
            <label htmlFor='city' className='form-label'>
              City
            </label>
            <Select
              id='city'
              components={{ DropdownIndicator: () => null }}
              isLoading={citiesLoading}
              loadingMessage={() => 'Loading...'}
              options={citySuggestions}
              onInputChange={(value) => debounceFetchCities(value)}
              onChange={(selectedOption) => handleCityChange(selectedOption)}
              value={citySuggestions.find((option) => option.value === city && option.state === state)}
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
              noOptionsMessage={() => 'No suggestions...'}
              placeholder=''
            />
          </div>
          <div className='col-10 d-flex flex-column col-sm-5 text-center mt-3 text-dark'>
            <label htmlFor='state' className='form-label'>
              State
            </label>
            <Select
              id='state'
              ref={stateInputRef}
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
              placeholder=''
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
