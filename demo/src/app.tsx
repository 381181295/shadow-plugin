import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { cn } from "./utils/cn";
import skillContent from "../../.claude/skills/smooth-shadow-ring/SKILL.md?raw";
import bugbotContent from "../../BUGBOT.md?raw";

const GITHUB_URL = "https://github.com/flornkm/shadow-plugin";

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23a11.5 11.5 0 0 1 3-.405c1.02.005 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={copy}
      className="relative text-sm cursor-pointer text-neutral-400 hover:text-neutral-600 font-medium h-5 w-12 shrink-0"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={copied ? "copied" : "copy"}
          initial={{ opacity: 0, filter: "blur(2px)", scale: 0.9 }}
          animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
          exit={{ opacity: 0, filter: "blur(2px)", scale: 0.9 }}
          transition={{ duration: 0.12 }}
          className="block text-right origin-right"
        >
          {copied ? "Copied" : "Copy"}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

function CopyBlock({ filename, content }: { filename: string; content: string }) {
  return (
    <div className="w-full rounded-xl border border-neutral-200 overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-b border-neutral-200">
        <span className="min-w-0 truncate font-mono text-xs text-neutral-400">{filename}</span>
        <CopyButton text={content} />
      </div>
      <pre className="tabular-nums font-mono text-xs leading-relaxed text-neutral-600 p-4 max-h-80 overflow-auto whitespace-pre scrollbar-none">
        {content.trim()}
      </pre>
    </div>
  );
}

const SIZES = [
  { label: "XS", smooth: "smooth-shadow-xs", ring: "smooth-shadow-ring-xs", tailwind: "shadow-xs" },
  { label: "SM", smooth: "smooth-shadow-sm", ring: "smooth-shadow-ring-sm", tailwind: "shadow-sm" },
  { label: "Default", smooth: "smooth-shadow", ring: "smooth-shadow-ring", tailwind: "shadow" },
  { label: "LG", smooth: "smooth-shadow-lg", ring: "smooth-shadow-ring-lg", tailwind: "shadow-lg" },
  { label: "XL", smooth: "smooth-shadow-xl", ring: "smooth-shadow-ring-xl", tailwind: "shadow-xl" },
];

const INSTALL_COMMANDS = [
  { label: "npm", command: "npm i shadow-plugin" },
  { label: "pnpm", command: "pnpm add shadow-plugin" },
  { label: "yarn", command: "yarn add shadow-plugin" },
  { label: "bun", command: "bun add shadow-plugin" },
];

