import { html } from 'lit-element';
import { PageViewElement } from './page-view-element.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';
import { forward } from './aljam-icons.js';

class AljamHome extends PageViewElement {
  static get properties() {
    return {
      _data: { type: Array }
    };
  }

  render(url="https://res.cloudinary.com/aljames/image/upload/") {
    return html`
      ${SharedStyles}
      <style>
        .layout {
          display: grid;
          grid-auto-rows: 60vh;
          grid-gap: 5vh;
        }
        section {
          grid-template-columns: 1fr;
        }

        .main-img {
          grid-column: 1/1;
          grid-row: 1/1;
          max-width: 100%;
          max-height: 100%;
          z-index: -1;
        }

        .main-img-logo {
          grid-column: 1/1;
          grid-row: 1/1;
          max-height: 20vh;
          max-width: 20vw;
        }

        .text-info {
          grid-column: 1/1;
          grid-row: 1/1;
          text-align: center;
          font-size: 2em
        }

        .text-info > p, h3 {
          background: #00000090;
        }

        .icon-forward {
          width: 10vw;
          height: 10vh;
          fill: inherit;
        }
        
        @media (min-width: 600px) {
          .layout {
            grid-auto-rows: 90vh;
            grid-gap: 10vh;
          }
          section {
            grid-template-columns: 1fr 3fr;
          }
          .main-img {
          grid-column: 2/2;
          }
        }
      </style>
      ${this._data.length > 0? html`
        <div class="layout">
        <section id="main">
          <img class="main-img-logo" src="${url}home/home-logo.png">
          <img class="main-img" src="${url}${this._data[0].public_id}.jpg">
        </section>

        <section id="discography" style="color: #ff0000; fill: #ff0000;">
          <div class="text-info">
            <h3>${this._data[1].context.custom.caption}</h3>
            <p>${this._data[1].context.custom.alt}</p>
            <a href="/about">${forward}</a>
          </div>
          <img class="main-img" src="${url}${this._data[1].public_id}.jpg">
        </section>

        <section id="music" style="color: #00ff00; fill: #00ff00">
          <div class="text-info">
            <h3>${this._data[2].context.custom.caption}</h3>
            <p>${this._data[2].context.custom.alt}</p>
            <a href="/music">${forward}</a>
          </div>
          <img class="main-img" src="${url}${this._data[2].public_id}.jpg">
        </section>

        <section id="gallery" style="color: #4a86e8; fill: #4a86e8">
          <div class="text-info">
            <h3>${this._data[3].context.custom.caption}</h3>
            <p>${this._data[3].context.custom.alt}</p>
            <a href="/art">${forward}</a>
          </div>
          <img class="main-img" src="${url}${this._data[3].public_id}.jpg">
        </section>

        <section id="contact" style="color: #9900ff; fill: #9900ff">
          <div class="text-info">
            <h3>${this._data[4].context.custom.caption}</h3>
            <p>${this._data[4].context.custom.alt}</p>
            <p>${this._data[4].context.custom.email}</p>
            <a href="/contact">${forward}</a>
          </div>
          <img class="main-img" src="${url}${this._data[4].public_id}.jpg">
        </section>

        <section id="snaps" style="color: #ff9900; fill: #ff9900">
          <div class="text-info">
            <h3>${this._data[5].context.custom.caption}</h3>
            <p>${this._data[5].context.custom.alt}</p>
            <a href="/snaps">${forward}</a>
          </div>
          <img class="main-img" src="${url}${this._data[5].public_id}.jpg">
        </section>

        <section id="links" style="color: #f1c232; fill: #f1c232">
          <div class="text-info">
            <h3>${this._data[6].context.custom.caption}</h3>
            <p>${this._data[6].context.custom.alt}</p>
            <a href="/links">${forward}</a>
          </div>
          <img class="main-img" src="${url}${this._data[6].public_id}.jpg">
        </section>
        </div>
        `
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
    this._data = [];
  }

  firstUpdated() {
    fetch('https://res.cloudinary.com/aljames/image/list/home-section.json')
    .then(r => r.json())
    .then(data => data.resources.sort((a,b)=> a.context.custom.order.localeCompare(b.context.custom.order)))
    .then(data => this._data = data)
    .catch(e => console.log("fetch error:", e));
  }
}

window.customElements.define('aljam-home', AljamHome);