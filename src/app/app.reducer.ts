import { ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/ui.reducer';
import * as auth from './auth/auth.reducer';
import { uiReducer } from './shared/ui.reducer';

import { State, authReducer } from './auth/auth.reducer';


export interface AppState {
  ui: ui.State;
  user: auth.State;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: uiReducer,
  user: authReducer
}