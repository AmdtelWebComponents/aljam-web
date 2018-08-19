/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

export const GET_PICTURES = 'GET_PICTURES';
export const CURRENT_PICTURE = 'CURRENT_PICTURE';
export const TOGGLE_CHOOSER = 'TOGGLE_CHOOSER';

export const getAllPictures = () => (dispatch, getState) => {
  // Here you would normally get the data from the server. We're simulating
  // that by dispatching an async action (that you would dispatch when you
  // succesfully got the data back)
  fetch('https://res.cloudinary.com/amdtel/image/list/landscape.json')
    .then(r => r.json())
    .then(data => dispatch({ type: GET_PICTURES, pictures: data.resources }))
    .catch(e => console.log("fetch error:", e));

};

export const changePicture = (pictureId) => (dispatch) => {
  dispatch({type:TOGGLE_CHOOSER});
  dispatch({
    type: CURRENT_PICTURE,
    value: pictureId
  }); 
};

export const toggleChooser = () => {
  return {
    type: TOGGLE_CHOOSER
  };
};