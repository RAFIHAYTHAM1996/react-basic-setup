'use strict';
import keys from '../reducers/keys';
import axios from 'axios';
import request from 'request';
import restify from 'restify';

export const PullFromInstagram =  function(data) {

  return function(dispatch, getState) {

    const url = "http://localhost:1337/?data=123456789";
    let igData = "";

    axios.get(url)
    .then((response) => {
      console.log(response);
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

export const SetInstagramAccessToken = function(data){

  return{
    type: keys.SET_INSTAGRAM_ACCESS_TOKEN,
    data
  }
};
