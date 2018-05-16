import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { filterWeather } from '../actions'

function mapDispatchToProps(dispatch) { // reducer
    return bindActionCreators({ filterWeather }, dispatch) // middleware
}

class FilterForm extends Component {
    constructor(props) {
        super(props)
        this.state = {min:"",max:"",known:[]}
    }

    render() {
        return(
            <form id="searchbar" className="input-group" onSubmit={this.onFormSubmit} >
                <p>Filter the search :</p>
                <input id="min" className="form-control date"
                    placeholder="DT"
                    type="date"
                    onChange={this.onInputChange}
                    />
                <input id="max" className="form-control date"
                    placeholder="END_DT"
                    type="date"
                    onChange={this.onInputChange}
                    />
                <div>
                    <button type="submit" className="btn" >Apply</button>
                </div>
            </form>
        ) // return end 
    } // render end

    // functions
    onInputChange = (e) => {
        console.log(e.target.value);
    }

    onFormSubmit = (e) => {
        e.preventDefault()
        // fetch weather
        this.props.filterWeather(this.state.term)
        this.state.known.push(this.state.term)
        this.state.term = ''
    }
} // class SearchBar end

// -> null at first arg because we don't need any state here
export default connect(null, mapDispatchToProps)(FilterForm); 