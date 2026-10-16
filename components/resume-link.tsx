import { personalData } from "@/lib/data";

interface ResumeLinkProps {
  className: string;
  /** Nav pills are shorter than hero buttons, so the icon shrinks with them. */
  iconClassName?: string;
  onClick?: () => void;
}

/**
 * Opens the PDF in a new tab. Browsers cannot render `.docx` inline, so the
 * Word file gets its own download element below instead of a shared link.
 */
export function ResumeLink({
  className,
  iconClassName = "w-5 h-5",
  onClick,
}: ResumeLinkProps) {
  return (
    <a
      href={personalData.resume.pdf}
      target="_blank"
      rel="noopener noreferrer"
      title="View resume (PDF)"
      onClick={onClick}
      className={className}
    >
      <span>Resume</span>
      <svg
        className={iconClassName}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5z" />
        <path d="M14 3v5h5M9 13h6M9 17h4" />
      </svg>
    </a>
  );
}

/** Same-origin file, so `download` is honoured and keeps the server filename. */
export function ResumeDownloadLink({
  className,
  iconClassName = "w-5 h-5",
}: Omit<ResumeLinkProps, "onClick">) {
  return (
    <a
      href={personalData.resume.docx}
      download
      aria-label="Download resume as a Word document"
      title="Download Word document (.docx)"
      className={className}
    >
      <svg
        className={iconClassName}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <path d="M12 3v12M8 11l4 4 4-4M5 18v1a2 2 0 002 2h10a2 2 0 002-2v-1" />
      </svg>
    </a>
  );
}
