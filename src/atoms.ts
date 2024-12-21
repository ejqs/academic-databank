import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

// The intial idea is to show the page status popup for all users then when disabled, time will restart until it is depleted to reveal the popup again.
export enum PopUpType {
  pageStatus,
}

export const userPopUps = atom([
  {
    name: PopUpType.pageStatus,
    time: atomWithStorage("timer", 30000),
    revealed: true,
  },
]);

// TODO: make this 
export const pageStatusPopUp = atomWithStorage("show", true);
