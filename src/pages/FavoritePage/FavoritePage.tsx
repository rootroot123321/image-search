import React from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';

import './FavoritePage.scss';
import { ReactComponent as SadSVG } from '@assets/svg/sad.svg';
import { ReactComponent as BackSVG } from '@assets/svg/left_arrow.svg';

import imageState from '@store/images';
import { ImageList } from '@components/ImageList/ImageList';

export const FavoritePage = observer(() => (
  <main className="favorite-container">
    <header>
      <Link to={`/?q=${imageState.searchQuery}`}>
        <BackSVG width={40} height={40} />
      </Link>
      <h1>Your favorite images</h1>
    </header>
    {
      imageState.favoriteImages.length
        ? <ImageList type="favorite" />
        : (
          <div className="warning">
            <SadSVG width={40} height={40} />
            <span>You do not have any favorite images!</span>
          </div>
        )
    }
  </main>
));
