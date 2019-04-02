/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { html } from '@polymer/lit-element';

export const SharedStyles = html`
<style>
  :host {
    display: block;
    box-sizing: border-box;
  }
  
  section {
    display: grid;
    min-height: 100vh;
    padding: 1rem;
    grid-gap: 1rem;
    align-items: center;
    justify-items: center;
  }

  h2 {
    font-size: 24px;
    text-align: center;
    color: var(--app-dark-text-color);
  }
  
  .btn-close {
    position: fixed;
    background: black;
    top: 1rem;
    right: 1rem;
    fill: white;
    cursor: pointer;
    height: 44px;
    width: 44px;
  }
  
  .btn {
    display: block;
    background-color: yellow;
    text-decoration: none;
  }
  .btn:hover {
    background-color: blue;
    color: white;
  }

  @media (min-width: 460px) {
    h2 {
      font-size: 36px;
    }
  }
</style>
`;
