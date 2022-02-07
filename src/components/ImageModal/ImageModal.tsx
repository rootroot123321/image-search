import React, {
  Dispatch,
  ForwardedRef,
  SetStateAction,
} from 'react';

import { ReactComponent as CloseSVG } from '@assets/svg/cross.svg';
import './ImageModal.scss';

interface ImageModalProps {
  largeImage: string;
  setVisibility: Dispatch<SetStateAction<boolean>>;
}

const IMAGE_HEIGHT = 855;

export const ImageModal = React.forwardRef((
  { largeImage, setVisibility }: ImageModalProps,
  imageModalRef: ForwardedRef<HTMLDivElement>,
) => {
  const closeModal = () => {
    setVisibility(false);
  };

  return (
    <div className="image-modal">
      <div ref={imageModalRef} className="image-modal__dialog">
        <img src={largeImage} alt="" height={IMAGE_HEIGHT} />
        <CloseSVG className="image-modal__close" width={24} height={24} onClick={closeModal} />
      </div>
    </div>
  );
});
