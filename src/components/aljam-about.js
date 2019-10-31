import { html } from 'lit-element';
import { PageViewElement } from './page-view-element.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';
import { closeIcon } from './aljam-icons';

class AljamAbout extends PageViewElement {
  static get properties() {
    return {
      _data: { type: Array },
      _index: { type: Number },
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
        .wrapper {
          display: grid;
          height: 80vh;
          overflow-y: auto;
          grid-template-columns: 1fr 3fr;
        }
        section {
          height: 300px;
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
        .info-text {
          padding: 10px;
          background-color: black;
          color: red;
          font-size: 2vw;
          text-align: center;
        }
        .album-list {
          overflow-y: scroll;
        }
        .album-detail {
          grid-area: album-detail;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          align-items: start;
          justify-content: center;
          line-height: 0;
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
        .album-img {
          max-width: 40vw;
          max-height: 40vh;
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
      ${this._data.length > 0? html`
      <div class="wrapper">
      <div class="info-text">
        <img src="${url}t_album200x200/discography/discography-logo.jpg">
        <h3>discography</h3>
        <p>This is my ever expanding compendium of albums that I have performed on, recorded or produced.</p>
        <p>I could tell you a tale about the many great creative people who I have been lucky enough to share the stage with... </p>
      </div>
        <div class="album-list">
        ${this._data.map((item, idx) => html`
        
          <section>
            <header class="album-detail">
                <h1>${item.context.custom.year} - ${item.context.custom.artist}</h1>
                <h2>${item.context.custom.caption}</h2>
                <h6>${item.context.custom.label} - ${item.context.custom.cat}</h6>
            </header>
            <div class="album-cover front" @click="${(e)=>{this._index = idx;this._toggleCover=true;}}">
              <img class="album-img" src="${url}t_album200x200/${item.public_id}.jpg">
            </div>
            <div class="album-cover back">
              <img class="album-img" src="${url}t_album200x200/${item.public_id.slice(0, -6)}-back.jpg">
            </div>
          </section>
         `)
        }
        </div>
      </div>
        ${this._toggleCover ?html`
          <div id="modal-album">
          <button class="btn-close" @click="${() => this._toggleCover=false}">${closeIcon}</button>
          <button class="btn-previous" @click="${() => this._index==0?this._index=this._data.length-1:this._index--}">Previous</button>
          <button class="btn-next" @click="${() => this._index==this._data.length-1?this._index=0:this._index++}">Next</button>
            <section class="modal">
              <div class="album-cover front">
                <img class="modal-img" src="${url}${this._data[this._index].public_id}.jpg">
              </div>
              <div class="album-cover back">
                <img class="modal-img" src="${url}${this._data[this._index].public_id.slice(0, -6)}-back.jpg">
              </div>
              <div class="album-detail">
                <h3>
                  ${this._data[this._index].context.custom.artist}
                  ${this._data[this._index].context.custom.caption}
                  ${this._data[this._index].context.custom.label}
                  ${this._data[this._index].context.custom.cat} 
                  ${this._data[this._index].context.custom.year}
                </h3>
              </div>
            </section>
          </div>`
        :html``}`
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
    this._toggleCover = false;
    this._data = [];
  }
  
  firstUpdated() {
    fetch('https://res.cloudinary.com/aljames/image/list/Album-Front.json')
    .then(r => r.json())
    .then(data => data.resources.sort((a,b)=> b.context.custom.year.localeCompare(a.context.custom.year)))
    .then(data => this._data = data)
    .catch(e => console.log("fetch error:", e));
  }
}

window.customElements.define('aljam-about', AljamAbout);