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
  _render(props) {
        return html `
${SharedStyles}
<style>
  :host {
    display: block;
    background-color: #ed5000;
  }
  section {
    min-height: 200px;
    background: black;
    color: white;
    padding: 1rem;
    grid-gap: 1rem;
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
  
  @media (max-width: 459px) {
    section {
      grid-template-columns: repeat(2, 1fr);
      grid-template-areas:
      'album-detail album-detail'
      'album-cover-front album-cover-back'
    }
    .album-cover img {
      max-height: 150px;
    }
  }
</style>
${props._discography.order.length > 0?
props._discography.order.map(
  (item) => html
  `<section>
    <header class="album-detail">
        <h1>${props._discography[item].year}</h1>

        <h5>${props._discography[item].artist}</h5>

        <h3>${props._discography[item].title}</h3>

        <h7>${props._discography[item].label} ${item}</h7>
    </header>
    <div class="album-cover front">
      <img src="https://res.cloudinary.com/amdtel/image/upload/t_album200x200/albums/${item}-front.jpg"></img>
    </div>
    <div class="album-cover back">
      <img src="https://res.cloudinary.com/amdtel/image/upload/t_album200x200/albums/${item}-back.jpg"></img>
    </div>
  </section>`)
:html`<section><h3>Loading...</h3></section>`}

`;

  }
  static get properties() {
    return {
      _discography: Object
    };
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