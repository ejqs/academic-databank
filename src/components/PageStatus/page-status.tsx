"use client";

import { usePathname } from "next/navigation";
import { pageStatusPopUp } from "@/atoms";
import { useSetAtom } from "jotai";
import { Suspense, useEffect, useState } from "react";

// TODO: UX improvement for clicking the pagestatus
export function PageStatus() {
  const pathname = usePathname();

  const [show, setShow] = useState(false);
  const setShowPopUp = useSetAtom(pageStatusPopUp);
  const [animatePop, setAnimatePop] = useState("tw-scale-0");
  // const [lastTime, setLastTime] = useAtom(lastPopupTime);

  // Not sure if this is the most efficient way to do this, would suspend atomwithstorage if it had the support
  useEffect(() => {
    setShow(true);
    setTimeout(() => {
      setAnimatePop((prev) =>
        prev === "tw-scale-0" ? "tw-scale-100" : "tw-scale-0",
      );
    }, 300);
  }, [setShowPopUp]);

  const handleClickPopUp = () => {
    setShowPopUp((previous) => !previous);
    setAnimatePop((prev) =>
      prev == "tw-scale-0" ? "tw-scale-100" : "tw-scale-0",
    );
  };

  return show ? (
    <>
      {pathname === "/" ? (
        <>
          <div
            className={`tw-absolute tw-ml-auto tw-mr-auto tw-left-0 tw-right-0 tw-m-14 tw-bg-accent tw-w-fit tw-h-5 tw-p-10 tw-flex tw-items-center tw-rounded-xl tw-py-4 fake-glow-accent hover:-tw-translate-y-1 hover:tw-blur-xs hover:tw-scale-95 hover:tw-cursor-pointer tw-transition-all tw-duration-700 ${animatePop} `}
            onClick={handleClickPopUp}
          >
            🚧 Site is Currently Under Construction 🚧
          </div>
        </>
      ) : null}
    </>
  ) : (
    <></>
  );
}
