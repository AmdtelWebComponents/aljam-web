/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { GET_ALBUMS, CURRENT_ALBUM, TOGGLE_CHOOSER } from '../actions/albums.js';

const library = (state = {albums: {}, value: "452840148", chooser: false}, action) => {
  switch (action.type) {
    case GET_ALBUMS:
      return {
        ...state,
        albums: action.albums
      };
    case CURRENT_ALBUM:
      return {
        ...state,
        value: action.value
      };
    case TOGGLE_CHOOSER:
      return {
        ...state,
        chooser: !state.chooser
      };
    default:
      return state;
  }
};

export default library;
