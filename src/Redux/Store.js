import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { persistStore } from 'redux-persist';
import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from './Slice/userSlice';
import partnerReducer from './Slice/partnerSlice';
import adminReducer from './Slice/adminSlice';

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false
});

const persistConfig = { key: "root", storage, version: 1 };
const reducer = combineReducers({
  userReducer,
  partnerReducer,
  adminReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: customizedMiddleware, // Use customizedMiddleware directly
});

const persistor = persistStore(store);

export { store, persistor };
