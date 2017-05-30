'use strict'
import keys from './keys';

export const menuToggle = function(state = {menuState: keys.MENU_OFF}, action){
  switch (action.type) {
    case (keys.TOGGLE_MENU):{

      switch (state.menuState) {
        case keys.MENU_OFF:{
          state = {...state, menuState: keys.MENU_ON};
          return state;
        }
        case keys.MENU_ON:{
          state = {...state, menuState: keys.MENU_OFF};
          return state;
        }
        default:
          return state;
      }
    }

    default:
      return state;
  }
}
