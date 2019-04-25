import { html } from 'lit-element';
import { PageViewElement } from './page-view-element.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

class AljamHome extends PageViewElement {
    render() {
        return html `
${SharedStyles}
<style>
  iron-icon {
    --iron-icon-height: 50px;
    --iron-icon-width: 50px;
  }

  section {
    background-position: center;
    background-repeat: no-repeat;
    background-color: black;
    background-image: url(../images/telecaster.jpg);
    background-size: cover;
    grid-gap: 1rem;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
  }

  .caption {
    background: rgba(0, 0, 0, .5);
    align-self: center;
    justify-self: center;
    min-width: 75%;
    padding: 1rem;
    font-size: 1.5rem;
    color: #fff;
    text-align: center;
    text-decoration: none;
    border-radius: 5px;
    border: 1px solid #fff;
  }
  
  @media (max-width: 459px) {
    section {
      grid-template-columns: 1fr;
      grid-template-rows: repeat(4, 1fr);
    }
  }

  #facebook {
    --iron-icon-fill-color: blue;
  }

  #googleplus {
    --iron-icon-fill-color: red;
  }

  #twitter {
    --iron-icon-fill-color: blue;
  }
</style>

<section id="main">
  <a class="caption" href="/music"><p>Music...</p></a>
  <a class="caption" href="/art"><p>Art...</p></a>
  <a class="caption" href="/about"><p>About...</p></a>
  <a class="caption" href="/contact"><p>contact...</p></a>
</section>

`;
    }
}

window.customElements.define('aljam-home', AljamHome);