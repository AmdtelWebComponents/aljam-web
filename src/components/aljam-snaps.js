import { html } from 'lit-element';
import { PageViewElement } from './page-view-element.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';
import { closeIcon } from './aljam-icons';

class AljamSnaps extends PageViewElement {
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
          grid-template-rows: 15vh 60vh 15vh;
        }
        .info-text {
          padding: 10px;
          color: #ff9900;
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
        <section class="layout">
          <div class="info-text">
            <img src="${url}snaps/snaps-logo.png">
            <h3>${this._data[this._index].context.custom.caption}</h3>
            <p>${this._data[this._index].context.custom.alt}</p>
          </div>
            <img class="mainimg" src="${url}${this._data[this._index].public_id}.jpg">
          <div class="hs full" >
            ${this._data.map((item, idx) => html`
              <img
                class="pic"
                src="${url}t_media_lib_thumb/${item.public_id}.jpg"
                @click="${(e) => {this._index = idx;this._chooser=true}}"
              >`)
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
    this._index = 0;
    this._data = [];
  }

  firstUpdated() {
    fetch('https://res.cloudinary.com/aljames/image/list/snaps-img.json')
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

window.customElements.define('aljam-snaps', AljamSnaps);