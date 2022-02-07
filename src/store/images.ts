import { makeAutoObservable } from 'mobx';
import axios from 'axios';

import { ImageInfo } from 'types/imageTypes';

interface ImageStore {
  images: ImageInfo[];
  imagesLoaded: boolean;
  favoriteImages: ImageInfo[];
  page: number;
  limit: number;
  totalPages: number;
  searchQuery: string;
  setImages(images: ImageInfo[]): void;
  setImagesLoaded(imagesLoaded: boolean): void;
  setPage(page: number): void;
  setTotalPages(totalPages: number): void;
  setSearchQuery(searchQuery: string): void;
  addFavoriteImage(image: ImageInfo): void;
  deleteFromFavorite(imageId: number): void;
  fetchImages(searchQuery: string): void;
  loadImages(searchQuery: string): void;
  loadMoreImages(searchQuery: string): void;
  clearImages(): void;
  load(): void;
  save(json: ImageInfo[]): void;
}

class Image implements ImageStore {
  images: ImageInfo[] = [];

  imagesLoaded: boolean = false;

  favoriteImages: ImageInfo[] = [];

  page: number = 1;

  limit: number = 20;

  totalPages: number = 0;

  searchQuery: string = '';

  constructor() {
    this.load();
    makeAutoObservable(this);
  }

  async fetchImages(searchQuery: string) {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: '25545046-a0e6b8a680cf7613f11eca378',
        q: searchQuery,
        page: this.page,
        limit: this.limit,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.setTotalPages(Math.ceil(response.data.total / this.limit));

    return response;
  }

  setPage(page: number) {
    this.page = page;
  }

  async loadImages(searchQuery: string) {
    try {
      this.setImagesLoaded(false);
      const response = await this.fetchImages(searchQuery);
      this.setImages(response.data.hits.map(({ id, largeImageURL, webformatURL }: ImageInfo) => ({
        id, largeImageURL, webformatURL,
      })));
    } finally {
      this.setImagesLoaded(true);
    }
  }

  async loadMoreImages(searchQuery: string) {
    this.setPage(this.page + 1);
    const response = await this.fetchImages(searchQuery);
    this.setImages([
      ...this.images,
      ...response.data.hits.map(
        ({ id, largeImageURL, webformatURL }: ImageInfo) => ({ id, largeImageURL, webformatURL }),
      ),
    ]);
    await this.fetchImages(searchQuery);
  }

  setImages(images: ImageInfo[]): void {
    this.images = images;
  }

  clearImages(): void {
    this.images = [];
  }

  setImagesLoaded(imagesLoaded: boolean) {
    this.imagesLoaded = imagesLoaded;
  }

  addFavoriteImage(image: ImageInfo) {
    this.favoriteImages.push(image);
  }

  deleteFromFavorite(imageId: number) {
    this.favoriteImages = this.favoriteImages.filter((image) => image.id !== imageId);
  }

  setTotalPages(totalPages: number) {
    this.totalPages = totalPages;
  }

  setSearchQuery(searchQuery: string) {
    this.searchQuery = searchQuery;
  }

  load() {
    if (localStorage.getItem('favoriteImages')) {
      this.favoriteImages = JSON.parse(localStorage.getItem('favoriteImages') ?? '[]');
    }
  }

  save(json: ImageInfo[]) {
    localStorage.setItem('favoriteImages', JSON.stringify(json));
  }
}

export default new Image();
