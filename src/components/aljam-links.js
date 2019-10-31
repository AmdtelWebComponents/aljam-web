import { html } from 'lit-element';
import { PageViewElement } from './page-view-element.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

class AljamLinks extends PageViewElement {
  static get properties() {
    return {
      _data: { type: Array },
    };
  }
  render(url="https://res.cloudinary.com/aljames/image/upload/") {
    return html `
      ${SharedStyles}
      <style>
        :host {
          background: black;
          color: white;
        }
        section {
          grid-template-columns: 1fr 3fr;
        }
        section img {
          max-width: 60vw;
          max-height: 70vh;
        }
        .info-text {
          padding: 10px;
          background-color: black;
          color: #f1c232;
          font-size: 2vw;
          text-align: center;
        }
        @media (max-width: 459px) {
          section {
            grid-template-columns: 1fr;
            grid-template-rows: 2fr 1fr;
          }
        }
      </style>

    ${this._data.length > 0? html`
      <section>
        <div class="info-text">
          <img src="${url}t_album200x200/links/links-logo.jpg">
          <h3>${this._data[0].context.custom.caption}</h3>
          <p>${this._data[0].context.custom.alt}</p>
        </div>
        <img src="${url}${this._data[0].public_id}.jpeg">
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
    fetch('https://res.cloudinary.com/aljames/image/list/links-img.json')
    .then(r => r.json())
    .then(data => this._data = data.resources)
    .catch(e => console.log("fetch error:", e));
  }
}

window.customElements.define('aljam-links', AljamLinks);