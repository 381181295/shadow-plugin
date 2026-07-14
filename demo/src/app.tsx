import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { cn } from "./utils/cn";

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
