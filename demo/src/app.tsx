import { cn } from "./utils/cn";

const EXAMPLES: Array<{ label: string; smooth: string; tailwind: string }> = [
  { label: "xs", smooth: "smooth-shadow-xs", tailwind: "shadow-xs" },
  { label: "sm", smooth: "smooth-shadow-sm", tailwind: "shadow-sm" },
  { label: "md", smooth: "smooth-shadow-md", tailwind: "shadow-md" },
  { label: "-", smooth: "smooth-shadow", tailwind: "shadow" },
  { label: "lg", smooth: "smooth-shadow-lg", tailwind: "shadow-lg" },
  { label: "xl", smooth: "smooth-shadow-xl", tailwind: "shadow-xl" },
];

function App() {
  return (
    <main className="min-h-screen px-4 pt-4">
      <div className="w-full max-w-3xl flex space-y-8 flex-col items-start mx-auto">
        <div className="flex flex-col items-start">
          <h1 className="mb-1.5 text-lg font-semibold leading-tight">Smooth Shadow Plugin</h1>
          <p className="mb-6 max-w-lg">
            A TailwindCSS add-on that provides soft, multi-layered shadows that match Tailwind's
            shadow scale. Free and open-source.
          </p>
          <div className="gap-1.5 text-balance w-auto max-w-lg flex items-center justify-center">
            <div className="flex items-center gap-1 w-fit">
              <a
                target="_blank"
                href="https://github.com/flornkm/shadow-plugin"
                className={cn(
                  "text-neutral-900 hover:text-black rounded-sm font-medium bg-neutral-100 hover:bg-neutral-200 transition-all px-2.5 py-1 h-7 flex items-center",
                  "dark:text-white dark:hover:text-white dark:bg-neutral-800 dark:hover:bg-neutral-700"
                )}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="size-4 inline-block mr-2"
                >
                  <path
                    d="M12 1.95068C17.525 1.95068 22 6.42568 22 11.9507C21.9995 14.0459 21.3419 16.0883 20.1198 17.7902C18.8977 19.4922 17.1727 20.768 15.1875 21.4382C14.6875 21.5382 14.5 21.2257 14.5 20.9632C14.5 20.6257 14.5125 19.5507 14.5125 18.2132C14.5125 17.2757 14.2 16.6757 13.8375 16.3632C16.0625 16.1132 18.4 15.2632 18.4 11.4257C18.4 10.3257 18.0125 9.43818 17.375 8.73818C17.475 8.48818 17.825 7.46318 17.275 6.08818C17.275 6.08818 16.4375 5.81318 14.525 7.11318C13.725 6.88818 12.875 6.77568 12.025 6.77568C11.175 6.77568 10.325 6.88818 9.525 7.11318C7.6125 5.82568 6.775 6.08818 6.775 6.08818C6.225 7.46318 6.575 8.48818 6.675 8.73818C6.0375 9.43818 5.65 10.3382 5.65 11.4257C5.65 15.2507 7.975 16.1132 10.2 16.3632C9.9125 16.6132 9.65 17.0507 9.5625 17.7007C8.9875 17.9632 7.55 18.3882 6.65 16.8757C6.4625 16.5757 5.9 15.8382 5.1125 15.8507C4.275 15.8632 4.775 16.3257 5.125 16.5132C5.55 16.7507 6.0375 17.6382 6.15 17.9257C6.35 18.4882 7 19.5632 9.5125 19.1007C9.5125 19.9382 9.525 20.7257 9.525 20.9632C9.525 21.2257 9.3375 21.5257 8.8375 21.4382C6.8458 20.7752 5.11342 19.502 3.88611 17.799C2.65881 16.096 1.9989 14.0498 2 11.9507C2 6.42568 6.475 1.95068 12 1.95068Z"
                    fill="currentColor"
                  />
                </svg>
                <span className="hidden md:inline mr-1">Star it on</span> GitHub
              </a>
              <a
                target="_blank"
                href="https://twitter.com/flornkm"
                className={cn(
                  "text-neutral-700 hover:text-black rounded-sm font-medium bg-neutral-100 hover:bg-neutral-200 transition-all px-2.5 py-1 h-7 flex items-center gap-2",
                  "dark:text-white dark:hover:text-white dark:bg-neutral-800 dark:hover:bg-neutral-700"
                )}
              >
                <svg
                  className="size-4 inline-block"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M17.5652 3.25H20.5319L14.0505 10.6628L21.6753 20.75H15.7052L11.0291 14.6322L5.67867 20.75H2.71017L9.64264 12.8212L2.32812 3.25H8.44986L12.6766 8.84192L17.5652 3.25ZM16.524 18.9731H18.1679L7.55662 4.93359H5.79256L16.524 18.9731Z"
                    fill="currentColor"
                  />
                </svg>
                X (Twitter)
              </a>
            </div>
            <div className="shrink-0 w-px h-5 bg-neutral-200 dark:bg-neutral-800" />
            <a
              target="_blank"
              href="https://www.npmjs.com/package/shadow-plugin"
              className={cn(
                "text-white hover:text-white rounded-sm font-medium bg-black hover:bg-neutral-700 transition-all px-2.5 py-1 h-7 flex items-center gap-2",
                "dark:text-black dark:hover:text-black dark:bg-white dark:hover:bg-neutral-200"
              )}
            >
              Download
            </a>
          </div>
        </div>
        <div className="w-full space-y-3">
          <h2 className="font-semibold leading-tight">How to use</h2>
          <div>
            <h2 className="text-sm mb-1.5 leading-tight text-neutral-500">Tailwind stylesheet</h2>
            <pre className="w-full p-4 tabular-nums bg-neutral-50 dark:bg-neutral-950 whitespace-pre-wrap break-words">
              {"@import 'shadow-plugin';"}
            </pre>
          </div>
          <div>
            <h2 className="text-sm mb-1.5 leading-tight text-neutral-500">Element classes</h2>
            <pre className="w-full p-4 tabular-nums bg-neutral-50 dark:bg-neutral-950 whitespace-pre-wrap break-words">
              {"<div className='smooth-shadow-md shadow-black/50' />"}
            </pre>
          </div>
        </div>
        <div className="w-full pb-8">
          <div className="flex w-full justify-between items-center">
            <h2 className="font-semibold mb-1.5 leading-tight">Example</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs w-24 leading-tight text-neutral-500">Smooth</p>
              </div>
              <div>
                <p className="text-xs w-24 leading-tight text-neutral-500">Default</p>
              </div>
            </div>
          </div>
          <div className="mb-8">
            {EXAMPLES.map(({ label, smooth, tailwind }, index) => {
              const isLast = index === EXAMPLES.length - 1;
              return (
                <>
                  <div
                    key={label}
                    className={cn(
                      "flex w-full justify-between items-center py-4 px-5",
                      !isLast && "overflow-hidden"
                    )}
                  >
                    <h3 className="text-sm leading-tight text-neutral-500">{label}</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div
                          className={cn(
                            "h-8 w-24 bg-white border border-neutral-200 shadow-black/50",
                            smooth
                          )}
                        />
                      </div>
                      <div>
                        <div
                          className={cn(
                            "h-8 w-24 bg-white border border-neutral-200 shadow-black/10",
                            tailwind
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  {!isLast && <hr className="w-full h-px text-neutral-200 shrink-0" />}
                </>
              );
            })}
          </div>
          <div className="w-full min-h-[512px] bg-neutral-100 relative">
            <div className="absolute w-96 h-72 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white smooth-shadow-md shadow-black/50 rounded-lg" />
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
