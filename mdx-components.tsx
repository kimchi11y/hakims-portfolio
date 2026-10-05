import type { MDXComponents } from "mdx/types";
import { CodeBlock } from "./components/code-block";

const components: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="text-3xl md:text-4xl font-bold tracking-tight mt-10 mb-5">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl md:text-3xl font-bold tracking-tight mt-10 mb-4">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl font-semibold tracking-tight mt-8 mb-3">{children}</h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-base font-semibold tracking-tight mt-6 mb-2">{children}</h4>
  ),
  p: ({ children }) => (
    <p className="text-base leading-relaxed text-[var(--text-dimmed)] my-4">
      {children}
    </p>
  ),
  a: ({ children, href }) => (
    <a
      href={href}
      className="text-[var(--foreground)] underline underline-offset-4 decoration-[var(--text-muted)] hoverable:decoration-[var(--foreground)] t-color"
    >
      {children}
    </a>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-[var(--foreground)]">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  ul: ({ children }) => (
    <ul className="my-4 space-y-2 pl-5 list-disc text-[var(--text-dimmed)]">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-4 space-y-2 pl-5 list-decimal text-[var(--text-dimmed)]">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="my-6 border-l-2 border-[var(--border)] pl-4 italic text-[var(--text-dimmed)]">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-8 border-[var(--border)]" />,
  pre: ({ children, style, ...props }) => (
    <CodeBlock
      {...props}
      style={{ ...style, backgroundColor: undefined, color: undefined }}
      className="bg-[var(--surface-sunken)] rounded-2xl overflow-x-auto p-4 my-6 text-[13px] leading-relaxed font-mono border border-[var(--border)]"
    >
      {children}
    </CodeBlock>
  ),
  code: ({ children, className, ...props }) => {
    const isBlock =
      "data-language" in props ||
      (typeof className === "string" && className.includes("shiki"));
    if (isBlock) {
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }
    return (
      <code className="rounded-md bg-[var(--surface-hover)] px-1.5 py-0.5 text-[0.875em] font-mono text-[var(--foreground)]">
        {children}
      </code>
    );
  },
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto rounded-xl border border-[var(--border)]">
      <table className="w-full text-sm text-[var(--text-dimmed)]">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="text-left font-semibold text-[var(--foreground)] px-3 py-2 border-b border-[var(--border)]">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-3 py-2 border-b border-[var(--border)]">{children}</td>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
