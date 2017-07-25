'use strict';
import keys from '../reducers/keys';

export const PullFromInstagram =  function(data) {

  return function(dispatch, getState) {

    const profileURL = "https://rafi-george.herokuapp.com/instagramProfile";
    const recentMediaURL = "https://rafi-george.herokuapp.com/instagramRecentMedia";

    fetch(profileURL)
    .then((response) => response.json())
    .then(data => {
      var obj = JSON.parse(data);
      dispatch(SetInstagramProfile({retreivedData: obj.data}));
    })
    .catch(function(error) {
      console.warn(`Failed to load:` + error.message);
    });

    fetch(recentMediaURL)
    .then((response) => response.json())
    .then(data => {
      var obj = JSON.parse(data);
      dispatch(SetInstagramRecentMedia({retreivedData: obj.data}));
    })
    .catch(function(error) {
      console.warn(`Failed to load:` + error.message);
    });
  }
};

export const RequestInstagramAccessToken = function(data){

  return{
    type: keys.REQUEST_INSTAGRAM_ACCESS_TOKEN,
    data
  }
};

export const SetInstagramProfile = function(data){

  return{
    type: keys.SET_INSTAGRAM_PROFILE,
    data
  }
};


export const SetInstagramRecentMedia = function(data){

  return{
    type: keys.SET_INSTAGRAM_RECENT_MEDIA,
    data
  }
};
