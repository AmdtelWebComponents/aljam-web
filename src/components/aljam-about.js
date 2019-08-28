import { html } from 'lit-element';
import { PageViewElement } from './page-view-element.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';
import { closeIcon } from './aljam-icons';

class AljamAbout extends PageViewElement {
  static get properties() {
    return {
      _discography: { type: Array },
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
        ${this._discography.map((item, idx) => html`
          <section>
            <header class="album-detail">
                <h1>${item.context.custom.year}</h1>
                <h5>${item.context.custom.artist}</h5>
                <h3>${item.context.custom.caption}</h3>
                <h6>${item.context.custom.label} ${item.context.custom.cat}</h6>
            </header>
            <div class="album-cover front" @click="${(e)=>{this._albumCover = idx;this._toggleCover=true;}}">
              <img class="album-img" src="${url}t_album200x200/${item.public_id}.jpg">
            </div>
            <div class="album-cover back">
              <img class="album-img" src="${url}t_album200x200/albums/${item.context.custom.cat}-back.jpg">
            </div>
          </section>
          `)
        }
        ${this._toggleCover ?html`
          <div id="modal-album">
          <button class="btn-close" @click="${() => this._toggleCover=false}">${closeIcon}</button>
          <button class="btn-previous" @click="${() => this._albumCover==0?this._albumCover=this._discography.length-1:this._albumCover--}">Previous</button>
          <button class="btn-next" @click="${() => this._albumCover==this._discography.length-1?this._albumCover=0:this._albumCover++}">Next</button>
            <section class="modal">
              <div class="album-cover front">
                <img class="modal-img" src="${url}albums/${this._discography[this._albumCover].context.custom.cat}-front.jpg">
              </div>
              <div class="album-cover back">
                <img class="modal-img" src="${url}albums/${this._discography[this._albumCover].context.custom.cat}-back.jpg">
              </div>
              <div class="album-detail">
                <h3>
                  ${this._discography[this._albumCover].context.custom.artist}
                  ${this._discography[this._albumCover].context.custom.caption}
                  ${this._discography[this._albumCover].context.custom.label}
                  ${this._discography[this._albumCover].context.custom.cat} 
                  ${this._discography[this._albumCover].context.custom.year}
                </h3>
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

  constructor() {
    super();
    this._toggleCover = false;
    this._discography = [];
  }
  
  firstUpdated() {
    fetch('https://res.cloudinary.com/aljames/image/list/Album-Front.json')
    .then(r => r.json())
    .then(data => data.resources.sort((a,b)=> b.context.custom.year.localeCompare(a.context.custom.year)))
    .then(data => this._discography = data)
    .catch(e => console.log("fetch error:", e));
  }
}

window.customElements.define('aljam-about', AljamAbout);