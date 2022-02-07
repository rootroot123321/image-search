import { useState } from 'react';

export const useModal = (defaultVisibility: boolean) => {
  const [isOpen, setVisibility] = useState(defaultVisibility);

  return {
    isVisibleModal: isOpen,
    setVisibility,
    toggle: () => setVisibility(!isOpen),
  };
};
