import { combineReducers } from 'redux';
import WeatherReducer from './reducer_weather'
import FilterReducer from './reducer_filter'

const rootReducer = combineReducers({
  weather: WeatherReducer,
  filter: FilterReducer
});

export default rootReducer;