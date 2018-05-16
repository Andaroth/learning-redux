import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactChartkick, { LineChart } from 'react-chartkick'
import Chart from 'chart.js'
ReactChartkick.addAdapter(Chart)

function mapStateToProps({ weather, filter }) {
    // const weather = state.weather
    // return { weather : weather}
    return { weather, filter }
}

class WeatherList extends Component {
    constructor(props) {
        super(props)
        this.renderWeather = this.renderWeather.bind(this)
        this.getForecastWeather = this.getForecastWeather.bind(this)
        this.getFilterWeather = this.getFilterWeather.bind(this)
    }

    renderWeather(cityData) {
        const forecasttemp = this.getForecastWeather(cityData)
        
        console.log("forecasttemp",forecasttemp)
        const curr = cityData.current
        return(
            
            <tr id={cityData.location.lat+"_"+cityData.location.lat} key={cityData.location.tz_id+"-lat"+cityData.location.lat+"-lon"+cityData.location.lon}>
                <td><h2>{cityData.location.name}</h2> <br /><small>({cityData.location.country})</small></td>
                <td>
                    <b>{curr.temp_c}</b> °C <br/> {curr.condition.text}
                </td>
                <td>
                    <LineChart data={forecasttemp} download={true} colors={["#f00","#00f"]} />
                </td>
            </tr>
        )
    }

    getFilterWeather(cityData) {
        let temp = {}, precip = {}
        cityData.map((index) => {
            cityData[index].forecast.forecastday.map(
                (filter,index) => {
                    const thisdate = filter[index].date
                    const avgtemp = filter[index].day.avgtemp_c
                    const ttlprecip = filter[index].day.totalprecip_mm
                    temp[thisdate] = avgtemp
                    precip[thisdate] = ttlprecip
                }
            )
        })
        return [
            {"name":"Temperatures (°C)", "data":temp},
            {"name":"Precipitations (mm)", "data":precip}
        ]; // return end
    }

    getForecastWeather(cityData) {
        let temp = {}, precip = {}
        cityData.forecast.forecastday.map(
            (weather) => {
                const thisdate = weather.date
                const avgtemp = weather.day.avgtemp_c
                const ttlprecip = weather.day.totalprecip_mm
                temp[thisdate] = avgtemp
                precip[thisdate] = ttlprecip
            }
        )
        return [
            {"name":"Temperatures (°C)", "data":temp},
            {"name":"Precipitations (mm)", "data":precip}
        ]; // return end
    }

    render() { 
        return(
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th><b>City</b></th>
                        <th><b>Actual</b></th>
                        <th><b>Forecast weather preview</b></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.weather.map(this.renderWeather)
                    }
                </tbody>
            </table>
        ) // return end
    } // render end
} // class WeatherList end

export default connect(mapStateToProps)(WeatherList);