"use client";

import { usePathname } from "next/navigation";

// Status that only shows on root page /
export function PageStatus() {
  const pathname = usePathname();

  return (
    <>
      {/* TODO: State management so that this can be clicked to hide, and some mechanism of showing every x times */}
      {pathname === "/" ? (
        <div className="tw-absolute tw-ml-auto tw-mr-auto tw-left-0 tw-right-0 tw-bg-accent tw-w-fit tw-h-5 tw-p-10 tw-flex tw-items-center tw-rounded-xl tw-py-4 fake-glow-accent hover:-tw-translate-y-3 tw-transition-all tw-duration-500">
          🚧 Site is Currently Under Construction 🚧
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
