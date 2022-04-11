import * as actions from '../constants';
import { normalize as normalizeLib } from 'normalizr';
import { toastrSuccess, toastrError } from "../actions/toastr";
import { startNetwork, endNetwork } from "../actions/ui";

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = process.env.REACT_APP_API_KEY
const buildUrl = uri => BASE_URL + uri;
const handleArrayOfSuccess = (array, dispatch, data) => {
    array
        .filter(item => item)
        .forEach(item => {
            const action = typeof item === 'function' ? item(data) : item;
            dispatch(action);
        });
};


const api = ({ dispatch, getState }) => next => action => {
    if (action.type !== actions.API) {
        return next(action)
    }

    const {
        url, // URL to send to
        success, // Action(s) to perform on success
        name, // Name for internal tracking (spinners)
        preProcess, // Run func on received dta.js before normalization
        postProcess, // Run func on received dta.js after normalization
        normalize, // Schema for normalization
        error, // Action to perform on error
        data, // Data for post/patch/etc
        method, // Method (GET/POST/etc)
        headers, // Additional headers to pass
        withError, // Should the resulting error be saved in state,
        toastr, // Automatically display toastr on success and error
    } = action.payload;

    const handleSuccess = data => {
        try{
            if (preProcess) {
                data = preProcess(data)
            }

            if (normalize) {
                data = normalizeLib(data, normalize);
            }

            if (postProcess) {
                data = postProcess(data)
            }

            if (toastr) {
                dispatch(toastrSuccess(`${toastr} successful`));
            }
            if (success) {
                handleArrayOfSuccess(
                    Array.isArray(success) ? success : [success],
                    dispatch,
                    data
                );
            }
        } catch (err) {
            console.warn('Error during network success processing', err);
        }

        dispatch(endNetwork(name));
    };

    const dispatchErrorHandler = data => {
        if (toastr || withError) {
            const title = toastr ? `${toastr} error` : `Error (${name || 'API'})`;
            let msg = data;

            msg = data.error ? data.error : msg;

            dispatch(toastrError(title, msg.toString()));
        }

        dispatch(endNetwork(name));
    };

    const handleError = err => {
        let msg;

        // Did we get a Response object?
        if (err instanceof Response) {
            msg = err.statusText;
        } else {
            msg = err;
        }

        if (typeof err === 'object' && err.message === 'Failed to fetch') {
            console.error('Network communication error: ', err);
            console.error('Action', action);

            dispatch(toastrError('Network error', 'Cannot access server'));
        }
        console.warn('Error from API: ', msg);


        if (error || withError || toastr) {
            if (err instanceof Response) {
                err
                    .json()
                    .then(dispatchErrorHandler)
                    .catch(() => dispatchErrorHandler(err.statusText));
            } else {
                dispatchErrorHandler(msg);
            }
        } else {
            dispatch(endNetwork(name));
        }
    };

    const options = {
        headers: new Headers({'content-type': 'application/json', Authorization: `Bearer ${API_KEY}`}),
        cache: 'no-store',
    }
    if (headers) {
        Object.keys(headers).forEach(header =>
            options.headers.append(header, headers[header])
        );
    }

    if (method) {
        options.method = method;
    }

    // Turn into POST (or other) request if dta.js was passed
    if (data) {
        options.method = options.method || 'post';
        options.body = JSON.stringify(data);
    }

    dispatch(startNetwork(name));

    fetch(buildUrl(url), options)
        .then(response => {
            if (!response.ok) {
                throw response;
            }
            return response.json();
        })
        .then(handleSuccess)
        .catch(handleError);
    return next(action)
}

export default api