import { html } from '@polymer/lit-element';
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
    _render(props, url="https://res.cloudinary.com/amdtel/image/upload/") {
        return html `
${SharedStyles}
<style>
  .fullimg {
    justify-items: center;
    align-items: center;
  }
  
  .fullimg img{
    max-width: 100vw;
    max-height: 100vh;
  }
  .portfolio {
    grid-gap: 20px;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    justify-items: center;
    align-items: center;
    padding: 1rem;
  }
  .portfolio img{
    max-height: 75px;
  }
  .close {
    position: fixed;
    background: black;
    top: 1rem;
    right: 1rem;
    fill: white;
    cursor: pointer;
    height: 44px;
    width: 44px;
  }
</style>

${props._chooser
?html`
<section class="portfolio">
    ${props._pictures.map(
    (item) => html`
          <picture>
            <source srcset="${url}t_media_lib_thumb/${item.public_id}.webp" type="image/webp">
            <img 
              src="${url}t_media_lib_thumb/${item.public_id}.jpg"
              on-click="${(e) => store.dispatch(changePicture(e.currentTarget.dataset['index'])) }"
              data-index$="${item.public_id}">
           </img>
          </picture>
            
        `)}
</section>
`:html`
<section class="fullimg">
    <button class="close" on-click="${() => store.dispatch(togglePicture())}">${closeIcon}</button>
    <picture>
      <source srcset="${url}${props._currentPicture}.webp" type="image/webp">
      <img src="${url}${props._currentPicture}.jpg"></img>
    </picture>
</section>   
`}
`;
    }
  static get properties(){
    return {
      _pictures: Array,
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