import { html } from 'lit-element';
import { PageViewElement } from './page-view-element.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

class AljamContact extends PageViewElement {
  static get properties() {
    return {
      _data: { type: Array },
    };
  }
  
  render() {
    return html `
      ${SharedStyles}
      <style>
        .layout {
          height: 80vh;
        }
        @media (orientation: landscape) {
          .layout {
            grid-template-rows: 80vh;
          }
        }
      </style>

      <section class="layout">
        <iframe id="player" type="text/html" width="640" height="390" src="https://www.youtube.com/embed/sYchEGYlrhQ?enablejsapi=1&origin=https://dev-aljam-web.glitch.me" frameborder="0"></iframe>
        
      </section>
      `;
  }
}

window.customElements.define('aljam-contact', AljamContact);