import { createAction, props } from '@ngrx/store';
import { IncomeExpense } from '../models/income-expense.model';

export const unSetItems = createAction('[INCOME EXPENSE] Unset Items');
export const setItems = createAction(
  '[INCOME EXPENSE] Set Items',
  props<{ items: IncomeExpense[] }>()
  );