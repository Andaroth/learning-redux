import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchWeather } from '../actions'

function mapDispatchToProps(dispatch) { // reducer
    return bindActionCreators({ fetchWeather }, dispatch) // middleware
}

class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {term: "", known:["Nivelles"]}
        this.props.fetchWeather(this.state.known)
        this.onInputChange = this.onInputChange.bind(this)
        this.onFormSubmit = this.onFormSubmit.bind(this)
        console.log(this.state)
    }
    
    render() {
        return(
            <form id="searchbar" className="input-group" onSubmit={this.onFormSubmit} >
                <input id="search" className="form-control"
                    value={this.state.term} 
                    placeholder="Search a city forecast"
                    type="text"
                    onChange={this.onInputChange}
                    />
                <span className="input-group-btn">
                    <button type="submit" className="btn btn-secondary" >Add</button>
                </span>
            </form>
        ) // return end 
    } // render end

    // functions
    onInputChange = (e) => {this.setState({term: e.target.value})}

    onFormSubmit = (e) => {
        e.preventDefault()
        // fetch weather
        const thisTerm = this.state.term
        if (!this.state.known.includes(thisTerm)) { // If not already known
            const res = this.props.fetchWeather(thisTerm)
            if (!res.error) {
                this.state.known.push(thisTerm)
            }
        }
        this.setState({term:""})
    }
} // class SearchBar end

// -> null at first arg because we don't need any state here
export default connect(null, mapDispatchToProps)(SearchBar); 