import {
    END_NETWORK,
    SIGN_IN_FAILED,
    SIGNED_IN,
    SIGNED_OUT,
    START_NETWORK,
    SWITCH_TENANT,
    SET_PARTNER_CONFIG,
    ADD_NOTIFICATION,
    HIDE_NOTIFICATION,
    REMOVE_NOTIFICATION,
    RESET_AUTH_ERROR,
} from '../constants';
import { omit } from 'lodash/fp';

const initialState = {}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case START_NETWORK:
            return {
                ...state,
                network: { ...state.network, [action.payload || 'global']: true },
            };

        case END_NETWORK:
            return {
                ...state,
                network: omit(action.payload || 'global', state.network),
            };

        default:
            return state;
    }
}

export default reducer;