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

/* The gradient-border plugin demo's palette, same swatches in the same order,
   so the two pages feel like one family. Every hex maps to a real Tailwind
   token, which is what the generated class string below the preview quotes. */
const SWATCHES: { hex: string; token: string }[] = [
  { hex: "#ffffff", token: "white" },
  { hex: "#fafafa", token: "neutral-50" },
  { hex: "#d4d4d4", token: "neutral-300" },
  { hex: "#a3a3a3", token: "neutral-400" },
  { hex: "#525252", token: "neutral-600" },
  { hex: "#404040", token: "neutral-700" },
  { hex: "#262626", token: "neutral-800" },
  { hex: "#171717", token: "neutral-900" },
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

/* The shadow stays black in both themes — that's the plugin's own default, and
   a white shadow on a dark ground reads as a glow around the box rather than a
   shadow under it. Only the ring flips, since a black hairline disappears
   there. Until the shadow is actually tinted we set no color at all, so both
   previews render exactly what the page shipped with. */
const DEFAULT_SHADOW = "#000000";
const LIGHT_DEFAULTS: Colors = { shadow: DEFAULT_SHADOW, ring: "#d4d4d4" };
const DARK_DEFAULTS: Colors = { shadow: DEFAULT_SHADOW, ring: "#525252" };

function mix(hex: string, alpha: number) {
  return `color-mix(in srgb, ${hex} ${alpha}%, transparent)`;
}

function tokenFor(hex: string) {
  return SWATCHES.find((swatch) => swatch.hex === hex)?.token ?? `[${hex}]`;
}

/* A real segmented control rather than a row of text buttons: a sunken track
   with one raised thumb that slides between options. The thumb is a
   smooth-shadow-ring-xs, so the page is wearing the thing it sells. */
function Segmented({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-0.5 rounded-full p-0.5 bg-neutral-100 dark:bg-neutral-800">
      {children}
    </div>
  );
}

function Segment({
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
        "relative rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap transition-colors",
        disabled
          ? "cursor-not-allowed text-neutral-300 dark:text-neutral-600"
          : active
            ? "cursor-pointer text-neutral-900 dark:text-white"
            : "cursor-pointer text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200"
      )}
    >
      {active && (
        <motion.span
          layoutId={layoutId}
          className="absolute inset-0 rounded-full bg-white dark:bg-neutral-700 smooth-shadow-ring-xs"
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

  // A black hairline is invisible on black, so follow the theme back to
  // sensible defaults whenever it flips.
  useEffect(() => {
    setColors(theme === "dark" ? DARK_DEFAULTS : LIGHT_DEFAULTS);
  }, [theme]);

  // `smooth-ring-*` does nothing without a ring, so don't offer it as a target.
  const activeTarget: Target = ring ? target : "shadow";
  const shadowTinted = colors.shadow !== DEFAULT_SHADOW;

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
      <div className="p-2 rounded-xl bg-neutral-50 dark:bg-neutral-900 space-y-6">
        {/* The stage is its own surface, raised off the card, so the demo sits
            on something rather than floating in the same flat box as the
            controls. */}
        <div className="flex items-center justify-center gap-8 sm:gap-16 rounded-lg bg-white dark:bg-neutral-950 px-4 sm:px-8 py-12 sm:py-16 smooth-shadow-ring-xs">
          <div className="flex flex-col items-center gap-3">
            <div
              className={cn(
                "size-24 sm:size-32 bg-white dark:bg-neutral-800 rounded-2xl shadow-black/10 dark:shadow-white/10 transition-shadow duration-300",
                size.tailwind
              )}
              style={
                shadowTinted
                  ? ({
                      "--tw-shadow-color": mix(colors.shadow, DEFAULT_SHADOW_ALPHA),
                    } as CSSProperties)
                  : undefined
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
                  ...(shadowTinted ? { "--tw-shadow-color": colors.shadow } : {}),
                  ...(ring ? { "--smooth-ring-color": mix(colors.ring, RING_ALPHA) } : {}),
                } as CSSProperties
              }
            />
            <span className="text-sm text-neutral-400">{ring ? "Smooth + ring" : "Smooth"}</span>
          </div>
        </div>

        {/* Controls sit centered under the preview, in two groups: what the
            shadow is, then what color it is. No labels — the options say it. */}
        <div className="space-y-5 px-4 pb-4">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Segmented>
              {SIZES.map((option, i) => (
                <Segment
                  key={option.label}
                  active={selected === i}
                  layoutId="size-selector"
                  onClick={() => setSelected(i)}
                >
                  {option.label}
                </Segment>
              ))}
            </Segmented>
            <Segmented>
              {[
                { label: "Ring", value: true },
                { label: "No ring", value: false },
              ].map((option) => (
                <Segment
                  key={option.label}
                  active={ring === option.value}
                  layoutId="ring-selector"
                  onClick={() => setRing(option.value)}
                >
                  {option.label}
                </Segment>
              ))}
            </Segmented>
          </div>

          {/* A plain select next to the swatches: it names what they tint and
              stays out of the way, where a second segmented control needed a
              track of its own to hold itself together. */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <select
              aria-label="Color target"
              value={activeTarget}
              onChange={(event) => setTarget(event.target.value as Target)}
              disabled={!ring}
              className="cursor-pointer bg-transparent text-xs font-medium text-neutral-900 dark:text-white disabled:cursor-not-allowed disabled:text-neutral-400"
            >
              <option value="shadow">Shadow</option>
              <option value="ring">Ring</option>
            </select>

            <div className="flex flex-wrap items-center gap-1">
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
        </div>

        <CodeField code={`<div className="${classString}" />`} wrap plain />
      </div>
    </div>
  );
}
