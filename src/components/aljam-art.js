import { html } from 'lit-element';
import { PageViewElement } from './page-view-element.js';
import { connect } from 'pwa-helpers/connect-mixin.js';

// This element is connected to the Redux store.
import { store } from '../store.js';

// These are the actions needed by this element.
import { getAllPictures, changePicture, togglePicture } from '../actions/art.js';

// We are lazy loading its reducer.
import pictures from '../reducers/art.js';
store.addReducers({
  pictures
});

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';
import { closeIcon } from './aljam-icons';

class AljamArt extends connect(store)(PageViewElement) {
  static get properties(){
    return {
      _pictures: { type: Array },
      _currentPicture: { type: String },
      _chooser: { type: Boolean }
    };
  }
  render(url="https://res.cloudinary.com/aljames/image/upload/") {
    return html`
      ${SharedStyles}
      <style>
        .portfolio {
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        }
        .art-detail {
          display: flex;
          flex-direction: column;
          align-items: center;
          line-height: 0.5rem;
        }
        .fullimg img{
          max-width: 100%;
        }
      </style>
      ${this._pictures.length > 0? html`
        ${this._chooser ? html`
          <section class="portfolio">
            ${this._pictures.map((item) => html`
              <div class="art-detail" @click="${(e) => store.dispatch(changePicture(item.public_id))}">
                    <picture>
                      <source srcset="${url}t_media_lib_thumb/${item.public_id}.webp" type="image/webp">
                      <img src="${url}t_media_lib_thumb/${item.public_id}.jpg">
                    </picture>
                    <h5>${item.context.custom.caption}</h5>
              </div>`)
            }
          </section>`
          :html`
            <section class="fullimg">
                <button class="btn-close" @click="${() => store.dispatch(togglePicture())}">${closeIcon}</button>
                <picture>
                  <source srcset="${url}${this._currentPicture}.webp" type="image/webp">
                  <img src="${url}${this._currentPicture}.jpg">
                </picture>
            </section>`
          }`
      :html`
        <div class="loader">
          <img class="spinner" src="images/manifest/icon-144x144.png">
          <p>loading...</p>
        </div>`
      }`;
    }

  firstUpdated() {
    store.dispatch(getAllPictures());
  }
  
  // This is called every time something is updated in the store.
  stateChanged(state) {
    this._pictures = state.pictures.pictures;
    this._currentPicture = state.pictures.value;
    this._chooser = state.pictures.chooser;
  }
}

window.customElements.define('aljam-art', AljamArt);