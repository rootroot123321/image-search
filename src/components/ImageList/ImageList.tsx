import React, { useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useLocation } from 'react-router-dom';

import './ImageList.scss';

import { FAVORITE_ROUTE } from '@routes/routes';
import imageState from '@store/images';
import { ImageInfo } from 'types/imageTypes';
import { useModal } from '@hooks/useModal';
import { useOutsideClick } from '@hooks/useOutsideClick';
import { useQuery } from '@hooks/useQuery';
import { ImageModal } from '@components/ImageModal/ImageModal';
import { Image } from '@components/Image/Image';

export const ImageList = observer(({ type }: { type: 'favorite' | 'search' }) => {
  const [modalImage, setImageModal] = useState<ImageInfo | null>(null);

  const query = useQuery();

  const searchQuery = query.get('q');

  const location = useLocation();

  const imageModalRef = useRef(null);

  const {
    isVisibleModal,
    setVisibility,
  } = useModal(false);

  useOutsideClick(imageModalRef, setVisibility);

  const handleImageClick = (id: number) => {
    setVisibility(true);
    setImageModal(type === 'search'
      ? imageState.images.find((hit: ImageInfo) => hit.id === id) || null
      : imageState.favoriteImages.find((hit: ImageInfo) => hit.id === id) || null);
  };

  return (
    <section
      className="image-list"
      style={{
        padding: searchQuery || location.pathname === FAVORITE_ROUTE ? '50px 100px' : '0',
      }}
    >
      {type === 'search' ? imageState.images.map((image) => (
        <Image
          key={image.id}
          image={image}
          onClick={handleImageClick}
        />
      )) : imageState.favoriteImages.map((favoriteImage) => (
        <Image
          key={favoriteImage.id}
          image={favoriteImage}
          onClick={handleImageClick}
        />
      ))}
      {isVisibleModal
        && (
        <ImageModal
          ref={imageModalRef}
          largeImage={modalImage?.largeImageURL ?? ''}
          setVisibility={setVisibility}
        />
        )}
    </section>
  );
});
