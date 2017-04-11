import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';


import { HomeDetails } from '../components/HomeDetails';

import * as toasterActions from '../store/Toaster/actions';
import * as searchActions from '../store/Home/actions';

import { states } from '../constants/states';

export class Home extends Component {
    static propTypes = {
        toasterActions: PropTypes.object.isRequired,
        searchActions: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            address: null,
            city: null,
            state: null,
            zip: null,
            errors: {
                address: null,
                city: null,
                state: null,
                zip: null
            }
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async handleSubmit() {
        let errors = this.state.errors;
        this.validate();
        let citystatezip=this.state.zip ? this.state.city+this.state.state+this.state.zip : this.state.city+this.state.state;
        if(this.allNull(errors)) {
            await this.props.searchActions.getSearchResults(encodeURIComponent(this.state.address), encodeURIComponent(citystatezip));

            if(this.props.search.message) {
                this.props.toasterActions.show('Sorry no details found ' + this.props.search.message.text);
            }
        }
    }

    handleChange(evt) {
        let { name, value } = evt.target;

        this.setState({
            [name]: value
        });
    }

    validate() {
        let { errors, address, city, state, zip } = this.state;

        errors.address = address ? null :'Address is required';
        errors.city = city ? null : 'City is required';
        errors.state = state ? null : 'State is required';
        if( errors.zip ) {
            errors.zip = /(^\d{5}$)/.test(zip)? null : 'Please enter a valid zipcode.'
        }

        this.setState({
            'errors': errors
        });
    }

    allNull(obj) {
        for (let i in obj) {
            if (obj[i]) return false;
        }
        return true;
    }

    render() {
        let options = states.map((state,index) => {
            return(
                <option key={index} value={state}>{state}</option>
            )
        });

        let errors = this.state.errors;

        return(
            <div id="container--Home">
                <div className="form">
                    <div>
                        <label htmlFor="address">Address</label>
                        <input type="text" name="address" onChange={this.handleChange}/>
                        { errors.address ? <div className="errors">{errors.address}</div> : null}
                    </div>
                    <div>
                        <label htmlFor="city">City</label>
                        <input type="text" name="city" onChange={this.handleChange}/>
                        { errors.city ? <div className="errors">{errors.city}</div> : null}
                    </div>
                    <div className="dropdown">
                        <label htmlFor="state">State</label>
                        <select name="state" onChange={this.handleChange}>
                            <option></option>
                            {options}
                        </select>
                        { errors.state ? <div className="errors">{errors.state}</div> : null}
                    </div>
                    <div>
                        <label htmlFor="zip">Zip</label>
                        <input type="text" maxLength="5" name="zip" onChange={this.handleChange}/>
                        { errors.zip ? <div className="errors">{errors.zip}</div> : null}
                    </div>
                    <div>
                        <button type="submit" onClick={this.handleSubmit}>Submit</button>
                    </div>
                </div>
                { this.props.search.result ? (<HomeDetails details={this.props.search.result} />): null }
            </div>
        )
    }

}

export default connect(
    state => ({
        search: state.search
    }),
    dispatch => ({
        toasterActions: bindActionCreators(toasterActions, dispatch),
        searchActions:  bindActionCreators(searchActions, dispatch)
    })
)(Home);
