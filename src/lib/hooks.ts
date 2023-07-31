import { useEffect, useState } from "react";

const isBrowser = !!(
  typeof window !== "undefined" &&
  window.document &&
  window.document.createElement
);

type Subscriber = () => void;

const subscribers = new Set<Subscriber>();

const responsiveConfig = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
} as const;
type ResponsiveConfig = typeof responsiveConfig;
type ResponsiveBreakpoint = keyof ResponsiveConfig;
type ResponsiveInfo = Record<ResponsiveBreakpoint, boolean>;
let info: ResponsiveInfo;

function handleResize() {
  const oldInfo = info;
  calculate();
  if (oldInfo === info) return;
  for (const subscriber of subscribers) {
    subscriber();
  }
}

let listening = false;

function calculate() {
  const width = window.innerWidth;
  const newInfo = {} as ResponsiveInfo;
  let shouldUpdate = false;
  for (const _key of Object.keys(responsiveConfig)) {
    const key = _key as ResponsiveBreakpoint;
    newInfo[key] = width >= responsiveConfig[key];
    if (newInfo[key] !== info[key]) {
      shouldUpdate = true;
    }
  }
  if (shouldUpdate) {
    info = newInfo;
  }
}

export function useResponsive() {
  if (isBrowser && !listening) {
    info = {} as ResponsiveInfo;
    calculate();
    window.addEventListener("resize", handleResize);
    listening = true;
  }
  const [state, setState] = useState<ResponsiveInfo>(info);

  useEffect(() => {
    if (!isBrowser) return;

    // In React 18's StrictMode, useEffect perform twice, resize listener is remove, so handleResize is never perform.
    // https://github.com/alibaba/hooks/issues/1910
    if (!listening) {
      window.addEventListener("resize", handleResize);
    }

    const subscriber = () => {
      setState(info);
    };

    subscribers.add(subscriber);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        window.removeEventListener("resize", handleResize);
        listening = false;
      }
    };
  }, []);

  return state;
}
