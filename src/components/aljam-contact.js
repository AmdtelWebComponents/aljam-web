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
        :host {
          background: black;
          color: white;
        }
        section {
          grid-gap: 1rem;
          grid-template-columns: 2fr 1fr;
          justify-items: center;
          align-items: center;
        }
        section img {
          max-width: 100vw;
          max-height: 100vw;
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
        <img src="${url}${this._data[0].public_id}.jpeg">
        <div>
        <p>How to contact us...</p>
        ${Object.keys(this._data[0].context.custom).map((key) => html`<p>${key}: ${this._data[0].context.custom[key] }</p>`)}
        </div>
      </section>`
    : html`
       <div class="loader">
         <img class="spinner" src="images/manifest/icon-144x144.png">
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