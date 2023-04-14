import { createReducer } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { createModuleAction, createSagaHandler } from '@utils/reduxTools';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import { authService } from '@services/api/auth/auth.service';
import { RegisterFormFull, Status } from '@custom-types/index';

interface RegisterState {
  status: Status;
  error: {
    errorMessage: string;
  } | null;
  data: {} | null;
}

console.log('store/model/register.ts outside');
///
const moduleName = 'Register';
export const registerActions = createModuleAction(moduleName, 'registerAccount');
///init state

const initialState: RegisterState = {
  status: Status.INITIAL,
  error: null,
  data: null
};

// ///reducer
export const registerReducer = createReducer(initialState, (builder) => {
  builder.addCase(registerActions.request, (state, action) => {
    state.status = Status.LOADING;
    state.error = null;
    state.data = null;
  });
  builder.addCase(registerActions.success, (state, action) => {
    state.status = Status.SUCCESS;
    state.error = null;
    state.data = action.payload;
  });
  builder.addCase(registerActions.error, (state, action) => {
    state.status = Status.ERROR;
    state.data = null;
  });
});

//// saga handler
const registerSagaHandler = createSagaHandler(function* ({
  type,
  payload
}: {
  type: string;
  payload: RegisterFormFull;
}): any {
  const body = payload;
  try {
    const registerResult = yield call(authService.signUp, body);
    yield put(registerActions.success(registerResult));
  } catch (error: any) {
    console.error(error);
    yield put(registerActions.error(error));
  }
});

/// watcher saga
export const watcherSaga = function* () {
  yield takeLatest(registerActions.request.type, registerSagaHandler);
};

export const useStates = () => {
  const { status, error, data } = useAppSelector((state) => state.register);
  return { status, error, data };
};

export const useActions = () => {
  const dispatch = useAppDispatch();
  const register = (body: RegisterFormFull): void => {
    dispatch(registerActions.request(body));
  };
  return { register };
};
