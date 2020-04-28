import { ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/ui.reducer';
import * as auth from './auth/auth.reducer';
import * as incomeExpense from './ingreso-egreso/income-expense.reducer'
import { uiReducer } from './shared/ui.reducer';

import { authReducer } from './auth/auth.reducer';
import { incomeExpenseReducer } from './ingreso-egreso/income-expense.reducer';


export interface AppState {
  ui: ui.State;
  user: auth.State;
  incomeExpense: incomeExpense.State
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: uiReducer,
  user: authReducer,
  incomeExpense: incomeExpenseReducer
}