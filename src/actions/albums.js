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
  {"id": "452840148", "title": "Album01", "description": "This is Album01"},
  {"id": "81621713", "title": "Album02", "description": "This is Album02"},
  {"id": "1942665", "title": "Album03", "description": "This is Album03"},
  {"id": 4, "title": "Album04", "description": "This is Album04"},
  {"id": 5, "title": "Album05", "description": "This is Album05"}
];

export const getAllAlbums = () => (dispatch, getState) => {
  // Here you would normally get the data from the server. We're simulating
  // that by dispatching an async action (that you would dispatch when you
  // succesfully got the data back)

  // You could reformat the data in the right format as well:
  const albums = ALBUMS_LIST.reduce((obj, album) => {
    obj[album.id] = album
    return obj
  }, {});

  dispatch({
    type: GET_ALBUMS,
    albums: albums
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
