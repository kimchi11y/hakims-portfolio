"use client";

import { useRef, useState } from "react";

const RESET_MS = 1600;

/** Wraps MDX `<pre>` output with a copy button. */
export function CodeBlock({ children, ...props }: React.ComponentProps<"pre">) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  async function copyCode() {
    const text = preRef.current?.textContent ?? "";
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Clipboard blocked (insecure origin, denied permission) — leave the
      // button in its resting state rather than claiming success.
      return;
    }

    setCopied(true);
    window.setTimeout(() => setCopied(false), RESET_MS);
  }

  return (
    <div className="code-block">
      <button
        type="button"
        onClick={copyCode}
        className="code-copy"
        aria-label={copied ? "Code copied" : "Copy code"}
      >
        {copied ? "Copied" : "Copy"}
      </button>
      <pre ref={preRef} {...props}>
        {children}
      </pre>
    </div>
  );
}
