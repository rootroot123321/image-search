import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
} from 'react';

export const useOutsideClick = (
  ref: RefObject<HTMLElement>,
  setVisibility: Dispatch<SetStateAction<boolean>>,
): void => {
  const handleOutsideClick = (event: MouseEvent): void => {
    if (ref.current && !ref.current.contains(<Node>(event.target))) {
      setVisibility?.(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);
};
