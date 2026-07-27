import { motion } from "motion/react";
import { CopyButton } from "./copy-button";
import { cn } from "../utils/cn";
import { detectLanguage, highlight, type Language } from "../utils/highlight";

/** Single-line snippet: the code, softly colored, with a copy button on the right. */
export function CodeField({
  code,
  prefix,
  language,
  wrap = false,
  plain = false,
}: {
  code: string;
  prefix?: string;
  language?: Language;
  /** Let long snippets break onto a second line instead of scrolling under the fade. */
  wrap?: boolean;
  /** Drop the syntax colors. For snippets that live next to a color picker,
      where a second palette in the code is one palette too many. */
  plain?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-3 w-full rounded-xl border border-neutral-200 dark:border-neutral-800 px-4 py-3 overflow-hidden">
      <div
        className={cn(
          "min-w-0 flex-1",
          !wrap && "[mask-image:linear-gradient(to_right,black_calc(100%-2rem),transparent)]"
        )}
      >
        <pre
          className={cn(
            "tabular-nums font-normal text-sm",
            plain ? "text-neutral-900 dark:text-white" : "text-neutral-600 dark:text-neutral-300",
            wrap
              ? "whitespace-pre-wrap break-words"
              : "whitespace-pre overflow-x-auto scrollbar-none"
          )}
        >
          {prefix && <span className="text-neutral-300 dark:text-neutral-600 mr-2">{prefix}</span>}
          {/* Keyed on the code, so a snippet driven by controls fades between
              values instead of snapping. Static snippets never rekey, so this
              costs them nothing. */}
          <motion.span
            key={code}
            initial={{ opacity: 0, filter: "blur(2px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            {plain ? code : highlight(code, language ?? detectLanguage(code))}
          </motion.span>
        </pre>
      </div>
      <CopyButton text={code} />
    </div>
  );
}

/** Multi-line snippet with a filename header — used for the agent skill files. */
export function CopyBlock({
  filename,
  content,
  language = "markdown",
}: {
  filename: string;
  content: string;
  language?: Language;
}) {
  return (
    <div className="w-full rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-b border-neutral-200 dark:border-neutral-800">
        <span className="min-w-0 truncate font-mono text-xs text-neutral-400">{filename}</span>
        <CopyButton text={content} />
      </div>
      <pre className="tabular-nums font-mono text-xs leading-relaxed text-neutral-600 dark:text-neutral-300 p-4 max-h-80 overflow-auto whitespace-pre scrollbar-none">
        {highlight(content.trim(), language)}
      </pre>
    </div>
  );
}
