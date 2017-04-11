import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../public/zillow.png';
import './App.css';
import Home from './containers/Home';
import Toaster from './components/Toaster';

class App extends Component {
    render() {
        let toaster;

        if ( this.props.toaster.visible ) {
            toaster = <Toaster message={ this.props.toaster.message }/>
        }
        return (
            <div className="App">
                { toaster }
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to your home search</h2>
                </div>
                <Home />
            </div>
        );
    }
}

export default connect(
    state => ( {
        'toaster': state.toaster
    } )
)( App );
