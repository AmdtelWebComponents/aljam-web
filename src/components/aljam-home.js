import { html } from 'lit-element';
import { PageViewElement } from './page-view-element.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';
import { forward, backward } from './aljam-icons.js';

class AljamHome extends PageViewElement {
  static get properties() {
    return {
      _data: { type: Array },
      _index: { type: Number }
    };
  }

  render(url="https://res.cloudinary.com/aljames/image/upload/") {
    return html`
      ${SharedStyles}
      <style>
        .layout {
          color: white;
          grid-gap: 2vh;
        }
        .events {
          grid-gap: 2vh;
        }
        .header {
          text-align: center;
        }
        .lineup {
          grid-gap: 0.3em;
          font-size: 1.3em;
          line-height: 0.8em;
          background: green;
          border-radius: 1em;
          padding: 0.5em;
        }
        .text-info {
          text-align: center;
          width: 90vw;
          background: beige;
          color: black;
          border-radius: 1em;
          padding: 0.5em;
        }
        h1, h2, h3, p {
          margin: 0.5em;
          padding: 0;
        }
      </style>
      ${this._data.length > 0? html`
      <section class="layout">
        <section class="header">
          <section class="lineup">
            <div class="text-info">
              <h1>Live Music at the Wynd Bar</h1>
              <p>marmions @ the wynd melrose</p>
              <p>Three evenings of marvellous musical mayhem brought to you by aljam.co.uk</p>
            </div>
          </section>
        </section>
        <section class="events">
          ${this._data.map((item, idx) => html`
            <section class="lineup">
            <h2>${item.date}</h2>
              ${item.acts.map((act) => html`
                  <div class="text-info">
                    <h1>${act.artist}</h1>
                    <p>${act.description}</p>
                  </div>
              `)}
            <p>Admission: Please bring a foodbank donation</p>
            <p>info@marmionsbrasserie.co.uk -- 01896 822245</p>
            <section>
          `)}
        </section>
      </section>
        
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
    this._index = 0;
  }

  firstUpdated() {
    fetch('./live-music.json')
    .then(r => r.json())
    .then(data => this._data = data)
    .catch(e => console.log("fetch error:", e));
  }
}

window.customElements.define('aljam-home', AljamHome);