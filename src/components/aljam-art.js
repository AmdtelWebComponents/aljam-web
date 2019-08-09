import { html } from 'lit-element';
import { PageViewElement } from './page-view-element.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';
import { closeIcon } from './aljam-icons';

class AljamArt extends PageViewElement {
  static get properties(){
    return {
      _pictures: { type: Array },
      _currentPicture: { type: Object },
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
        #modal-picture {
          position: fixed;
          top: 0px;
          left: 0px;
          bottom: 0px;
          width: 100vw;
          overflow: auto;
          color: white;
          background-color: #000000ab;
        }
        .fullimg {
          grid-template-columns: 1fr;
        }
        .fullimg img {
          max-width: 100%;
          max-height: 90vh;
        }
      </style>
      ${this._pictures.length > 0? html`
          <section class="portfolio">
            ${this._pictures.map((item, idx) => html`
              <div class="art-detail" @click="${(e) => {this._currentPicture = idx;this._chooser=true}}">
                    <picture>
                      <source srcset="${url}t_media_lib_thumb/${item.public_id}.webp" type="image/webp">
                      <img src="${url}t_media_lib_thumb/${item.public_id}.jpg">
                    </picture>
                    <h5>${idx} ${item.context.custom.caption}</h5>
              </div>`)
            }
          </section>
        ${this._chooser ? html`
          <div id="modal-picture">
            <button class="btn-close" @click="${() => this._chooser=false}">${closeIcon}</button>
            <button class="btn-previous" @click="${() => this._currentPicture==0?this._currentPicture=this._pictures.length-1:this._currentPicture--}">Previous</button>
            <button class="btn-next" @click="${() => this._currentPicture==this._pictures.length-1?this._currentPicture=0:this._currentPicture++}">Next</button>
            <section class="fullimg">
              <picture>
                <source srcset="${url}${this._pictures[this._currentPicture].public_id}.webp" type="image/webp">
                <img src="${url}${this._pictures[this._currentPicture].public_id}.jpg">
              </picture>
              
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

  constructor() {
    super();
    this._chooser = false;
    this._pictures = [];
  }

  firstUpdated() {
    fetch('https://res.cloudinary.com/aljames/image/list/paintings.json')
    .then(r => r.json())
    .then(data => this._pictures = data.resources)
    .catch(e => console.log("fetch error:", e));
  }
  
  // This is called every time something is updated in the store.
  stateChanged(state) {
    this._pictures = state.pictures.pictures;
  }
}

window.customElements.define('aljam-art', AljamArt);