import axios from 'axios'

const API_KEY = "1b2d173ca3f1442b93b113811180805"
const ROOT_URL = `https://api.apixu.com/v1/`

export const FETCH_WEATHER = "FETCH_WEATHER"
export const FILTER_WEATHER = "FILTER_WEATHER"

// fetch the weather
export function fetchWeather(query) {
    const apicall = `${ROOT_URL}forecast.json?&key=${API_KEY}&q=${query}&lang=en&days=10`
    const request = axios.get(apicall)

    // console.log(request)
    return {
        type: FETCH_WEATHER, // needs to be const
        payload: request
    } // return end
} // fetchWeather() end

// filter the weather
export function filterWeather(min,max) {
    const existing = ["Nivelles","Bruxelles"]
    const request = [
        existing.map(
            (thisPlace) => {
                const apicall = `${ROOT_URL}history.json?&key=${API_KEY}&q=${thisPlace}&lang=en&dt=${min}&end_dt=${max}`
                return axios.get(apicall)
            } // callback end
        ) // map end
    ] // const request end
    return {
        type: FILTER_WEATHER,
        payload: request
    } // return end
} // filterWeather() end