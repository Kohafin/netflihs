import {
  UPDATE_DATA,
  DELETE_DATA,
  REPLACE_DATA,
  DELETE_ALL_DATA,
  SET_VALUE,
  UPDATE_NESTED,
} from '../constants';

export const updateData = type => data => ({
  type: UPDATE_DATA,
  payload: {
    data,
    type,
  },
});

// Replaces all data of "type" with normalized response
export const replaceNormalizedData = type => data => ({
  type: REPLACE_DATA,
  payload: {
    data: data.entities[type] || {},
    type,
  },
});

// Replaces all data of "type" with normalized response
export const replaceData = type => data => ({
  type: REPLACE_DATA,
  payload: {
    data: data || {},
    type,
  },
});

// Updates existing data
export const updateNormalizedData = type => data => ({
  type: UPDATE_DATA,
  payload: {
    data: data.entities[type],
    type,
  },
});

// Removes data of "type" under "id"
export const deleteData = (type, id) => ({
  type: DELETE_DATA,
  payload: {
    type,
    data: id,
  },
});

// Removes all data of "type" (all ids)
export const deleteAllData = type => ({
  type: DELETE_ALL_DATA,
  payload: type,
});

export const setValue = (type, id) => value => ({
  type: SET_VALUE,
  payload: { type, id, value },
});

export const setNestedValue = (keys, value) => ({
  type: UPDATE_NESTED,
  payload: {
    keys,
    value,
  },
});

export const setNestedValueWrapped = keys => value => ({
  type: UPDATE_NESTED,
  payload: {
    keys,
    value,
  },
});

export const updateAccess =
  (entity, prefix = null) =>
    data => {
      const baseData = data.entities[entity];
      const accessData = Object.values(baseData).reduce(
        (list, item) => {
          list[prefix ? `${prefix}${item.id}` : item.id] = item.access;
          return list;
        },
        {}
      );

      return updateData('access')(accessData);
    };
