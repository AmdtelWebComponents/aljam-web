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
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-scroll-effects/effects/waterfall.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
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

          --app-header-background-color: black;
          --app-header-text-color: var(--app-dark-text-color);
          --app-header-selected-color: var(--app-primary-color);

          --app-drawer-background-color: var(--app-secondary-color);
          --app-drawer-text-color: var(--app-light-text-color);
          --app-drawer-selected-color: #78909C;
        }

        app-header {
          height: 10vh;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          text-align: center;
          background-color: var(--app-header-background-color);
          color: var(--app-header-text-color);
        }
        .toolbar-top {
          height: 10vh;
        }
        [main-title] {
          font-size: 10vh;
          color: #f1c232;
          text-decoration: none;
          pointer-events: auto;
          /* In the narrow layout, the toolbar is offset by the width of the
          drawer button, and the text looks not centered. Add a padding to
          match that button */
          padding-right: 44px;
        }
        .toolbar-list {
          display: none;
        }
        .toolbar-list > a {
          display: inline-block;
          color: var(--app-header-text-color);
          text-decoration: none;
          line-height: 30px;
          padding: 4px 6px;
        }
        .toolbar-list > a[selected] {
          border-bottom: 4px solid;
        }

        .menu-btn {
          position: fixed;
          background: none;
          fill: white;
          cursor: pointer;
          border-width: 0px;
        }

        .drawer-list {
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          padding: 24px;
          background: var(--app-drawer-background-color);
          position: relative;
          font-size: 2em;
        }

        .drawer-list>a {
          display: block;
          text-decoration: none;
          line-height: 60px;
          padding: 0 24px;
        }

        .drawer-list>a[selected] {
          font-size: larger;
          border-left: 4px solid;
        }

        /* Workaround for IE11 displaying <main> as inline */

        main {
          display: block;
        }

        .main-content {
          height: 80vh;
          padding-top: 10vh;
        }

        .page {
          display: none;
        }

        .page[active] {
          display: block;
        }

        footer {
          color: white;
          font-size: 1.6em;
          background-color: black;
          height: 10vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        footer>p {
          margin: unset;
        }
        footer>p>a {
          color: yellow;
          text-decoration: none;
        }
        footer>p>a:visited {
          color: white;
        }

        /* Wide layout: when the viewport width is bigger than 600px, layout
        changes to a wide layout */
        @media (orientation: landscape) {
          .toolbar-list {
            display: block;
            font-size: 5vw;
          }
          .menu-btn {
            display: none;
          }
          /* The drawer button isn't shown in the wide layout, so we don't
          need to offset the title */
          [main-title] {
            padding-right: 0px;
          }
        }
      </style>

      <!-- Header -->
      <app-header reveals>
        <app-toolbar class="toolbar-top">
          <button class="menu-btn" title="Menu" @click="${this._menuButtonClicked}">${menuIcon}</button>
          <a main-title href="/home">${this.appTitle}</a>
          <!-- This gets hidden on a small screen-->
        <nav class="toolbar-list">
          <a style="color: #ff0000;" ?selected="${this._page === 'about'}" href="/about">discography</a>
          <a style="color: #00ff00;" ?selected="${this._page === 'music'}" href="/music">music</a>
          <a style="color: #9900ff;" ?selected="${this._page === 'contact'}" href="/contact">video</a>
          <a style="color: #4a86e8;" ?selected="${this._page === 'art'}" href="/art">gallery</a>
          <a style="color: #ff9900;" ?selected="${this._page === 'snaps'}" href="/snaps">snaps</a>
        </nav>
        </app-toolbar>
      </app-header>
      <!-- Drawer content -->
      <app-drawer
          .opened="${this._drawerOpened}"
          @opened-changed="${this._drawerOpenedChanged}">
        <nav class="drawer-list">
          <a style="color: #ff0000;" ?selected="${this._page === 'about'}" href="/about">discography</a>
          <a style="color: #00ff00;" ?selected="${this._page === 'music'}" href="/music">music</a>
           <a style="color: #9900ff;" ?selected="${this._page === 'contact'}" href="/contact">video</a>
          <a style="color: #4a86e8;" ?selected="${this._page === 'art'}" href="/art">gallery</a>
          <a style="color: #ff9900;" ?selected="${this._page === 'snaps'}" href="/snaps">snaps</a>
        </nav>
      </app-drawer>
      <!-- Main content -->
      <main role="main" class="main-content">
        <aljam-home class="page" ?active="${this._page === 'home'}"></aljam-home>
        <aljam-music class="page" ?active="${this._page === 'music'}"></aljam-music>
        <aljam-art class="page" ?active="${this._page === 'art'}"></aljam-art>
        <aljam-about class="page" ?active="${this._page === 'about'}"></aljam-about>
        <aljam-contact class="page" ?active="${this._page === 'contact'}"></aljam-contact>
        <aljam-snaps class="page" ?active="${this._page === 'snaps'}"></aljam-snaps>
        <my-view404 class="page" ?active="${this._page === 'view404'}"></my-view404>
      </main>
      <footer>
        <p>Contact by email: <a href="mailto:aljam@aljames.co.uk">aljames@aljam.co.uk</a> or <a href="https://www.facebook.com/profile.php?id=100016168685446">Facebook</a></p>
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

  _menuButtonClicked() {
    store.dispatch(updateDrawerState(true));
  }

  _drawerOpenedChanged(e) {
    store.dispatch(updateDrawerState(e.target.opened));
  }

  stateChanged(state) {
    this._page = state.app.page;
    this._offline = state.app.offline;
    this._snackbarOpened = state.app.snackbarOpened;
    this._drawerOpened = state.app.drawerOpened;
  }
}

window.customElements.define('aljam-app', AljamApp);
