import { html } from '@polymer/lit-element';
import { PageViewElement } from './page-view-element.js';
import { connect } from 'pwa-helpers/connect-mixin.js';

// This element is connected to the Redux store.
import { store } from '../store.js';

// These are the actions needed by this element.
import { getAllPictures, changePicture, toggleChooser } from '../actions/art.js';

// We are lazy loading its reducer.
import pictures from '../reducers/art.js';
store.addReducers({
  pictures
});

// These are the elements needed by this element.
import './el-album-chooser.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

class AljamArt extends connect(store)(PageViewElement) {
    _render(props) {
        return html `
${SharedStyles}
<style>
  #thumbnail {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
  #thumbnail>img {
    padding: 5px;
  }
  #mainimage {
    width: 100%;
    height: auto;
  }
  .aspectRatioSizer {
  display: grid;
  }
  .aspectRatioSizer > * {
    grid-area: 1 / 1 / 2 / 2;
  }
</style>
<div class="btn">Art</div>
<section>
<div class="aspectRatioSizer">
    <svg viewBox="0 0 3 2"></svg>
    <div hidden="${props._chooser}">
      <div>
        ${Object.keys(props._pictures).map((key) => {
            const item = props._pictures[key];
            return html`
              <img
                src="https://res.cloudinary.com/amdtel/image/upload/t_media_lib_thumb/${item.public_id}.jpg"
                on-click="${(e) => store.dispatch(changePicture(e.currentTarget.dataset['index'])) }"
                data-index$="${item.public_id}">
              </img>
            `;
          })}
      </div>
    </div>
    <div hidden="${!props._chooser}">
      <img
        id="mainimage"
        src="https://res.cloudinary.com/amdtel/image/upload/${props._currentPicture}.jpg"
        on-click="${() => store.dispatch(toggleChooser())}">
      </img>
    </div>
</div>
</section>
`;
    }
  static get properties(){
    return {
      _pictures: Object,
      _currentPicture: String,
      _chooser: Boolean
    };
  }
  
  _firstRendered() {
    store.dispatch(getAllPictures());
  }
  
  // This is called every time something is updated in the store.
  _stateChanged(state) {
    this._pictures = state.pictures.pictures;
    this._currentPicture = state.pictures.value;
    this._chooser = state.pictures.chooser;
  }
}

window.customElements.define('aljam-art', AljamArt);