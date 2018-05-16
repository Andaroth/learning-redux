import React, { Component } from 'react';

import SearchBar from './searchbar'
import FilterForm from './filterform'
import WeatherList from './weather-list'
// import ForecastSelect from './forecast-select'

export default class App extends Component {
  render() {
    return (
      <div className="row">
        <h1>Axel Weather</h1>
        <SearchBar />
        <FilterForm />
        <WeatherList />
        {/* <ForecastSelect /> */}
      </div>
    );
  }
}
