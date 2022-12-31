import { configureStore, combineReducers } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import rootReducer from './reducers.js'

const persistConfig = {
  version: 1,
  key: 'root',
  storage,
}

const reducer = combineReducers({
  root: rootReducer,
})

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})
 
