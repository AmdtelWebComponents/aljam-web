import { html } from 'lit-element';
import { PageViewElement } from './page-view-element.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

class AljamContact extends PageViewElement {
  static get properties() {
    return {
      _data: { type: Array },
    };
  }
  render(url="https://res.cloudinary.com/aljames/image/upload/") {
    return html `
      ${SharedStyles}
      <style>
        .layout {
          grid-template-rows: 20vh 70vh;
        }
        .info-text {
          grid-template-columns: 1fr 4fr;
          color: #9900ff;
          font-size: 1.5em;
          text-align: center;
        }
        .main-img {
          max-width: 60vw;
          max-height: 70vh;
        }
        .logo {
          max-height: 10vh;
        }
        @media (orientation: landscape) {
          .layout {
            grid-template-columns: 1fr 3fr;
            grid-template-rows: 90vh;
          }
          .info-text {
            grid-template-columns: 1fr;
            grid-template-rows: 1fr 3fr;
          }
        }
      </style>

    ${this._data.length > 0? html`
      <section class="layout">
        <section class="info-text">
          <img class="logo" src="${url}contact/contact-logo.png">
          <div>
            <h3>${this._data[0].context.custom.caption}</h3>
            <p>${this._data[0].context.custom.alt}</p>
            <p>${this._data[0].context.custom.email}</p>
          </div>
        </section>
        <img class="main-img" src="${url}${this._data[0].public_id}.jpeg">
      </section>`
    : html`
       <div class="loader">
         <img class="spinner" src="${url}home/logo-transparent.png">
         <p>loading...</p>
       </div>`
    }`;
  }

  constructor() {
    super();
    this._data = [];
    this._contactData = [];
  }

  firstUpdated() {
    fetch('https://res.cloudinary.com/aljames/image/list/contact-image.json')
    .then(r => r.json())
    .then(data => this._data = data.resources)
    .catch(e => console.log("fetch error:", e));
  }
}

window.customElements.define('aljam-contact', AljamContact);