import { createReducer, on } from '@ngrx/store';
import { unSetItems, setItems } from './income-expense.actions';
import { IncomeExpense } from '../models/income-expense.model';
import { AppState } from '../app.reducer';

export interface State {
  items: IncomeExpense[]
}

export interface AppStateIncomeExpense extends AppState {
  incomeExpense: State

}

export const initialState: State = {
  items: [],
}

const _incomeExpenseReducer = createReducer(initialState,

  on(setItems,
    (state, { items }) => ({ ...state, items: [...items] })

  ),
  on(unSetItems,
    (state) => ({ ...state, items: [] })

  ),

);

export function incomeExpenseReducer(state, action) {
  return _incomeExpenseReducer(state, action);
}