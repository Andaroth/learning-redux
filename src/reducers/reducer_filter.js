import{ FILTER_WEATHER } from '../actions'

export default (state = [], action) => {
    switch (action.type) {
        case FILTER_WEATHER: 
            return [ action.payload.data, ...state] // create table and insert state
            break
    }
    return state
}