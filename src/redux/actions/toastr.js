import { actions } from 'react-redux-toastr';

export const toastrSuccess = (title, message) =>
actions.add({ title, message, type: 'success' });

export const toastrError = (title, message) =>
actions.add({ title, message, type: 'error' });