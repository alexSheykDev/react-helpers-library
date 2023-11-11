import { RefObject } from 'react';
import useEventListener from './useEventListener';

type ClickOutsideCallback = (event: Event) => void;

const useClickOutside = (ref: RefObject<HTMLElement>, cb: ClickOutsideCallback): void => {
  const handleClickOutside = (e: Event): void => {
    if (ref.current == null || !ref.current.contains(e.target as Node)) {
      cb(e);
    }
  };

  useEventListener('click', handleClickOutside, document);
};

export default useClickOutside;