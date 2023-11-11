import { useEffect, useRef } from 'react';

type EventCallback = (event: Event) => void;

const useEventListener = (
  eventType: string,
  callback: EventCallback,
  element: HTMLElement | Window | Document = window
): void => {
  const callbackRef = useRef<EventCallback>(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!element) return;

    const handler = (e: Event): void => callbackRef.current(e);

    element.addEventListener(eventType, handler);

    return () => {
      element.removeEventListener(eventType, handler);
    };
  }, [eventType, element]);
};

export default useEventListener;




