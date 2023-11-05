import { configureStore, combineReducers } from '@reduxjs/toolkit';
import useReducer from './userSlice';
import videoReducer from './videoSlice';
import {
  persistStore,
  persistReducer,
  PAUSE,
  FLUSH,
  REHYDRATE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const PersistConfig = {
  key: 'root',
  version: 1,
  storage,
};
const rootReducer = combineReducers({ user: useReducer, video: videoReducer });
const persistedReducer = persistReducer(PersistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
