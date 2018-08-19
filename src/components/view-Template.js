import { html } from '@polymer/lit-element';
import { PageViewElement } from './page-view-element.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

class AljamMusic extends PageViewElement {
    _render(props) {
        return html `
      ${SharedStyles}
      
      `;
    }
}

window.customElements.define('aljam-music', AljamMusic);