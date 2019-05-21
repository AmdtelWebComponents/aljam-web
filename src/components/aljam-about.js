import { html } from 'lit-element';
import { PageViewElement } from './page-view-element.js';
import { connect } from 'pwa-helpers/connect-mixin.js';

// This element is connected to the Redux store.
import { store } from '../store.js';

// These are the actions needed by this element.
import { getDiscography } from '../actions/about.js';

// We are lazy loading its reducer.
import discography from '../reducers/about.js';
store.addReducers({
  discography
});

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';
import { closeIcon } from './aljam-icons';

class AljamAbout extends connect(store)(PageViewElement) {
  static get properties() {
    return {
      _discography: { type: Object },
      _albumCover: { type: Object },
      _toggleCover: { type: Boolean }
    };
  }
  render(url="https://res.cloudinary.com/aljames/image/upload/") {
    return html`
      ${SharedStyles}
      <style>
        :host {
          background-color: #ed5000;
        }
        section {
          min-height: 200px;
          background: black;
          color: white;
          grid-template-columns: repeat(4, 1fr);
          grid-template-areas:
            'album-detail album-detail album-cover-front album-cover-back'
        }
        section:nth-of-type(even) {
          background: white;
          color: black;
        }
        .album-detail {
          grid-area: album-detail;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          align-items: start;
          justify-content: center;
        }
        .album-cover {
          align-self: center;
          justify-self: center;
        }
        .front {
          grid-area: album-cover-front;
        }
        .back {
          grid-area: album-cover-back;
        }
        #modal-album {
          position: fixed;
          top: 0px;
          left: 0px;
          bottom: 0px;
          width: 100vw;
          overflow: auto;
          color: white;
        }
        .modal {
          grid-template-columns: repeat(2, 1fr);
          grid-template-areas:
            'album-cover-front album-cover-back'
            'album-detail album-detail';
          min-height: 100vh;
          background: #000000ab;
        }
        @media (max-width: 459px) {
          section {
            grid-template-columns: repeat(2, 1fr);
            grid-template-areas:
            'album-detail album-detail'
            'album-cover-front album-cover-back'
          }
          .album-img {
            max-height: 150px;
          }
        }
        @media (max-width: 800px) {
          .modal {
            grid-template-columns: 1fr;
            grid-template-areas:
              'album-cover-front'
              'album-cover-back'
              'album-detail';
          }
          .modal-img {
            max-width: 80vw;
          }
        }
      </style>
      ${this._discography.length > 0? html`
        ${this._discography.map((item) => html`
          <section>
            <header class="album-detail">
                <h1>${item.context.custom.year}</h1>
                <h5>${item.context.custom.artist}</h5>
                <h3>${item.context.custom.caption}</h3>
                <h6>${item.context.custom.label} ${item.context.custom.cat}</h6>
            </header>
            <div class="album-cover front" @click="${(e)=>{this._albumCover = item.context.custom;this._toggleCover=true;}}">
              <img class="album-img" src="${url}t_album200x200/${item.public_id}.jpg">
            </div>
            <div class="album-cover back">
              <img class="album-img" src="${url}t_album200x200/albums/${item.context.custom.cat}-back.jpg">
            </div>
          </section>
          `)
        }
        ${this._toggleCover ?html`
          <div id="modal-album" @click="${()=>this._toggleCover=false}">
          <button class="btn-close" @click="${() => this._toggleCover=false}">${closeIcon}</button>
            <section class="modal">
              <div class="album-cover front">
                <img class="modal-img" src="${url}albums/${this._albumCover.cat}-front.jpg">
              </div>
              <div class="album-cover back">
                <img class="modal-img" src="${url}albums/${this._albumCover.cat}-back.jpg">
              </div>
              <div class="album-detail">
                <h3>${this._albumCover.artist} ${this._albumCover.caption} ${this._albumCover.label} ${this._albumCover.cat} ${this._albumCover.year}</h3>
              </div>
            </section>
          </div>`
        :html``}`
      :html`
        <div class="loader">
          <img class="spinner" src="images/manifest/icon-144x144.png">
          <p>loading...</p>
        </div>`
      }
    `;
  }
 
  constructor () {
    super();
    this._toggleCover = false;
  }
  
  firstUpdated() {
    store.dispatch(getDiscography());
  }
  
  // This is called every time something is updated in the store.
  stateChanged(state)  {
    this._discography = state.discography.discography;
  }
}

window.customElements.define('aljam-about', AljamAbout);