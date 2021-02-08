import React, { useState, useEffect } from 'react';
import './App.css';
import ImageBG from './images/bg_weather.jpg';
import SelectSearch, { fuzzySearch } from 'react-select-search';
import './searchbox.css';

import { countries } from './data';
function App() {
  const [form, setForm] = useState({ state: '', city: 'Kota Bandung' });
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [weather, setWeather] = useState({
    icon: '',
    des: '',
    temp: '',
    temp_min: '',
    temp_max: '',
    errorcod: '',
  });

  useEffect(async () => {
    await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${form.city.substr(
        5
      )}&appid=0755804cb83ab934a88cd034d880414b`
    )
      .then(res => res.json())
      .then(data => {
        setWeather({
          icon: data.weather[0].icon,
          des: data.weather[0].description,
          temp: data.main.temp,
          temp_max: data.main.temp_max,
          temp_min: data.main.temp_min,
        });
      })
      .catch(err => setWeather({ errorcod: err }));
  }, []);
  useEffect(() => {
    fetch(`https://dev.farizdotid.com/api/daerahindonesia/provinsi`)
      .then(res => res.json())
      .then(data => {
        setState(data.provinsi);
      })
      .catch(err => console.log(err));
    fetch(
      `https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${form.state}`
    )
      .then(res => res.json())
      .then(data => {
        setCity(data.kota_kabupaten);
      })
      .catch(err => console.log(err));
  }, [form]);
  // console.log(weather);

  let stateOption = state.map(state => {
    let properties = {
      name: state.nama,
      value: state.id,
    };
    return properties;
  });
  let cityOption = city.map(city => {
    let properties = {
      name: city.nama,
      value: city.nama,
    };
    return properties;
  });

  const onSubmit = () => {
    if (form.state && form.city) {
      if (form.city.substr(0, 4) === 'Kota') {
        fetch(
          `http://api.openweathermap.org/data/2.5/weather?q=${form.city.substr(
            5
          )}&appid=0755804cb83ab934a88cd034d880414b`
        )
          .then(res => res.json())
          .then(data => {
            setWeather({
              icon: data.weather[0].icon,
              des: data.weather[0].description,
              temp: data.main.temp,
              temp_max: data.main.temp_max,
              temp_min: data.main.temp_min,
            });
          })
          .catch(err => setWeather({ errorcod: err }));
      } else {
        fetch(
          `http://api.openweathermap.org/data/2.5/weather?q=${form.city.substr(
            10
          )}&appid=0755804cb83ab934a88cd034d880414b`
        )
          .then(res => res.json())
          .then(data => {
            setWeather({
              icon: data.weather[0].icon,
              des: data.weather[0].description,
              temp: data.main.temp,
              temp_max: data.main.temp_max,
              temp_min: data.main.temp_min,
            });
          })
          .catch(err => setWeather({ errorcod: err }));
      }
    }
  };

  console.log(weather);

  return (
    <div className='bg-image-bg bg-cover  '>
      <div className='container mx-auto flex justify-center '>
        <div className=' pt-16 grid gap-32 grid-cols-3 justify-center items-center'>
          <div className=' '>
            <h1 className='text-3xl text-gray-300 pb-3'>State</h1>
            <SelectSearch
              options={stateOption}
              search
              filterOptions={fuzzySearch}
              emptyMessage='State Not found'
              placeholder='Select your state'
              onChange={value => {
                setForm({ ...form, state: value });
              }}
            />
          </div>

          <div className=''>
            <h1 className='text-3xl text-gray-300 pb-3'>City</h1>
            <SelectSearch
              options={cityOption}
              search
              filterOptions={fuzzySearch}
              emptyMessage='State Not found'
              placeholder='Select your city'
              onChange={value => setForm({ ...form, city: value })}
            />
          </div>

          <div>
            <button
              className='bg-green-500 rounded px-6 py-2 text-2xl mt-8'
              // onSubmit={onSubmit}
              onClick={onSubmit}
            >
              Get Weather
            </button>
          </div>
        </div>
      </div>
      {weather.errorcod ? (
        <div className='h-screen flex flex-col items-center mt-16'>
          <h1 className='text-3xl text-white'>Data Tidak Ditemukan</h1>
        </div>
      ) : (
        <div className='h-screen flex flex-col items-center mt-16'>
          <h1 className='text-5xl text-white font-mono'>
            {form.city},Indonesia
          </h1>
          <img
            src={`https://openweathermap.org/img/w/${weather.icon}.png`}
            className='w-2/12 '
          />
          <span className='text-5xl text-white font-mono'>
            {weather.temp}&deg;
          </span>
          <div className='space-x-32 mt-12'>
            <span className='text-4xl text-white font-mono'>
              {weather.temp_max}&deg;
            </span>
            <span className='text-4xl text-white font-mono'>
              {weather.temp_min}&deg;
            </span>
          </div>

          <span className='text-4xl text-white font-mono mt-12'>
            {weather.des}
          </span>
        </div>
      )}

      {/* <p className='text-3xl'>Waw</p> */}
      <p></p>
    </div>
  );
}

export default App;
