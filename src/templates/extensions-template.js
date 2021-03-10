import { html } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import marked from 'marked';

/* eslint-disable indent */
function headingRenderer(extension) {
  const renderer = new marked.Renderer();
  renderer.heading = ((text, level, raw, slugger) => `<h${level} class="observe-me" id="${extension}--${slugger.slug(raw)}">${text}</h${level}>`);
  return renderer;
}

export function extensionsTemplates() {
  const extensions = listExtensions(this.resolvedSpec);
  return html`${extensions.map(extension => extensionTemplate.call(this, extension))}`;
}

export function extensionTemplate(extension) {
  if (!extension)
    return ''
  
  if (typeof extension === "string") {
    const extensions = listExtensions(this.resolvedSpec)
    const filtered = extensions.filter(e => e.name === extension)
    if (filtered.length > 0)
      extension = filtered[0]
    else
      return ''
  }
  return html`
    <section id="${extension.name}"
      class="observe-me ${this.renderStyle === 'view' ? 'section-gap' : 'section-gap--read-mode'}">
        ${extension.headers.length == 0 ? html`<h1>${extension.name.replace('x-', '').toLocaleUpperCase()}</h1>` : ''}
        <slot name="${extension.name}"></slot>
        <div id="api-${extension.name}">
        ${html`${
          unsafeHTML(`
            <div class="m-markdown regular-font">
            ${marked(extension.description, this.infoDescriptionHeadingsInNavBar === 'true' ? { renderer: headingRenderer(extension.name) } : undefined)}
          </div>`)}`
        }
      </div>
    </section>
    `;
}

export function listExtensions(resolvedSpec) {
  let extensions = [];
  for (const key in resolvedSpec?.info) {
    if (!key.startsWith('x-'))
      continue;
    const value = resolvedSpec.info[key]
    if (!value || typeof value !== "string")
      continue;
    extensions.push({ name: key, description: value, headers: getHeadersFromMarkdown(value) })
  }
  return extensions;
}

function getHeadersFromMarkdown(markdownContent) {
  const tokens = marked.lexer(markdownContent);
  const headers = tokens.filter((v) => v.type === 'heading' && v.depth <= 2);
  return headers || [];
}

/* eslint-enable indent */
