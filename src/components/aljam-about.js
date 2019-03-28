import { html } from '@polymer/lit-element';
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

class AljamAbout extends connect(store)(PageViewElement) {
  _render() {
        return html `
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
    top: 1rem;
    left: 1rem;
    bottom: 1rem;
    width: 98vw;
    overflow: auto;
    color: white;
    background-color: black;
  }
  
  .modal {
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas:
      'album-cover-front album-cover-back'
      'album-detail album-detail';
    min-height: 100v;
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


${this._discography.order.length > 0?
this._discography.order.map(
  (item) => html
  `<section>
    <header class="album-detail">
        <h1>${this._discography[item].year}</h1>

        <h5>${this._discography[item].artist}</h5>

        <h3>${this._discography[item].title}</h3>

        <h7>${this._discography[item].label} ${item}</h7>
    </header>
    <div class="album-cover front" on-click=${(e)=>{this._albumCover = this._discography[item];this._toggleCover=false;}}>
      <img class="album-img" src="https://res.cloudinary.com/amdtel/image/upload/t_album200x200/albums/${item}-front.jpg"></img>
    </div>
    <div class="album-cover back">
      <img class="album-img" src="https://res.cloudinary.com/amdtel/image/upload/t_album200x200/albums/${item}-back.jpg"></img>
    </div>
  </section>`)
:html`<section><h3>Loading...</h3></section>`}

<div id="modal-album" on-click=${()=>this._toggleCover=true} hidden=${this._toggleCover}>
  <section class="modal">
    <div class="album-cover front">
      <img class="modal-img" src="https://res.cloudinary.com/amdtel/image/upload/albums/${this._albumCover.cat}-front.jpg"></img>
    </div>
    <div class="album-cover back">
      <img class="modal-img" src="https://res.cloudinary.com/amdtel/image/upload/albums/${this._albumCover.cat}-back.jpg"></img>
    </div>
    <div class="album-detail">
      <h3>${this._albumCover.artist} ${this._albumCover.title} ${this._albumCover.label} ${this._albumCover.cat}</h3>
    </div>
  </section>
</div>
`;

  }
  static get properties() {
    return {
      _discography: Object,
      _albumCover: Object,
      _toggleCover: Boolean
    };
  }
  
  constructor () {
    super();
    this._albumCover = {artist:'',cat:'ST001',description:'',label:'',title:'',tracks:[],year:''};
    this._toggleCover = true;
  }
  
  _firstRendered() {
    store.dispatch(getDiscography());
  }
  
  // This is called every time something is updated in the store.
  _stateChanged(state)  {
    this._discography = state.discography.discography;
  }
}

window.customElements.define('aljam-about', AljamAbout);