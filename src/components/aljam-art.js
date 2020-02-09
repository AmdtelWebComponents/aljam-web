import { html } from 'lit-element';
import { PageViewElement } from './page-view-element.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';
import { closeIcon } from './aljam-icons';

class AljamArt extends PageViewElement {
  static get properties(){
    return {
      _data: { type: Array },
      _index: { type: Number },
      _chooser: { type: Boolean }
    };
  }
  render(url="https://res.cloudinary.com/aljames/image/upload/") {
    return html`
      ${SharedStyles}
      <style>
        .layout {
          display: grid;
          grid-template-rows: 15vh 60vh 15vh;
          align-items: center;
          justify-items: center;
        }
        .info-text {
          padding: 10px;
          color: #4a86e8;
          font-size: 1.8em;
          text-align: center;
        }
        .info-text > img {
          display: none;
        }
        .hs {
          width: 98vw;
          display: grid;
          grid-gap: 10px;
          grid-auto-flow: column;
          overflow-x: scroll;
          scroll-snap-type: x proximity;
        }
        .hs:before,
        .hs:after {
          content: '';
          width: 10px;
        }
        .pic {
          height: 10vh;
        }
        .mainimg {
          max-height: 60vh;
          max-width: 96vw;
        }
        @media (orientation: landscape) {
          .layout {
            grid-template-columns: 20vw 80vw;
            grid-template-rows: 70vh 20vh;
          }
          .mainimg {
            max-height: 70vh;
            max-width: 80vw;
          }
          .hs {
            grid-column: 1/3;
          }
        }
      </style>
      ${this._data.length > 0? html`
        <div class="layout">
          <div class="info-text">
            <img src="${url}gallery/gallery-logo.png">
            <h3>${this._data[this._index].context.custom.caption}</h3>
            <p>${this._data[this._index].context.custom.year}</p>
            <p>${this._data[this._index].context.custom.alt}</p>
          </div>
          <picture>
            <source srcset="${url}${this._data[this._index].public_id}.webp" type="image/webp">
            <img class="mainimg" src="${url}${this._data[this._index].public_id}.jpg">
          </picture>
          <div class="hs full" >
            ${this._data.map((item, idx) => html`
                <picture @click="${(e) => {this._index = idx;this._chooser=true}}">
                  <source srcset="${url}t_media_lib_thumb/${item.public_id}.webp" type="image/webp">
                  <img class="pic" src="${url}t_media_lib_thumb/${item.public_id}.jpg">
                </picture>`)
            }
          </div>
        </div>`
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
    this._index = 0;
    this._data = [];
  }

  firstUpdated() {
    fetch('https://res.cloudinary.com/aljames/image/list/gallery.json')
    .then(r => r.json())
    .then(data =>
      data.resources.sort((a, b) =>
        a.context.custom.order.localeCompare(b.context.custom.order)
      )
    )
    .then(data => this._data = data)
    .catch(e => console.log("fetch error:", e));
  }
}

window.customElements.define('aljam-art', AljamArt);