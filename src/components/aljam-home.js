import { html } from '@polymer/lit-element';
import { PageViewElement } from './page-view-element.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

class AljamHome extends PageViewElement {
    _render(props) {
        return html `
${SharedStyles}
<style>
    iron-icon {
        --iron-icon-height: 50px;
        --iron-icon-width: 50px;
    }

    .content {
        display: grid;
        grid-template-areas: 'soloyo';
        justify-items: center;
        max-width: 100vw;
        max-height: 100vh;
        margin: auto;
    }
    img {
      grid-area: soloyo;
      display: block;
      width: auto;
      height: auto;
      max-width: 100vw;
      max-height: 100vh;
    }

    .caption {
      background: rgba(0, 0, 0, .5);
      grid-area: soloyo;
      align-self: center;
      max-width: 95%;
      padding: 1rem;
      font-size: 1.5rem;
      color: #fff;
      text-align: center;
      border-radius: 5px;
      border: 1px solid #fff;
    }
    
    @media (max-width: 460px), (max-height: 460px) {
      #main {
        height: 100vh;
      }
      section {
        height: auto;
      }
      .content {
        max-height: 100%;
      }
    }

    #maincontent {
      background-color: black;
    }
    #music {
        background-color: white;
        color: black;
    }

    #art {
        background-color: black;
        color: white;
    }

    #about {
        background-color: #ed5000;
        color: black;
    }

    #contact {
        background-color: black;
        color: white;
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

<section id="main" style="background-color: black;">
  <div id="maincontent" class="content">
    <img src="../images/telecaster.jpg">
    <div class="caption"><p>Welcome to Al James's Web Site...</p></div>
  </div>
</section>

<section id="music">
  <div class="content">
    <img src="../images/image1.jpeg"></img>
    <div class="caption">
        <a class="btn" href="/music">Listen to the music…</a>
        <p>Since I got my first guitar (aged 12) music has been my master and I have been its eager and willing slave.</p>
        <p>I’ve been lucky enough to have made music with a host a wonderfully talented and creative people, some I have forged long associations with and some have come and gone like ships in the night.</p>
        <p>Occasionally a genre has been chosen to define what we do, but more often than not, the only restraints on the style of music being explored are the talents, interests and collective vibe of the people involved.</p>
        <p>Even when I am writing and recording on my own, their influence is constant, supportive and inspiring.</p>
        <p>With MASSIVE THANKS to all who share the journey and are represented herein … XXX</p>
        <p>Here you can hear some of the results of these collaborations, inspirations and solo adventures …</p>
    </div>
  </div>
</section>

<section id="art">
  <div class="content">
    <img src="../images/image2.jpeg"></img>
    <div class="caption">
      <a class="btn" href="/art">See the pictures…</a>
      <p>In the past I worked as a graphic artist and for a while painting pictures became my main pastime … then I got photo shop on my pc and I have been trapped in a digital world ever since.</p>
      <p>Here you can see some of my paintings, photos and artworks …</p>
    </div>
  </div>
</section>

<section id="about">
  <div class="content">
    <img src="../images/image3.jpeg"></img>
    <div class="caption">
      <a class="btn" href="/about">Find out more...</a>
      <p>aljam.co.uk …</p>
      <p>This website is a library where I intend to build a comprehensive record of my musical and artistic creations.</p>
      <p>Here you can read things about the whos, wheres and whens of this creativity … </p>
    </div>
  </div>
</section>

<section id="contact">
  <div class="content">
    <img src="../images/image4.jpeg"></img>
    <div class="caption">
      <a class="btn" href="/contact">How to contact us...</a>
      <p>Email: someone@somewhere.co.uk, etc...</p>
    </div>
  </div>
</section>
`;
    }
}

window.customElements.define('aljam-home', AljamHome);