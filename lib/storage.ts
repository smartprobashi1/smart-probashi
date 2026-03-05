type StorageLike = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;

const isBrowser = typeof window !== 'undefined';

const noopStorage: StorageLike = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

export const safeStorage: StorageLike = isBrowser ? window.localStorage : noopStorage;

export const STORAGE_KEYS = {
  FINANCE_STATE: 'smart-probashi-finance',
  THEME: 'smart-probashi-theme',
} as const;

