'use strict';
import keys from '../reducers/keys';

export const changeSection = function(params) {
  return {
    type: keys.CHANGE_SECTION,
    params
  }
};

export const setCurrSection = function() {
  return {
    type: keys.SET_CURRENT_SECTION
  }
};
