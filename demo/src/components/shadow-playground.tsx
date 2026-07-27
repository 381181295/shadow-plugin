import { motion } from "motion/react";
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { CodeField } from "./code-field";
import { cn } from "../utils/cn";
import type { ResolvedTheme } from "../utils/theme";

const SIZES = [
  { label: "XS", smooth: "smooth-shadow-xs", ring: "smooth-shadow-ring-xs", tailwind: "shadow-xs" },
  { label: "SM", smooth: "smooth-shadow-sm", ring: "smooth-shadow-ring-sm", tailwind: "shadow-sm" },
  { label: "Default", smooth: "smooth-shadow", ring: "smooth-shadow-ring", tailwind: "shadow" },
  { label: "LG", smooth: "smooth-shadow-lg", ring: "smooth-shadow-ring-lg", tailwind: "shadow-lg" },
  { label: "XL", smooth: "smooth-shadow-xl", ring: "smooth-shadow-ring-xl", tailwind: "shadow-xl" },
];

/* Same swatch set as the gradient-border plugin demo, so the two pages feel
   like one family. Every hex maps to a real Tailwind token, which is what the
   generated class string below the preview quotes. */
const SWATCHES: { hex: string; token: string }[] = [
  { hex: "#ffffff", token: "white" },
  { hex: "#d4d4d4", token: "neutral-300" },
  { hex: "#a3a3a3", token: "neutral-400" },
  { hex: "#525252", token: "neutral-600" },
  { hex: "#262626", token: "neutral-800" },
  { hex: "#000000", token: "black" },
  { hex: "#38bdf8", token: "sky-400" },
  { hex: "#60a5fa", token: "blue-400" },
  { hex: "#818cf8", token: "indigo-400" },
  { hex: "#a78bfa", token: "violet-400" },
  { hex: "#c084fc", token: "purple-400" },
  { hex: "#e879f9", token: "fuchsia-400" },
  { hex: "#f472b6", token: "pink-400" },
  { hex: "#fb7185", token: "rose-400" },
  { hex: "#f87171", token: "red-400" },
  { hex: "#fb923c", token: "orange-400" },
  { hex: "#fbbf24", token: "amber-400" },
  { hex: "#a3e635", token: "lime-400" },
  { hex: "#4ade80", token: "green-400" },
  { hex: "#34d399", token: "emerald-400" },
  { hex: "#22d3ee", token: "cyan-400" },
];

/* The hairline is 1px, so a tinted ring needs real alpha to read at all — but
   not so much that it turns back into the hard border the plugin exists to
   avoid. The generated class string quotes this same number. */
const RING_ALPHA = 30;
/* Tailwind's own shadows paint the color at full strength, so the comparison
   box mixes it down to roughly the `shadow-black/10` it ships with. */
const DEFAULT_SHADOW_ALPHA = 10;

type Target = "shadow" | "ring";
type Colors = Record<Target, string>;

const LIGHT_DEFAULTS: Colors = { shadow: "#000000", ring: "#d4d4d4" };
const DARK_DEFAULTS: Colors = { shadow: "#ffffff", ring: "#525252" };

function mix(hex: string, alpha: number) {
  return `color-mix(in srgb, ${hex} ${alpha}%, transparent)`;
}

function tokenFor(hex: string) {
  return SWATCHES.find((swatch) => swatch.hex === hex)?.token ?? `[${hex}]`;
}

