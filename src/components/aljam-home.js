import { html } from 'lit-element';
import { PageViewElement } from './page-view-element.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

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
        iron-icon {
          --iron-icon-height: 50px;
          --iron-icon-width: 50px;
        }

        section {
          grid-gap: 1rem;
          grid-template-columns: 1fr 3fr;
          font-size: 2vw;
          height: 80vh;
        }

        section .main-img {
          height: 60vh;
        }

        .caption {
          background: rgba(0, 0, 0, .5);
          align-self: center;
          justify-self: center;
          min-width: 75%;
          padding: 1rem;
          font-size: 1.5rem;
          color: #fff;
          text-align: center;
          text-decoration: none;
          border-radius: 5px;
          border: 1px solid #fff;
        }
        
        @media (max-width: 459px) {
          section {
            grid-template-columns: 1fr;
            grid-template-rows: repeat(4, 1fr);
          }
        }

        #facebook {
          --iron-icon-fill-color: blue;
        }

        #googleplus {
          --iron-icon-fill-color: red;
        }

        #twitter {
          --iron-icon-fill-color: blue;
        }
      </style>
      ${this._data.length > 0? html`
        <section id="main">
          <img style="height: 20vw" src="${url}/home/home-section-logo.jpg">
          <img class="main-img" src="${url}/${this._data[0].public_id}.jpg">
        </section>
        <section id="discography" style="color: #ff0000">
          <div>
            <h3>${this._data[1].context.custom.caption}</h3>
            <p>${this._data[1].context.custom.alt}</p>
          </div>
          <img class="main-img" src="${url}/${this._data[1].public_id}.jpg">
        </section>
        <section id="music" style="color: #00ff00">
          <div>
            <h3>${this._data[2].context.custom.caption}</h3>
            <p>${this._data[2].context.custom.alt}</p>
          </div>
          <img class="main-img" src="${url}/${this._data[2].public_id}.jpg">
        </section>
        <section id="gallery" style="color: #4a86e8">
          <div>
            <h3>${this._data[3].context.custom.caption}</h3>
            <p>${this._data[3].context.custom.alt}</p>
          </div>
          <img class="main-img" src="${url}/${this._data[3].public_id}.jpg">
        </section>
        <section id="contact" style="color: #9900ff">
          <div>
            <h3>${this._data[4].context.custom.caption}</h3>
            <p>${this._data[4].context.custom.alt}</p>
            <p>${this._data[4].context.custom.email}</p>
          </div>
          <img class="main-img" src="${url}/${this._data[4].public_id}.jpg">
        </section>
        <section id="snaps" style="color: #ff9900">
          <div>
            <h3>${this._data[5].context.custom.caption}</h3>
            <p>${this._data[5].context.custom.alt}</p>
          </div>
          <img class="main-img" src="${url}/${this._data[5].public_id}.jpg">
        </section>
        <section id="links" style="color: #f1c232">
          <div>
            <h3>${this._data[6].context.custom.caption}</h3>
            <p>${this._data[6].context.custom.alt}</p>
          </div>
          <img class="main-img" src="${url}/${this._data[6].public_id}.jpg">
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