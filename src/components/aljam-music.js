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
        iframe {
          border: none;
          overflow: hidden;
          width: 100%;
          height: 450px;
        }
        .albums {
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        }
        .albums button {
          position: unset;
          height: unset;
        }
        .scwidget {
          justify-items: center;
          align-items: center;
          padding: 1rem;
        }
        
        .chooserbtn {
          top: 1rem;
          right: 1rem;
        }
      </style>
      
      ${this._data.length > 0? html`
      ${this._chooser ? html`
        <section class="albums">
          ${this._data.map(
          (item) => html`
        <button @click="${(e) => {this._chooser=false; this._currentAlbum=item.context.custom.SCID} }" title="Play ${item.context.custom.caption}">
          <img src="${url}t_album200x200/${item.public_id}">
          <br>
            ${item.context.custom.caption}
          </button>
          `)}
        </section>`
      :html`
        <section class="scwidget">
          <button class="chooserbtn" @click="${() => this._chooser=true}">Return to Albums</button>
          <iframe scrolling="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/${this._currentAlbum}&amp;color=%23005500&amp;show_playcount=true"></iframe>
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