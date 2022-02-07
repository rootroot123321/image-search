import { Dispatch, FormEvent, SetStateAction } from 'react';

import imageState from '@store/images';
import { useLocation, useNavigate } from 'react-router-dom';

export const useSearch = (
  setSearchStarted: Dispatch<SetStateAction<boolean>>,
) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearchInput = (e: FormEvent<HTMLInputElement>) => {
    imageState.setSearchQuery((e.target as HTMLInputElement).value ?? '');
  };

  const handleSearchClick = () => {
    if (imageState.searchQuery.trim()) {
      imageState.setPage(1);
      imageState.loadImages(imageState.searchQuery);
      setSearchStarted(true);
      navigate(`${location.pathname}?q=${imageState.searchQuery}`);
    }
  };

  const handleEnterPress = ({ key }: { key: string }) => {
    if (key === 'Enter') {
      handleSearchClick();
    }
  };

  return {
    handleSearchInput,
    handleSearchClick,
    handleEnterPress,
  };
};
