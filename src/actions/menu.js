'use strict';
import keys from '../reducers/keys';

export const toggleMenu = function(ready) {
  return {
    type: keys.TOGGLE_MENU,
    ready
  }
};
