import { html } from 'lit-element';
import { PageViewElement } from './page-view-element.js';
import { connect } from 'pwa-helpers/connect-mixin.js';

// This element is connected to the Redux store.
import { store } from '../store.js';

// These are the actions needed by this element.
import { getAllAlbums, changeAlbum, toggleChooser } from '../actions/albums.js';

// We are lazy loading its reducer.
import library from '../reducers/albums.js';
store.addReducers({
  library
});

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

class AljamMusic extends connect(store)(PageViewElement) {
    render() {
        return html `
${SharedStyles}
<style>
  iframe {
    border: none;
    overflow: hidden;
    width: 100%;
    height: 450px;
  }
  .albums {
    grid-gap: 20px;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    justify-items: center;
    align-items: center;
    padding: 1rem;
  }
  .albums div {
    display: flex;
    flex-direction: column;
  }
  .scwidget {
    justify-items: center;
    align-items: center;
    padding: 1rem;
  }
  
  .chooserbtn {
    width: 100%;
    height: 50px;
  }
</style>

${this._chooser
?html`
<section class="albums">
  ${this._albums.map(
  (item) => html`
<div>
  <img src="${item.cover}">
  <button @click="${(e) => store.dispatch(changeAlbum(e.currentTarget.dataset['index'])) }" data-index="${item.id}" title="Play ${item.title}">
    ${item.title}
  </button>
</div>
  `)}
</section>`
:html`
<section class="scwidget">
<button class="chooserbtn" @click="${() => store.dispatch(toggleChooser())}">Albums</button>
<iframe src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/${this._currentAlbum}&amp;color=%23005500&amp;show_playcount=false"></iframe>
</section>
`}

`;
    }
  static get properties(){
    return {
      _albums: { type: Object },
      _currentAlbum: { type: String },
      _chooser: { type: Boolean }
    };
  }
  
  firstUpdated() {
    store.dispatch(getAllAlbums());
  }
  
  // This is called every time something is updated in the store.
  stateChanged(state) {
    this._albums = state.library.albums;
    this._currentAlbum = state.library.value;
    this._chooser = state.library.chooser;
  }
}

window.customElements.define('aljam-music', AljamMusic);