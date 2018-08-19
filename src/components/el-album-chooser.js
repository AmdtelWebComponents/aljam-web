/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { LitElement, html } from '@polymer/lit-element';

// These are the elements needed by this element.
import { plusIcon, minusIcon } from './aljam-icons.js';

// These are the shared styles needed by this element.
import { ButtonSharedStyles } from './button-shared-styles.js';

// This is a reusable element. It is not connected to the store. You can
// imagine that it could just as well be a third-party element that you
// got from someone else.
class ElAlbumChooser extends LitElement {
  _render(props) {
    return html`
      ${ButtonSharedStyles}
      <style>
        span { width: 20px; display: inline-block; text-align: center; font-weight: bold;}
      </style>
      ${Object.keys(props.albums).map((key) => {
        const item = props.albums[key];
        return html`
        <div>
          <button on-click="${_onChoice(item.id)}" title="Play ${item.title}></button>
        </div>
        `;
      })}
    `;
  }

  static get properties() { return {
    /* The total number of clicks you've done. */
    albums: Object,
    /* The current value of the counter. */
    value: Number
  }}

  // constructor() {
  //   super();
  //   this.albums = [{"id":"452840148","title":"My Album"}];
  //   this.value = "452840148";
  // }

  _onChoice(id) {
    this.value = id;
    this.dispatchEvent(new CustomEvent('current-album'));
  }

}

window.customElements.define('el-album-chooser', ElAlbumChooser);
