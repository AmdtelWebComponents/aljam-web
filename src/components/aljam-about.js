import { html } from "lit-element";
import { PageViewElement } from "./page-view-element.js";

// These are the shared styles needed by this element.
import { SharedStyles } from "./shared-styles.js";
import { closeIcon } from "./aljam-icons";

class AljamAbout extends PageViewElement {
  static get properties() {
    return {
      _data: { type: Array },
      _logoData: { type: Array},
      _index: { type: Number },
      _toggleCover: { type: Boolean }
    };
  }
  render(url = "https://res.cloudinary.com/aljames/image/upload/") {
    return html`
      ${SharedStyles}
      <style>
        .album-list {
          height: 80vh;
          font-size: 1.3em;
          overflow-y: scroll;
        }
        .album-item {
          grid-gap: 0.2em;
          padding: 0.2em;
          color: white;
          grid-template-columns: repeat(2, 1fr);
          grid-template-areas:
            "album-detail album-detail"
            "album-cover-front album-cover-back";
        }
        .album-item:nth-of-type(even) {
          background: white;
          color: black;
        }
        .album-detail {
          grid-area: album-detail;
          text-align: center;
          line-height: 0.5;
        }
        .front {
          grid-area: album-cover-front;
        }
        .back {
          grid-area: album-cover-back;
        }
        .album-img {
          max-width: 100%;
          max-height: 100%;
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
          grid-template-columns: 1fr;
          min-height: 100vh;
          background: #000000ab;
        }
        .modal-img {
            max-width: 100%;
            max-height: 100%
        }
        
        @media (orientation: landscape) {
          .album-list {
            height: 80vh;
            font-size: 1.6em;
          }
          .album-item {
            grid-template-columns: repeat(4, 1fr);
            grid-template-areas: "album-detail album-detail album-cover-front album-cover-back";
          }
          .modal {
          grid-template-columns: repeat(2, 1fr);
          }
        }
      </style>
      ${this._data.length > 0 ? html`
        <div class="album-list">
          ${this._data.map((item, idx) => html`
            <section class="album-item">
              <div class="album-detail">
                <p>${item.context.custom.year}</p>
                <p>${item.context.custom.artist}</p>
                <p>${item.context.custom.caption}</p>
              </div>
              <img class="album-img front" src="${url}t_album200x200/${item.public_id}.jpg" @click="${e => {this._index = idx;this._toggleCover = true;}}"/>
              <img class="album-img back" src="${url}t_album200x200/${item.public_id.slice(0, -6)}-back.jpg"/>
            </section>`)
          }
        </div>
        ${this._toggleCover ? html`
          <div id="modal-album">
            <button class="btn-close" @click="${() => (this._toggleCover = false)}">${closeIcon}</button>
            <button class="btn-previous" @click="${() => this._index == 0 ? (this._index = this._data.length - 1) : this._index--}">Previous</button>
            <button class="btn-next" @click="${() => this._index == this._data.length - 1 ? (this._index = 0) : this._index++}">Next</button>
            <section class="modal">
                <img class="modal-img" src="${url}${this._data[this._index].public_id}.jpg"/>
                <img class="modal-img" src="${url}${this._data[this._index].public_id.slice(0,-6)}-back.jpg"/>
            </section>
          </div>` : html``
        }`
      :html`
        <div class="loader">
          <img class="spinner" src="${url}home/logo-transparent.png" />
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
    fetch("https://res.cloudinary.com/aljames/image/list/discography-logo.json")
      .then(r => r.json())
      .then(data => (this._logoData = data.resources))
      .catch(e => console.log("fetch error:", e));

    fetch("https://res.cloudinary.com/aljames/image/list/Album-Front.json")
      .then(r => r.json())
      .then(data =>
        data.resources.sort((a, b) =>
          b.context.custom.year.localeCompare(a.context.custom.year)
        )
      )
      .then(data => (this._data = data))
      .catch(e => console.log("fetch error:", e));
  }
}

window.customElements.define("aljam-about", AljamAbout);
