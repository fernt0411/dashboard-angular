import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

import { AppState } from '../app.reducer';
import * as uiActions from '../shared/ui.actions';


import { IncomeExpenseService } from '../services/income-expense.service';
import { IncomeExpense } from '../models/income-expense.model';
import Swal from 'sweetalert2'
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  incomeExpenseForm: FormGroup;
  type: string = 'income';
  isLoading: boolean = false;
  uiSubscription: Subscription;
  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private incomeExpenseService: IncomeExpenseService
  ) { }

  ngOnInit() {
    this.storeSubscribe();
    this.buildForm();
  }

  ngOnDestroy() {
    this.uiSubscription.unsubscribe();
  }

  storeSubscribe() {
    this.uiSubscription = this.store.select('ui').subscribe(ui => {
      this.isLoading = ui.isLoading;
    });
  }

  buildForm() {

    this.incomeExpenseForm = this.fb.group({
      description: ['', Validators.compose([
        Validators.required

      ])],
      amount: ['', Validators.compose([
        Validators.required

      ])]
    })
  }

  onSaveIncomeExpense() {
    if (this.incomeExpenseForm.invalid) { return; }

    const { description, amount } = this.incomeExpenseForm.value;

    const incomeExpense = new IncomeExpense(description, amount, this.type);
    this.store.dispatch(uiActions.isLoading());

    this.incomeExpenseService.createIncomeExpense(incomeExpense)
      .then(ref => {
        Swal.fire('Registro creado', description, 'success');
        this.incomeExpenseForm.reset();
        this.store.dispatch(uiActions.stopLoading());

      })
      .catch(err => {
        Swal.fire('Error', err.message, 'error')
      })


  }

}
