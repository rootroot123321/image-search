import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { ReactComponent as SadSVG } from '@assets/svg/sad.svg';
import './HomePage.scss';

import imageState from '@store/images';
import { Search } from '@components/Search/Search';
import { ImageList } from '@components/ImageList/ImageList';
import { useIntersectionObserver } from '@hooks/useIntersectionObserver';
import { useQuery } from '@hooks/useQuery';

export const HomePage = observer(() => {
  const intersectionElementRef = useRef<HTMLDivElement>(document.createElement('div'));

  const query = useQuery();

  const urlSearchQuery = query.get('q');

  const [searchStarted, setSearchStarted] = useState<boolean>(query.get('q')?.trim() !== '' && query.get('q') != null);

  const entry = useIntersectionObserver(intersectionElementRef, {});

  const isVisible = !!entry?.isIntersecting;

  useEffect(() => {
    if (urlSearchQuery) {
      imageState.setSearchQuery(urlSearchQuery);
    }
  }, []);

  useEffect(() => {
    if (!urlSearchQuery) {
      setSearchStarted(false);
    }
  }, [urlSearchQuery]);

  useEffect(() => {
    if (urlSearchQuery) {
      imageState.setPage(1);
      imageState.loadImages(urlSearchQuery);
      setSearchStarted(true);
    } else {
      imageState.clearImages();
    }
  }, [urlSearchQuery]);

  useEffect(() => {
    if (isVisible && imageState.imagesLoaded && urlSearchQuery) {
      imageState.loadMoreImages(urlSearchQuery ?? '');
    }
  }, [isVisible]);

  return (
    <main className="container">
      <Search
        searchStarted={searchStarted}
        setSearchStarted={setSearchStarted}
      />
      {imageState.images.length || !urlSearchQuery || !searchStarted
        ? <ImageList type="search" />
        : (
          <div className="warning-wrapper">
            <div className="warning">
              <SadSVG width={40} height={40} />
              <span>No results found!</span>
            </div>
          </div>
        )}
      <div ref={intersectionElementRef} />
    </main>
  );
});
