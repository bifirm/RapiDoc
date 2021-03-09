import { html } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import marked from 'marked';

/* eslint-disable indent */
function headingRenderer() {
  const renderer = new marked.Renderer();
  renderer.heading = ((text, level, raw, slugger) => `<h${level} class="observe-me" id="addendum--${slugger.slug(raw)}">${text}</h${level}>`);
  return renderer;
}

export default function addendumTemplate() {
  return html`
    <section id="addendum"
      class="observe-me ${this.renderStyle === 'view' ? 'section-gap' : 'section-gap--read-mode'}">
      ${this.resolvedSpec?.info
        ? html`
          <slot name="addendum"></slot>
          <div id="api-addendum">
          ${this.resolvedSpec.info["x-addendum"]
            ? html`${
              unsafeHTML(`
                <div class="m-markdown regular-font">
                ${marked(this.resolvedSpec.info["x-addendum"], this.infoDescriptionHeadingsInNavBar === 'true' ? { renderer: headingRenderer() } : undefined)}
              </div>`)}`
            : ''
          }
          </div>
        `
        : ''
      }
    </section>
  `;
}
/* eslint-enable indent */
