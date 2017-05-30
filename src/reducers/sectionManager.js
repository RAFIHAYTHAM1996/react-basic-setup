'use strict'
import keys from './keys';

export const section = function(state = {currSection: "", nextSection: ""}, action){
  switch (action.type) {
    case keys.CHANGE_SECTION:
    {
      var name = action.params.nextSection.toLowerCase() || "home";
      state = {...state, nextSection: name};
      return state;
    }
    case keys.SET_CURRENT_SECTION:
    {
      state = {...state, currSection: state.nextSection};
      return state;
    }
    default:
      return state;
  }
}
