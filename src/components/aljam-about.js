import { html } from '@polymer/lit-element';
import { PageViewElement } from './page-view-element.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

class AljamAbout extends PageViewElement {
    _render(props) {
        return html `
${SharedStyles}
<style>
  :host {
    display: block;
    background-color: #ed5000;
  }
</style>

<div class="fullcard">
  <div class="btn">About</div>
  <p>Modus commodo minimum eum te, vero utinam assueverit per eu.</p>
</div>
`;
    }
}

window.customElements.define('aljam-about', AljamAbout);