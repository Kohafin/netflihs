import { DELETE_DATA, REPLACE_DATA, SIGNED_OUT, UPDATE_DATA, UPDATE_NESTED, DELETE_ALL_DATA, SET_VALUE } from '../constants';
import { set } from 'lodash/fp';

const initialState = { };

const reducer = (state = initialState, action) => {
    const { type, data, id } = (action.payload || {});

    switch (action.type) {
        case UPDATE_DATA:
            return { ...state, [type]: Object.assign({}, state[type], data)};

        case REPLACE_DATA:
            return { ...state, [type]: data };

        case DELETE_DATA:
            const deletedData = Object.assign({}, state[type]);
            delete deletedData[data];
            return { ...state, [type]: deletedData };

        case DELETE_ALL_DATA:
            return { ...state, [action.payload]: {} };

        case SIGNED_OUT:
            return initialState;

        case UPDATE_NESTED:
            return set(action.payload.keys, action.payload.value, state);

        case SET_VALUE:
            return { ...state, [type]: {...state[type], [id]: action.payload.value }};

        default:
            return state;
    }
};

export default reducer;
