/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { html } from 'lit-element';

export const SharedStyles = html`
<style>
  :host {
    display: block;
    box-sizing: border-box;
    background: #000000;
  }
  
  section {
    display: grid;
    height: 80vh;
    align-items: center;
    justify-items: center;
  }

  h2 {
    font-size: 24px;
    text-align: center;
    color: var(--app-dark-text-color);
  }

  button {
    position: fixed;
    background: black;
    fill: white;
    color: white;
    cursor: pointer;
    height: 44px;
  }
  
  .btn-close {
    top: 1rem;
    right: 1rem;
    width: 44px;
  }

  .btn-next {
    bottom: 1rem;
    right: 1rem;
    width: 88px;
  }

  .btn-previous {
    bottom: 1rem;
    left: 1rem;
    width: 88px;
  }

  .loader {
    color: #f1c232;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 144px;
    height: 200px;
    margin-top: -100px;
    margin-left: -72px;
    text-align: center;
  }
  .spinner {
      -webkit-animation:spin 4s linear infinite;
      -moz-animation:spin 4s linear infinite;
      animation:spin 4s linear infinite;
  }
  @-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
  @-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
  @keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }
</style>
`;
