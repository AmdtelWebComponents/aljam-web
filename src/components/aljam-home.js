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
          display: flex;
          justify-content: flex-end;
          margin: 0em 2em 0em 2em;
          background-image: url("https://res.cloudinary.com/aljames/image/upload/home/ALJAM_home_page_post_pic_only.jpg");
          background-repeat: no-repeat;
          background-position: left;
          background-size: contain;
        }
        p {
          width: 60vw;
          height: 90vh;
          font-size: 1.5em;
          font-weight: bold;
          text-align: right;
          padding-right: 1em;
          background: -webkit-linear-gradient(#f00, #0f0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        img {
          min-height: 90vh;
          min-width: 90vh;
        }

        @media (orientation: landscape) {
          .layout {
            margin: 0em 6em 0em 6em;
          }
          p {
            font-size: 1.4em;
          }
        }
      </style>
      ${this._data.length > 0 ? html`
        <section class="layout"><p>think I lost my head<br>it was a close shave<br><br>feeling starved of action<br>too quiet for my liking<br>they calling it a lockdown<br>everybody hiding<br><br>til jamming time come round<br>time to do some back up<br>editing and mixing<br>so much needing fixing<br><br>time to try a new device<br>and try to make a movie<br>all these great tracks lying around<br>... gonna be groovy ...</p></section>`
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