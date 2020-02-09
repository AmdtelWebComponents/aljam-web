import { html } from 'lit-element';
import { PageViewElement } from './page-view-element.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';
import { closeIcon } from './aljam-icons';

class AljamMusic extends PageViewElement {
  static get properties() {
    return {
      _data: { type: Array },
      _currentAlbum: { type: String },
      _chooser: { type: Boolean }
    };
  }
  render(url="https://res.cloudinary.com/aljames/image/upload/") {
    return html`
      ${SharedStyles}
      <style>
        .layout {
          grid-template-rows: 20vh 70vh;
          overflow-y: auto;
        }
        .info-text {
          grid-template-columns: 20vw 80vw;
          color: #00ff00;
          font-size: 1.5em;
          text-align: center;
        }
        .logo {
          max-height: 10vh;
        }
        .albums {
          height: 70vh;
          width: 100vw;
          grid-auto-flow: row;
          overflow-y: auto;
        }
        .albums button {
          position: unset;
          height: unset;
          padding: 1em;
          margin: 1em 1em;
        }
        iframe {
          border: none;
          overflow: hidden;
          width: 100%;
          height: 100%;
        }
        .scwidget {
          grid-template-rows: 80vh 10vh;
        }
        .chooserbtn {
          position: unset;
          top: 1em;
          right: 1em;
        }
        @media (orientation: landscape) {
          .albums {
            grid-auto-flow: column;
          }
          .btn-img {
            max-width: 22vw;
          }
        }
      </style>
      
      ${this._data.length > 0? html`
      ${this._chooser ? html`
      <section class="layout">
        <section class="info-text">
          <img class="logo" src="${url}music/music-logo.png">
          <div>
            <h3>Music</h3>
            <p>three albums, click on a cover to listen in soundcloud...</p>
          </div>
        </section>
        <section class="albums">
          ${this._data.map((item) => html`
            <button @click="${(e) => {this._chooser=false; this._currentAlbum=item.context.custom.SCID} }" title="Play ${item.context.custom.caption}">
              <img class="btn-img" src="${url}t_album200x200/${item.public_id}">
              <br>
              ${item.context.custom.caption}
            </button>
          `)}
        </section>
      </section>`
      :html`
        <section class="scwidget">
          <iframe scrolling="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/${this._currentAlbum}&amp;color=%23005500&amp;show_playcount=true"></iframe>
          <button class="chooserbtn" @click="${() => this._chooser=true}">Return to Albums</button>
        </section>`
      }`
      :html`
        <div class="loader">
          <img class="spinner" src="images/manifest/icon-144x144.png">
          <p>loading...</p>
        </div>`
      }
    `;
  }

  constructor() {
    super();
    this._chooser = true;
    this._data = [];
  }

  firstUpdated() {
    fetch('https://res.cloudinary.com/aljames/image/list/soundcloud.json')
    .then(r => r.json())
    .then(data => this._data = data.resources)
    .catch(e => console.log("fetch error:", e));
  }
}

window.customElements.define('aljam-music', AljamMusic);