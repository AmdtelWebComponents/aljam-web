/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { LitElement, html } from 'lit-element';
import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings.js';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { installMediaQueryWatcher } from 'pwa-helpers/media-query.js';
import { installOfflineWatcher } from 'pwa-helpers/network.js';
import { installRouter } from 'pwa-helpers/router.js';
import { updateMetadata } from 'pwa-helpers/metadata.js';

// This element is connected to the Redux store.
import { store } from '../store.js';

// These are the actions needed by this element.
import {
  navigate,
  updateOffline,
  updateDrawerState,
  updateLayout
} from '../actions/app.js';

// These are the elements needed by this element.
import '@polymer/app-layout/app-drawer/app-drawer.js';
import { menuIcon } from './aljam-icons.js';
import './snack-bar.js';

class AljamApp extends connect(store)(LitElement) {
  static get properties() {
    return {
      appTitle: { type: String },
      _page: { type: String },
      _drawerOpened: { type: Boolean },
      _snackbarOpened: { type: Boolean },
      _offline: { type: Boolean }
    };
  }
  render() {
  
    // Anything that's related to rendering should be done in here.
    return html `
      <style>
        :host {
          --app-drawer-width: 256px;
          display: block;

          --app-primary-color: #E91E63;
          --app-secondary-color: #293237;
          --app-dark-text-color: var(--app-secondary-color);
          --app-light-text-color: white;
          --app-section-even-color: #f7f7f7;
          --app-section-odd-color: white;

          --app-drawer-background-color: var(--app-secondary-color);
          --app-drawer-text-color: var(--app-light-text-color);
          --app-drawer-selected-color: #78909C;
        }

        .menu-btn {
          position: fixed;
          background: black;
          top: 1rem;
          left: 1rem;
          fill: white;
          cursor: pointer;
          height: 44px;
          width: 44px;
        }

        .drawer-list {
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          padding: 24px;
          background: var(--app-drawer-background-color);
          position: relative;
        }

        .drawer-list>a {
          display: block;
          text-decoration: none;
          color: var(--app-drawer-text-color);
          line-height: 40px;
          padding: 0 24px;
        }

        .drawer-list>a[selected] {
          color: var(--app-drawer-selected-color);
        }

        /* Workaround for IE11 displaying <main> as inline */

        main {
          display: block;
        }

        .main-content {
          min-height: 100vh;
        }

        .page {
          display: none;
        }

        .page[active] {
          display: block;
        }

        footer {
          padding: 24px;
          background: var(--app-drawer-background-color);
          color: var(--app-drawer-text-color);
          text-align: center;
        }
      </style>

      <button class="menu-btn" title="Menu" @click="${_ => store.dispatch(updateDrawerState(true))}">${menuIcon}</button>

      <!-- Drawer content -->
      <app-drawer
          .opened="${this._drawerOpened}"
          @opened-changed="${e => store.dispatch(updateDrawerState(e.target.opened))}">
        <nav class="drawer-list">
          <a ?selected="${this._page === 'home'}" href="/home">Home</a>
          <a ?selected="${this._page === 'music'}" href="/music">Music</a>
          <a ?selected="${this._page === 'art'}" href="/art">Art</a>
          <a ?selected="${this._page === 'about'}" href="/about">About</a>
          <a ?selected="${this._page === 'contact'}" href="/contact">Contact</a>
        </nav>
      </app-drawer>

      <!-- Main content -->
      <main role="main" class="main-content">
        <aljam-home class="page" ?active="${this._page === 'home'}"></aljam-home>
        <aljam-music class="page" ?active="${this._page === 'music'}"></aljam-music>
        <aljam-art class="page" ?active="${this._page === 'art'}"></aljam-art>
        <aljam-about class="page" ?active="${this._page === 'about'}"></aljam-about>
        <aljam-contact class="page" ?active="${this._page === 'contact'}"></aljam-contact>
        <my-view404 class="page" ?active="${this._page === 'view404'}"></my-view404>
      </main>

      <footer>
        <p>Made with &hearts; by the Amdtel Webdev team.</p>
      </footer>
      <snack-bar ?active="${this._snackbarOpened}">You are now ${this._offline ? 'offline' : 'online'}.</snack-bar>
    `;
  }  

  constructor() {
    super();
    // To force all event listeners for gestures to be passive.
    // See https://www.polymer-project.org/2.0/docs/devguide/gesture-events#use-passive-gesture-listeners
    setPassiveTouchGestures(true);
  }

  firstUpdated() {
    installRouter((location) => store.dispatch(navigate(window.decodeURIComponent(location.pathname))));
    installOfflineWatcher((offline) => store.dispatch(updateOffline(offline)));
    installMediaQueryWatcher(`(min-width: 460px)`,
        (matches) => store.dispatch(updateLayout(matches)));
  }

  updated(changedProps) {
    if (changedProps.has('_page')) {
      const pageTitle = this.appTitle + ' - ' + this._page;
      updateMetadata({
          title: pageTitle,
          description: pageTitle
          // This object also takes an image property, that points to an img src.
      });
    }
  }

  stateChanged(state) {
    this._page = state.app.page;
    this._offline = state.app.offline;
    this._snackbarOpened = state.app.snackbarOpened;
    this._drawerOpened = state.app.drawerOpened;
  }
}

window.customElements.define('aljam-app', AljamApp);
