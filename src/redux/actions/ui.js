import {
    START_NETWORK,
    END_NETWORK
} from "../constants";

export const startNetwork = name => ({
    type: START_NETWORK,
    payload: name,
    meta: { quiet: true },
});

export const endNetwork = name => ({
    type: END_NETWORK,
    payload: name,
    meta: { quiet: true },
});