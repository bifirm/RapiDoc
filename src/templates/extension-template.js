import { html } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import marked from 'marked';

/* eslint-disable indent */
function headingRenderer(extension) {
  const renderer = new marked.Renderer();
  renderer.heading = ((text, level, raw, slugger) => `<h${level} class="observe-me" id="${extension}--${slugger.slug(raw)}">${text}</h${level}>`);
  return renderer;
}

export default function extensionTemplate(extension) {
  const extensionDescription = this.resolvedSpec?.info["x-" + extension]
  if (!extensionDescription)
    return ''
  return html`
    <section id="${extension}"
      class="observe-me ${this.renderStyle === 'view' ? 'section-gap' : 'section-gap--read-mode'}">
        <slot name="${extension}"></slot>
          <div id="api-${extension}">
          ${html`${
            unsafeHTML(`
              <div class="m-markdown regular-font">
              ${marked(extensionDescription, this.infoDescriptionHeadingsInNavBar === 'true' ? { renderer: headingRenderer(extension) } : undefined)}
            </div>`)}`
          }
      </div>
    </section>
  `;
}
/* eslint-enable indent */