function Pill({
  active,
  layoutId,
  onClick,
  disabled,
  children,
}: {
  active: boolean;
  layoutId: string;
  onClick: () => void;
  disabled?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "relative px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors",
        disabled
          ? "cursor-not-allowed text-neutral-300 dark:text-neutral-700"
          : active
            ? "cursor-pointer text-neutral-900 dark:text-white"
            : "cursor-pointer text-neutral-400 hover:text-neutral-500"
      )}
    >
      {active && (
        <motion.span
          layoutId={layoutId}
          className="absolute inset-0 bg-neutral-100 dark:bg-neutral-800 rounded-full"
          transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
}

export function ShadowPlayground({ theme }: { theme: ResolvedTheme }) {
  const [selected, setSelected] = useState(2);
  const [ring, setRing] = useState(true);
  const [target, setTarget] = useState<Target>("shadow");
  const [colors, setColors] = useState<Colors>(() =>
    theme === "dark" ? DARK_DEFAULTS : LIGHT_DEFAULTS
  );

  // A black shadow is invisible on black, so follow the theme back to sensible
  // defaults whenever it flips.
  useEffect(() => {
    setColors(theme === "dark" ? DARK_DEFAULTS : LIGHT_DEFAULTS);
  }, [theme]);

  // `smooth-ring-*` does nothing without a ring, so don't offer it as a target.
  const activeTarget: Target = ring ? target : "shadow";

  const size = SIZES[selected];
  const classString = [
    ring ? size.ring : size.smooth,
    `shadow-${tokenFor(colors.shadow)}`,
    ring ? `smooth-ring-${tokenFor(colors.ring)}/${RING_ALPHA}` : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="w-full space-y-5">
      <h2 className="font-medium leading-tight">Try it out</h2>
      <div className="p-8 rounded-md bg-neutral-50 dark:bg-neutral-900 space-y-6">
        <div className="flex items-center justify-center gap-8 sm:gap-16 px-4 sm:px-8 py-12 sm:py-16">
          <div className="flex flex-col items-center gap-3">
            <div
              className={cn(
                "size-24 sm:size-32 bg-white dark:bg-neutral-800 rounded-2xl transition-shadow duration-300",
                size.tailwind
              )}
              style={
                {
                  "--tw-shadow-color": mix(colors.shadow, DEFAULT_SHADOW_ALPHA),
                } as CSSProperties
              }
            />
            <span className="text-sm text-neutral-400">Default</span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div
              className={cn(
                "size-24 sm:size-32 bg-white dark:bg-neutral-800 rounded-2xl transition-shadow duration-300",
                ring ? size.ring : size.smooth
              )}
              style={
                {
                  "--tw-shadow-color": colors.shadow,
                  ...(ring ? { "--smooth-ring-color": mix(colors.ring, RING_ALPHA) } : {}),
                } as CSSProperties
              }
            />
            <span className="text-sm text-neutral-400">{ring ? "Smooth + ring" : "Smooth"}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-2">
          <div className="flex items-center gap-1">
            {SIZES.map((option, i) => (
              <Pill
                key={option.label}
                active={selected === i}
                layoutId="size-selector"
                onClick={() => setSelected(i)}
              >
                {option.label}
              </Pill>
            ))}
          </div>
          <span className="hidden sm:block w-px h-4 mx-1.5 bg-neutral-200 dark:bg-neutral-700" />
          <div className="flex items-center gap-1">
            {[
              { label: "Ring", value: true },
              { label: "No ring", value: false },
            ].map((option) => (
              <Pill
                key={option.label}
                active={ring === option.value}
                layoutId="ring-selector"
                onClick={() => setRing(option.value)}
              >
                {option.label}
              </Pill>
            ))}
          </div>
        </div>

        <div className="h-px bg-neutral-200/70 dark:bg-neutral-800" />

        {/* Color — the ring and the shadow tint independently, so pick a target first */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-500 dark:text-neutral-400">Color</span>
            <div className="flex items-center gap-1">
              {(["shadow", "ring"] as const).map((option) => (
                <Pill
                  key={option}
                  active={activeTarget === option}
                  layoutId="target-selector"
                  disabled={option === "ring" && !ring}
                  onClick={() => setTarget(option)}
                >
                  {option === "shadow" ? "Shadow" : "Ring"}
                </Pill>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-1">
            {SWATCHES.map(({ hex, token }) => (
              <motion.button
                key={hex}
                aria-label={`${activeTarget} ${token}`}
                onClick={() => setColors((prev) => ({ ...prev, [activeTarget]: hex }))}
                className={cn(
                  "size-5 rounded-full cursor-pointer border-[1.5px] transition-colors",
                  colors[activeTarget] === hex
                    ? "border-black/30 dark:border-white/50"
                    : "border-black/5 dark:border-white/15 hover:border-black/10 dark:hover:border-white/25"
                )}
                style={{ backgroundColor: hex }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 500, damping: 28 }}
              />
            ))}
          </div>
        </div>

        <CodeField code={`<div className="${classString}" />`} language="html" wrap />
      </div>
    </div>
  );
}