function CodeField({ code, prefix }: { code: string; prefix?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex items-start justify-between gap-3 w-full rounded-xl border border-neutral-200 px-4 py-3 overflow-hidden">
      <div className="min-w-0 flex-1 [mask-image:linear-gradient(to_right,black_calc(100%-2rem),transparent)]">
        <pre className="tabular-nums font-normal text-sm whitespace-pre overflow-x-auto scrollbar-none">
          {prefix && <span className="text-neutral-300 mr-2">{prefix}</span>}
          {code}
        </pre>
      </div>
      <button
        onClick={copy}
        className="relative text-sm cursor-pointer text-neutral-400 hover:text-neutral-600 font-medium h-5 w-12 shrink-0"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={copied ? "copied" : "copy"}
            initial={{ opacity: 0, filter: "blur(2px)", scale: 0.9 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            exit={{ opacity: 0, filter: "blur(2px)", scale: 0.9 }}
            transition={{ duration: 0.12 }}
            className="block text-right origin-right"
          >
            {copied ? "Copied" : "Copy"}
          </motion.span>
        </AnimatePresence>
      </button>
    </div>
  );
}

function App() {
  const [selected, setSelected] = useState(2);
  const [ring, setRing] = useState(true);
  const [pm, setPm] = useState(0);

  return (
    <main className="min-h-screen px-4 pt-4 pb-8 md:py-20">
      <div className="w-full max-w-3xl flex space-y-8 flex-col items-start mx-auto">
        <div className="space-y-2">
          <h1 className="text-base font-medium leading-tight">Smooth Shadow Plugin</h1>
          <p className="text-sm mb-1.5 leading-tight text-neutral-400">
            A simple tailwind plugin that makes your shadows finally look good.
          </p>
        </div>

        {/* Example */}
        <div className="w-full space-y-5">
          <h2 className="font-medium leading-tight">Try it out</h2>
          <div className="p-8 rounded-md bg-neutral-50 space-y-6">
            <div className="flex items-center justify-center gap-8 sm:gap-16 px-4 sm:px-8 py-16 sm:py-24">
              <div className="flex flex-col items-center gap-3">
                <div
                  className={cn(
                    "size-24 sm:size-32 bg-white rounded-2xl shadow-black/10 transition-shadow duration-300",
                    SIZES[selected].tailwind
                  )}
                />
                <span className="text-sm text-neutral-400">Default</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div
                  className={cn(
                    "size-24 sm:size-32 bg-white rounded-2xl transition-shadow duration-300",
                    ring ? SIZES[selected].ring : SIZES[selected].smooth
                  )}
                />
                <span className="text-sm text-neutral-400">
                  {ring ? "Smooth + ring" : "Smooth"}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-2">
              <div className="flex items-center gap-1">
                {SIZES.map((size, i) => (
                  <button
                    key={size.label}
                    onClick={() => setSelected(i)}
                    className={cn(
                      "relative px-3 py-1 cursor-pointer rounded-full text-xs font-medium whitespace-nowrap transition-colors",
                      selected === i
                        ? "text-neutral-900"
                        : "text-neutral-400 hover:text-neutral-500"
                    )}
                  >
                    {selected === i && (
                      <motion.span
                        layoutId="size-selector"
                        className="absolute inset-0 bg-neutral-100 rounded-full"
                        transition={{
                          type: "spring",
                          duration: 0.4,
                          bounce: 0.15,
                        }}
                      />
                    )}
                    <span className="relative z-10">{size.label}</span>
                  </button>
                ))}
              </div>
              <span className="hidden sm:block w-px h-4 mx-1.5 bg-neutral-200" />
              <div className="flex items-center gap-1">
                {[
                  { label: "Ring", value: true },
                  { label: "No ring", value: false },
                ].map((option) => (
                  <button
                    key={option.label}
                    onClick={() => setRing(option.value)}
                    className={cn(
                      "relative px-3 py-1 cursor-pointer rounded-full text-xs font-medium whitespace-nowrap transition-colors",
                      ring === option.value
                        ? "text-neutral-900"
                        : "text-neutral-400 hover:text-neutral-500"
                    )}
                  >
                    {ring === option.value && (
                      <motion.span
                        layoutId="ring-selector"
                        className="absolute inset-0 bg-neutral-100 rounded-full"
                        transition={{
                          type: "spring",
                          duration: 0.4,
                          bounce: 0.15,
                        }}
                      />
                    )}
                    <span className="relative z-10">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Install */}
        <div className="w-full space-y-3">
          <h2 className="font-medium leading-tight">Install</h2>
          <div className="flex items-center gap-3">
            {INSTALL_COMMANDS.map((p, i) => (
              <button
                key={p.label}
                onClick={() => setPm(i)}
                className={cn(
                  "text-sm cursor-pointer font-medium transition-colors",
                  pm === i ? "text-neutral-900" : "text-neutral-400 hover:text-neutral-500"
                )}
              >
                {p.label}
              </button>
            ))}
          </div>
          <CodeField code={INSTALL_COMMANDS[pm].command} prefix="$" />
        </div>

        {/* Usage */}
        <div className="w-full space-y-3">
          <h2 className="font-medium leading-tight">Usage</h2>
          <div>
            <h3 className="text-sm mb-1.5 leading-tight text-neutral-400">Tailwind stylesheet</h3>
            <CodeField code="@import 'shadow-plugin';" />
          </div>
          <div>
            <h3 className="text-sm mb-1.5 leading-tight text-neutral-400">Element classes</h3>
            <CodeField code="<div className='smooth-shadow-md' />" />
          </div>
          <div>
            <h3 className="text-sm mb-1.5 leading-tight text-neutral-400">
              Shadow + ring for elevated surfaces
            </h3>
            <CodeField code="<div className='smooth-shadow-ring-md' />" />
          </div>
          <div>
            <h3 className="text-sm mb-1.5 leading-tight text-neutral-400">
              Adjust ring and shadow color independently
            </h3>
            <CodeField code="<div className='smooth-shadow-ring-md smooth-ring-blue-500/40 shadow-red-500' />" />
          </div>
          <div>
            <h3 className="text-sm mb-1.5 leading-tight text-neutral-400">
              Optional: Replace all your default shadows
            </h3>
            <CodeField
              code={`@theme {\n  --shadow-xs: var(--smooth-shadow-xs);\n  --shadow-sm: var(--smooth-shadow-sm);\n  --shadow-md: var(--smooth-shadow-md);\n  --shadow-lg: var(--smooth-shadow-lg);\n  --shadow-xl: var(--smooth-shadow-xl);\n  --shadow-2xl: var(--smooth-shadow-2xl);\n}`}
            />
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-neutral-200" />

        {/* Agent skills */}
        <div className="w-full space-y-4">
          <div className="space-y-2">
            <h2 className="font-medium leading-tight">Agent skills</h2>
            <p className="text-sm leading-tight text-neutral-400">
              Drop these into your AI tools so they stop pairing a{" "}
              <code className="font-mono text-neutral-500">border</code> with a{" "}
              <code className="font-mono text-neutral-500">shadow</code> (the double edge) and
              reach for <code className="font-mono text-neutral-500">smooth-shadow-ring</code>{" "}
              instead.
            </p>
          </div>
          <div>
            <h3 className="text-sm mb-1.5 leading-tight text-neutral-900">Claude / agent skill</h3>
            <CopyBlock filename=".claude/skills/smooth-shadow-ring/SKILL.md" content={skillContent} />
          </div>
          <div>
            <h3 className="text-sm mb-1.5 leading-tight text-neutral-900">Cursor Bugbot rule</h3>
            <CopyBlock filename="BUGBOT.md" content={bugbotContent} />
          </div>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-neutral-900 smooth-shadow-ring-sm hover:bg-neutral-50 transition-colors"
          >
            <GitHubIcon className="size-3.5" />
            Star on GitHub
          </a>
        </div>

        <p className="text-sm text-neutral-400 pt-4">
          Created by{" "}
          <a
            href="https://x.com/nilseller"
            target="_blank"
            className="text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            Nils Eller
          </a>
          ,{" "}
          <a
            href="https://x.com/eduardwieandt"
            target="_blank"
            className="text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            Eduard Wieandt
          </a>
          , and{" "}
          <a
            href="https://x.com/flornkm"
            target="_blank"
            className="text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            Florian Kiem
          </a>
        </p>
      </div>
    </main>
  );
}

export default App;
