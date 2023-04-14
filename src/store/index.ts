import { configureStore, combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleWare from 'redux-saga';
import * as intl from '@store/models/intl';
import * as todos from '@store/models/todo';
import * as auth from '@store/models/auth';

const sagaMiddleWare = createSagaMiddleWare();
const reducer = combineReducers({
  intl: intl.intlSlice.reducer,
  todos: todos.todoReducers,
  auth: auth.authReducer
});

export const store = configureStore({
  reducer,
  devTools: true,
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware({ thunk: false }), sagaMiddleWare]
});

const watcherSagaList = [todos.watcherSaga, auth.watcherSaga];
watcherSagaList.forEach((watcherSaga) => sagaMiddleWare.run(watcherSaga));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
