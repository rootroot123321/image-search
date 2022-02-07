import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { autorun, toJS } from 'mobx';

import imageState from '@store/images';
import { HOME_ROUTE, FAVORITE_ROUTE } from '@routes/routes';
import { HomePage } from '@pages/HomePage/HomePage';
import { FavoritePage } from '@pages/FavoritePage/FavoritePage';

export const App = () => {
  useEffect(() => {
    let firstRun = true;
    autorun(() => {
      const json = toJS(imageState.favoriteImages);
      if (!firstRun) {
        imageState.save(json);
      }
      firstRun = false;
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={HOME_ROUTE} element={<HomePage />} />
        <Route path={FAVORITE_ROUTE} element={<FavoritePage />} />
      </Routes>
    </BrowserRouter>
  );
};
