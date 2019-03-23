/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

export const GET_ALBUMS = 'GET_ALBUMS';
export const CURRENT_ALBUM = 'CURRENT_ALBUM';
export const TOGGLE_CHOOSER = 'TOGGLE_CHOOSER';

const ALBUMS_LIST = [
  {"id": "735089526", "title": "Gene Pool", "cover": "https://i1.sndcdn.com/artworks-000508190106-czeq61-t200x200.jpg"},
  {"id": "734335461", "title": "Heart Strings", "cover": "https://i1.sndcdn.com/artworks-000507615510-jqqc3a-t200x200.jpg"}
];

export const getAllAlbums = () => (dispatch, getState) => {
  // Here you would normally get the data from the server. We're simulating
  // that by dispatching an async action (that you would dispatch when you
  // succesfully got the data back)

  // You could reformat the data in the right format as well:
  // const albums = ALBUMS_LIST.reduce((obj, album) => {
  //   obj[album.id] = album
  //   return obj
  // }, {});

  dispatch({
    type: GET_ALBUMS,
    albums: ALBUMS_LIST
  });
};

export const changeAlbum = (albumId) => (dispatch) => {
  dispatch({type:TOGGLE_CHOOSER});
  dispatch({
    type: CURRENT_ALBUM,
    value: albumId
  });
};

export const toggleChooser = () => {
  return {
    type: TOGGLE_CHOOSER
  };
};
