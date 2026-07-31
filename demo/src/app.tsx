import { useState } from "react";
import { CodeField, CopyBlock } from "./components/code-field";
import { ShadowPlayground } from "./components/shadow-playground";
import { ThemeToggle } from "./components/theme-toggle";
import { cn } from "./utils/cn";
import { useTheme } from "./utils/theme";
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

const INSTALL_COMMANDS = [
  { label: "npm", command: "npm i shadow-plugin" },
  { label: "pnpm", command: "pnpm add shadow-plugin" },
  { label: "yarn", command: "yarn add shadow-plugin" },
  { label: "bun", command: "bun add shadow-plugin" },
];

function App() {
  const { theme, resolved, setTheme } = useTheme();
  const [pm, setPm] = useState(0);

  return (
    <main className="min-h-screen px-4 pt-4 pb-8 md:py-20">
      <div className="w-full max-w-3xl flex space-y-12 flex-col items-start mx-auto">
        <div className="w-full flex items-start justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-base font-medium">Smooth Shadow Plugin</h1>
            <p className="text-sm mb-1.5 text-neutral-400">
              A simple tailwind plugin that makes your shadows finally look good.
            </p>
          </div>
          <ThemeToggle theme={theme} onChange={setTheme} />
        </div>

        {/* Example */}
        <ShadowPlayground theme={resolved} />

        {/* Install */}
        <div className="w-full space-y-3">
          <h2 className="font-medium">Install</h2>
          <div className="flex items-center gap-3">
            {INSTALL_COMMANDS.map((p, i) => (
              <button
                key={p.label}
                onClick={() => setPm(i)}
                className={cn(
                  "text-sm cursor-pointer font-medium transition-colors",
                  pm === i
                    ? "text-neutral-900 dark:text-white"
                    : "text-neutral-400 hover:text-neutral-500"
                )}
              >
                {p.label}
              </button>
            ))}
          </div>
          <CodeField code={INSTALL_COMMANDS[pm].command} prefix="$" language="shell" />
        </div>

        {/* Usage */}
        <div className="w-full space-y-6">
          <h2 className="font-medium">Usage</h2>
          <div>
            <h3 className="text-sm mb-1.5 text-neutral-400">Tailwind stylesheet</h3>
            <CodeField code="@import 'shadow-plugin';" language="css" />
          </div>
          <div>
            <h3 className="text-sm mb-1.5 text-neutral-400">Element classes</h3>
            <CodeField code="<div className='smooth-shadow-md' />" language="html" />
          </div>
          <div>
            <h3 className="text-sm mb-1.5 text-neutral-400">
              Shadow + ring for elevated surfaces
            </h3>
            <CodeField code="<div className='smooth-shadow-ring-md' />" language="html" />
          </div>
          <div>
            <h3 className="text-sm mb-1.5 text-neutral-400">
              Adjust ring and shadow color independently
            </h3>
            <CodeField
              code="<div className='smooth-shadow-ring-md smooth-ring-blue-500/40 shadow-red-500' />"
              language="html"
            />
          </div>
          <div>
            <h3 className="text-sm mb-1.5 text-neutral-400">
              Optional: Replace all your default shadows
            </h3>
            <CodeField
              code={`@theme {\n  --shadow-xs: var(--smooth-shadow-xs);\n  --shadow-sm: var(--smooth-shadow-sm);\n  --shadow-md: var(--smooth-shadow-md);\n  --shadow-lg: var(--smooth-shadow-lg);\n  --shadow-xl: var(--smooth-shadow-xl);\n  --shadow-2xl: var(--smooth-shadow-2xl);\n}`}
              language="css"
            />
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-neutral-200 dark:bg-neutral-800" />

        {/* Agent skills */}
        <div className="w-full space-y-8">
          <div className="space-y-2">
            <h2 className="font-medium">Agent skills</h2>
            <p className="text-sm text-neutral-400">
              Drop these into your AI tools so they stop pairing a{" "}
              <code className="font-mono text-neutral-500 dark:text-neutral-400">border</code> with
              a <code className="font-mono text-neutral-500 dark:text-neutral-400">shadow</code>{" "}
              (the double edge) and reach for{" "}
              <code className="font-mono text-neutral-500 dark:text-neutral-400">
                smooth-shadow-ring
              </code>{" "}
              instead.
            </p>
          </div>
          <div>
            <h3 className="text-sm mb-1.5 text-neutral-900 dark:text-white">
              Claude / agent skill
            </h3>
            <CopyBlock
              filename=".claude/skills/smooth-shadow-ring/SKILL.md"
              content={skillContent}
            />
          </div>
          <div>
            <h3 className="text-sm mb-1.5 text-neutral-900 dark:text-white">
              Cursor Bugbot rule
            </h3>
            <CopyBlock filename="BUGBOT.md" content={bugbotContent} />
          </div>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-white dark:bg-neutral-800 px-3 py-1.5 text-xs font-medium text-neutral-900 dark:text-white smooth-shadow-ring-sm hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
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
            className="text-neutral-500 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            Nils Eller
          </a>
          ,{" "}
          <a
            href="https://x.com/eduardwieandt"
            target="_blank"
            className="text-neutral-500 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            Eduard Wieandt
          </a>
          , and{" "}
          <a
            href="https://x.com/flornkm"
            target="_blank"
            className="text-neutral-500 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            Florian Kiem
          </a>
          , in collaboration with{" "}
          <a
            href="https://rogo.ai/"
            target="_blank"
            rel="noreferrer"
            className="text-neutral-500 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            Rogo
          </a>
        </p>
      </div>
    </main>
  );
}

export default App;
