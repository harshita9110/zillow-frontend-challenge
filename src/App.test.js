import React from 'react';
import ReactDOM from 'react-dom';
import chai from 'chai';
var expect = chai.expect;

import configureStore from './store/configureStore';
import { search } from './store/Home/reducer';
import * as searchActions from './store/Home/actions';

import {
    SEARCH_RESULTS_FETCH,
    SEARCH_RESULTS_SUCCESS,
    SEARCH_RESULTS_FAILURE
} from './store/Home/actions';

const store = configureStore( {} );

describe('Search should return results', async function(){
    let search;

    it('Should get search info ', async function(){
        await (searchActions.getSearchResults('261+N+Olive','Orange+CA'))(store.dispatch);
        search = store.getState().search;
        expect(search.result.address.zipcode).to.equal('92866');
    })
});

describe('Should return error message on search failure', async function(){
    let search;

    it('Should return error message', async function(){
        await (searchActions.getSearchResults('261+N+Olive','Tustin+CA'))(store.dispatch);
        search = store.getState().search;
        expect(search.message.code).to.equal('508');
    })
});

describe('Should correctly populate the reducer', function(){
    let searchresults, error;
    let initialState = {
      isFetching: false,
      result: null,
      message: null
    };

    it('Should populate the search results in reducer on success', function(){
        searchresults = search(initialState,{
            type: SEARCH_RESULTS_SUCCESS,
            results: {
                request:{
                    address:'261+N+Olive',
                    citystatezip:"OrangeCA"
                }
            }
        });

        expect(searchresults.result.request.address).to.equal('261+N+Olive');
    })

    it('Should populate the errors in reducer on failure', function(){
        error = search(initialState,{
            type: SEARCH_RESULTS_FAILURE,
            message: {
                text:'Address not found',
                code:"503"
            }
        });

        expect(error.message.text).to.equal('Address not found');
    })
});
