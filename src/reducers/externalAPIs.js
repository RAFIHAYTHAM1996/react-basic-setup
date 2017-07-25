'use strict'
import keys from './keys';

export const PullFromInstagram = function(state = {instagram_profile: "", instagram_recent_media: ""}, action){
  switch (action.type) {

    case (keys.PULL_FROM_INSTAGRAM):{
      state = {...state, data: action.igData};
      return state;
    }

    case (keys.SET_INSTAGRAM_PROFILE):{
      state = {...state, instagram_profile: action.data.retreivedData};
      return state;
    }

    case (keys.SET_INSTAGRAM_RECENT_MEDIA):{
      state = {...state, instagram_recent_media: action.data.retreivedData};
      return state;
    }

    case (keys.REQUEST_INSTAGRAM_ACCESS_TOKEN):{
      window.location.href = "https://api.instagram.com/oauth/authorize/?client_id=3af8d7933c594628be9d25f65d3ba13d&redirect_uri=http://localhost:9966/about&response_type=token";
    }

    default:
      return state;
  }
}
