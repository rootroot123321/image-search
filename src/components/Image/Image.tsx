import React from 'react';
import { observer } from 'mobx-react-lite';

import __variables from '@assets/scss/variables.scss';
import { ReactComponent as FavoriteSVG } from '@assets/svg/favorite.svg';
import { ReactComponent as DeleteSVG } from '@assets/svg/delete.svg';
import './Image.scss';

import imageState from '@store/images';
import { ImageInfo } from 'types/imageTypes';

interface ImageProps {
  image: ImageInfo;
  onClick(id: number): void;
}

export const Image = observer(({
  image,
  onClick,
}: ImageProps) => {
  const handleImageClick = (imageId: number) => {
    onClick(imageId);
  };

  const addToFavorite = (e: MouseEvent) => {
    e.stopPropagation();
    imageState.addFavoriteImage(image);
  };

  const deleteFromFavorite = (e: MouseEvent) => {
    e.stopPropagation();
    imageState.deleteFromFavorite(image.id);
  };

  return (
    <div
      className="image-wrapper"
      style={{
        backgroundImage: `url(${image.webformatURL})`,
        height: __variables.imageHeight,
        width: __variables.imageWidth,
      }}
      onClick={() => handleImageClick(image.id)}
    >
      {
        !imageState.favoriteImages.map((image) => image.id).includes(image.id)
          ? <FavoriteSVG width={40} height={40} onClick={addToFavorite} />
          : <DeleteSVG width={40} height={40} onClick={deleteFromFavorite} />
      }
    </div>
  );
});
