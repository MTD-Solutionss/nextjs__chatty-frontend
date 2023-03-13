import { createReducer } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { createModuleAction, createSagaHandler } from '@utils/reduxTools';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import { authService } from '@services/api/auth/auth.service';

interface RegisterState {
  loading: boolean;
  errorMessage: string;
  alertType: string;
  hasError: boolean;
}

// export type SearchResult = any;

console.log('store/model/register.ts outside');
///
const moduleName = 'Register';
export const registerActions = createModuleAction(moduleName, 'registerAccount');
///init state

const initialState: RegisterState = {
  loading: false,
  errorMessage: '',
  alertType: '',
  hasError: false
};

// ///reducer
export const registerReducer = createReducer(initialState, (builder) => {
  builder.addCase(registerActions.request, (state, action) => {
    state.loading = true;
  });
  builder.addCase(registerActions.success, (state, action) => {
    state.loading = false;
  });
  builder.addCase(registerActions.error, (state, action) => {
    state.loading = false;
  });
});

//// saga handler
const registerSagaHandler = createSagaHandler(function* ({
  type,
  payload
}: {
  type: string;
  payload: any;
}): any {
  const body = payload;
  try {
    const registerResult = yield call(authService.signUp, body);
    yield put(registerActions.success({ registerResult }));
  } catch (error) {
    console.error(error);
    yield put(registerActions.error(error));
  }
});

/// watcher saga
export const watcherSaga = function* () {
  yield takeLatest(registerActions.request.type, registerSagaHandler);
};

export const useStates = () => {
  const { loading, errorMessage, alertType, hasError } = useAppSelector((state) => state.register);
  return { loading, errorMessage, alertType, hasError };
};

export const useActions = () => {
  const dispatch = useAppDispatch();
  const register = (body: any): void => {
    dispatch(registerActions.request(body));
  };
  return { register };
};
