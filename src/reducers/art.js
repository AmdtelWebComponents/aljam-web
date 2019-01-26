/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { GET_PICTURES, CURRENT_PICTURE, TOGGLE_PICTURE } from '../actions/art.js';

const pictures = (state = {pictures: [], value: "cowboy-nevada", chooser: true}, action) => {
  switch (action.type) {
    case GET_PICTURES:
      return {
        ...state,
        pictures: action.pictures
      };
    case CURRENT_PICTURE:
      return {
        ...state,
        value: action.value
      };
    case TOGGLE_PICTURE:
      return {
        ...state,
        chooser: !state.chooser
      };
    default:
      return state;
  }
};

export default pictures;
