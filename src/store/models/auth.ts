import { createReducer } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { createModuleAction, createSagaHandler } from '@utils/reduxTools';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import { authService } from '@services/api/auth/auth.service';
import { RegisterFormRequest, LoginFormRequest, Status } from '@custom-types/index';

interface AuthState {
  status: Status;
  error: any | null;
  data: any | null;
}

console.log('store/model/auth.ts outside');
///
const moduleNameRegister = 'Register';
export const registerActions = createModuleAction(moduleNameRegister, 'registerAccount');
const moduleNameLogin = 'Login';
export const loginActions = createModuleAction(moduleNameLogin, 'loginUser');
///init state

const initialState: AuthState = {
  status: Status.INITIAL,
  error: null,
  data: null
};

// ///reducer
export const authReducer = createReducer(initialState, (builder) => {
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
    state.error = action.payload;
  });
  builder.addCase(loginActions.request, (state, action) => {
    state.status = Status.LOADING;
    state.error = null;
    state.data = null;
  });
  builder.addCase(loginActions.success, (state, action) => {
    state.status = Status.SUCCESS;
    state.error = null;
    state.data = action.payload;
  });
  builder.addCase(loginActions.error, (state, action) => {
    state.status = Status.ERROR;
    state.data = null;
    state.error = action.payload;
  });
});

//// saga handler
const registerSagaHandler = createSagaHandler(function* ({
  type,
  payload
}: {
  type: string;
  payload: RegisterFormRequest;
}): any {
  const body = payload;
  try {
    const { data: registerResult } = yield call(authService.signUp, body);
    const { token, user, message } = registerResult;
    yield put(registerActions.success({ token, user, message }));
  } catch (error: any) {
    console.error(error);
    const { message } = error.response.data;
    yield put(registerActions.error({ message }));
  }
});
const loginSagaHandler = createSagaHandler(function* ({
  type,
  payload
}: {
  type: string;
  payload: LoginFormRequest;
}): any {
  const body = payload;
  try {
    const { data: loginResult } = yield call(authService.signIn, body);
    const { token, user, message } = loginResult;
    yield put(loginActions.success({ token, user, message }));
  } catch (error: any) {
    console.error(error);
    const { message } = error.response.data;
    yield put(loginActions.error({ message }));
  }
});

/// watcher saga
export const watcherSaga = function* () {
  yield takeLatest(registerActions.request.type, registerSagaHandler);
  yield takeLatest(loginActions.request.type, loginSagaHandler);
};

export const useStates = () => {
  const { status, error, data } = useAppSelector((state) => state.auth);
  return { status, error, data };
};

export const useActions = () => {
  const dispatch = useAppDispatch();
  const register = (body: RegisterFormRequest): void => {
    dispatch(registerActions.request(body));
  };
  const login = (body: LoginFormRequest): void => {
    dispatch(loginActions.request(body));
  };
  return { register, login };
};
