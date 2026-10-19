import { register, render } from "pele/core";
import flowchart from "pele/diagrams/flowchart";

/* Registering a diagram type is idempotent, so module scope is enough. */
register(flowchart);

interface FlowchartProps {
  /** Mermaid source. Invalid syntax throws `PeleError` and fails the build. */
  source: string;
  /** Accessible name for the diagram, since the SVG carries no title. */
  label: string;
  caption?: string;
}

/**
 * Renders a Mermaid flowchart to inline SVG at build time.
 *
 * This stays a Server Component: `pele` is never bundled for the browser, the
 * SVG is static markup in the prerendered HTML, and its colours come from CSS
 * variables mapped onto the site palette (see `.diagram` in globals.css), so
 * the diagram re-themes with the toggle without re-rendering.
 *
 * No `fontFamily` option is passed: text measurement has no canvas here, so
 * Pele uses its built-in width table and emits `font-family: var(--pele-font)`,
 * which CSS owns. Verify label fit with the diagram test rather than by eye.
 */
export function Flowchart({ source, label, caption }: FlowchartProps) {
  const { svg } = render(source);

  return (
    <figure className="diagram">
      <div
        className="diagram-frame"
        role="img"
        aria-label={label}
        dangerouslySetInnerHTML={{ __html: svg }}
      />
      {caption ? <figcaption className="diagram-caption">{caption}</figcaption> : null}
    </figure>
  );
}
