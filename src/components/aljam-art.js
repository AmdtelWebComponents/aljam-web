import { html } from 'lit-element';
import { PageViewElement } from './page-view-element.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';
import { closeIcon } from './aljam-icons';

class AljamArt extends PageViewElement {
  static get properties(){
    return {
      _pictures: { type: Array },
      _currentPicture: { type: Number },
      _chooser: { type: Boolean }
    };
  }
  render(url="https://res.cloudinary.com/aljames/image/upload/") {
    return html`
      ${SharedStyles}
      <style>
        .gallery {
          grid-template-columns: 20px 1fr 20px;
        }
        .gallery > * {
          grid-column: 2 / -2;
        }
        .gallery > .full {
          grid-column: 1 / -1;
        }
        .main-view {
          width: 100%;
          color: #4a86e8;
          display: grid;
          grid-template-columns: 1fr 3fr;
          font-size: 3vw;
          justify-items: center;
        }
        .hs {
          width: 98vw;
          display: grid;
          grid-gap: 10px;
          grid-template-columns: 10px;
          grid-auto-flow: column;
          overflow-x: scroll;
          scroll-snap-type: x proximity;
        }
        .hs:before,
        .hs:after {
          content: '';
          width: 10px;
        }
        .hs > div,
        .item {
          scroll-snap-align: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .pic {
          height: 10vh;
        }
        .mainimg {
          max-height: 60vh;
          max-width: 60vw;
        }
      </style>
      ${this._pictures.length > 0? html`
        <section class="gallery">
          <div class="main-view">
            <div>
              <h3>${this._pictures[this._currentPicture].context.custom.caption}</h3>
              <p>${this._pictures[this._currentPicture].context.custom.alt}</p>
            </div>
            <picture>
              <source srcset="${url}${this._pictures[this._currentPicture].public_id}.webp" type="image/webp">
              <img class="mainimg" src="${url}${this._pictures[this._currentPicture].public_id}.jpg">
            </picture>
          </div>
          <div class="hs full" >
            ${this._pictures.map((item, idx) => html`
              <div class="item">
                <picture @click="${(e) => {this._currentPicture = idx;this._chooser=true}}">
                  <source srcset="${url}t_media_lib_thumb/${item.public_id}.webp" type="image/webp">
                  <img class="pic" src="${url}t_media_lib_thumb/${item.public_id}.jpg">
                </picture>
              </div>`)
            }
          </div>
        </section>`
      :html`
        <div class="loader">
          <img class="spinner" src="${url}home/logo-transparent.png">
          <p>loading...</p>
        </div>`
      }
    `;
  }

  constructor() {
    super();
    this._currentPicture = 0;
    this._pictures = [];
  }

  firstUpdated() {
    fetch('https://res.cloudinary.com/aljames/image/list/gallery.json')
    .then(r => r.json())
    .then(data => this._pictures = data.resources)
    .catch(e => console.log("fetch error:", e));
  }
}

window.customElements.define('aljam-art', AljamArt);