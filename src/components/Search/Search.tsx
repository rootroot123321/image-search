import React, {
  Dispatch,
  FC,
  SetStateAction,
} from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import './Search.scss';

import imageState from '@store/images';
import { FAVORITE_ROUTE } from '@routes/routes';
import { useSearch } from '@hooks/useSearch';

interface SearchProps {
  readonly searchStarted: boolean;
  readonly setSearchStarted: Dispatch<SetStateAction<boolean>>;
}

export const Search: FC<SearchProps> = observer(({
  searchStarted,
  setSearchStarted,
}) => {
  const {
    handleSearchInput,
    handleSearchClick,
    handleEnterPress,
  } = useSearch(setSearchStarted);

  return (
    <section
      className="search"
      style={{
        height: searchStarted ? '20vh' : '100vh',
      }}
    >
      <div className="search__panel">
        <label htmlFor="search-field" />
        <input
          type="search"
          id="search-field"
          placeholder="What images would you like to see on Pixabay?"
          value={imageState.searchQuery}
          onInput={handleSearchInput}
          onKeyPress={handleEnterPress}
        />
        <button
          type="button"
          disabled={!imageState.imagesLoaded && searchStarted}
          onClick={handleSearchClick}
        >
          {imageState.imagesLoaded || !searchStarted ? 'Search' : 'Searching'}
        </button>
        <Link to={FAVORITE_ROUTE}>
          <button type="button">
            Manage Favorites
          </button>
        </Link>
      </div>
    </section>
  );
});
