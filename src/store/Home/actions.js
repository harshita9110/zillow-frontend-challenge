import {getResults} from '../../api/search';

export const SEARCH_RESULTS_FETCH = 'SEARCH_RESULTS_FETCH';
export const SEARCH_RESULTS_SUCCESS = 'SEARCH_RESULTS_SUCCESS';
export const SEARCH_RESULTS_FAILURE = 'SEARCH_RESULTS_FAILURE';

export function initiateSearchResults() {
    return {
        type: SEARCH_RESULTS_FETCH
    }
}

export function searchResultsSuccess(data) {
    return {
        type: SEARCH_RESULTS_SUCCESS,
        results: data
    }
}

export function searchResultsFailure(message) {
    return {
        type: SEARCH_RESULTS_FAILURE,
        message: message
    }
}

export function getSearchResults(address, citystatezip) {
    return async (dispatch, getState) => {
        try{
            dispatch(initiateSearchResults());

            let results = await getResults(address, citystatezip);

            if( results.response ) {
                dispatch(searchResultsSuccess(results.response));
            } else if( results.message ) {
                dispatch(searchResultsFailure(results.message));
            }

        } catch(e) {
            console.log(e);
            dispatch(searchResultsFailure());
        }
  }
}
