import { motion } from "motion/react";
import { cn } from "../utils/cn";
import type { Theme } from "../utils/theme";

function IconSun({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      aria-hidden
      className={className}
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M18.7 5.3l-1.4 1.4M6.7 17.3l-1.4 1.4" />
    </svg>
  );
}

function IconMoon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <path d="M20 14.2A8.2 8.2 0 0 1 9.8 4 8.2 8.2 0 1 0 20 14.2Z" />
    </svg>
  );
}

function IconSystem({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <rect x="2.75" y="4.25" width="18.5" height="12.5" rx="2.25" />
      <path d="M8.5 20.25h7" />
    </svg>
  );
}

const OPTIONS: { value: Theme; label: string; Icon: typeof IconSun }[] = [
  { value: "system", label: "System theme", Icon: IconSystem },
  { value: "light", label: "Light theme", Icon: IconSun },
  { value: "dark", label: "Dark theme", Icon: IconMoon },
];

export function ThemeToggle({
  theme,
  onChange,
}: {
  theme: Theme;
  onChange: (theme: Theme) => void;
}) {
  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className="flex shrink-0 items-center gap-0.5 rounded-full p-0.5 bg-neutral-100 dark:bg-neutral-900"
    >
      {OPTIONS.map(({ value, label, Icon }) => (
        <button
          key={value}
          role="radio"
          aria-checked={theme === value}
          aria-label={label}
          title={label}
          onClick={() => onChange(value)}
          className={cn(
            "relative grid size-7 cursor-pointer place-items-center rounded-full transition-colors",
            theme === value
              ? "text-neutral-900 dark:text-white"
              : "text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
          )}
        >
          {theme === value && (
            <motion.span
              layoutId="theme-toggle"
              className="absolute inset-0 rounded-full bg-white dark:bg-neutral-800 smooth-shadow-ring-xs"
              transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
            />
          )}
          <Icon className="relative z-10 size-3.5" />
        </button>
      ))}
    </div>
  );
}
