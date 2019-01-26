import { html } from '@polymer/lit-element';
import { PageViewElement } from './page-view-element.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

class AljamContact extends PageViewElement {
    _render(props) {
        return html `
${SharedStyles}
<style>
  :host {
    background: black;
    color: white;
  }
  section {
    grid-gap: 1rem;
    grid-template-columns: 2fr 1fr;
    justify-items: center;
    align-items: center;
  }
  section img {
    max-width: 100vw;
    max-height: 100vw;
  }
  
  @media (max-width: 459px) {
    section {
      grid-template-columns: 1fr;
      grid-template-rows: 2fr 1fr;
    }
</style>

<section>
  <img src="./images/contact.jpeg"></img>
  <div>How to contact us...</div>
</section>
`;
    }
}

window.customElements.define('aljam-contact', AljamContact);