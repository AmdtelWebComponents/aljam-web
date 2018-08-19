import { html } from '@polymer/lit-element';
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

// These are the elements needed by this element.
import './el-album-chooser.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

class AljamMusic extends connect(store)(PageViewElement) {
    _render(props) {
        return html `
${SharedStyles}
<style>
  iframe {
    border: none;
    overflow: hidden;
    width: 100%;
    height: 450px;
  }

  .aspectRatioSizer {
    display: grid;
  }

  .aspectRatioSizer>* {
    grid-area: 1 / 1 / 2 / 2;
  }
</style>
<div class="btn" on-click="${() => store.dispatch(toggleChooser())}">Music</div>
<section>
  <div class="aspectRatioSizer">
    <svg viewBox="0 0 3 2"></svg>
    <div hidden="${props._chooser}">
      <div>
        ${Object.keys(props._albums).map((key) => {
          const item = props._albums[key];
          return html`
                <div>
                  <button on-click="${(e) => store.dispatch(changeAlbum(e.currentTarget.dataset['index'])) }" data-index$="${item.id}" title="Play ${item.title}">
                    ${item.title}
                  </button>
                </div>
        `; })}
      </div>
    </div>
  </div>
<iframe src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/${props._currentAlbum}&amp;color=%23005500&amp;show_playcount=false"></iframe>
</section>
`;
    }
  static get properties(){
    return {
      _albums: Object,
      _currentAlbum: String,
      _chooser: Boolean
    };
  }
  
  _firstRendered() {
    store.dispatch(getAllAlbums());
  }
  
  // This is called every time something is updated in the store.
  _stateChanged(state) {
    this._albums = state.library.albums;
    this._currentAlbum = state.library.value;
    this._chooser = state.library.chooser;
  }
}

window.customElements.define('aljam-music', AljamMusic);