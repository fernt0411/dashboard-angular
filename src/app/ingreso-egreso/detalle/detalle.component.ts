import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import { IncomeExpense } from '../../models/income-expense.model';
import { IncomeExpenseService } from '../../services/income-expense.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit {
  subscriptionStore: Subscription;

  incomeExpenses: IncomeExpense[] = [];
  constructor(
    private store: Store<AppState>,
    private incomeExpenseService: IncomeExpenseService
  ) { }

  ngOnInit() {
    this.storeSubscribe();

  }

  ngOnDestroy() {
    this.subscriptionStore.unsubscribe();

  }
  storeSubscribe() {
    this.subscriptionStore = this.store.select('incomeExpense').subscribe(({ items }) => {
      this.incomeExpenses = items;
    })

  }
  onDelete(uid: string) {
    this.incomeExpenseService.deleteIncomeExpense(uid)
      .then((val) => {
        Swal.fire('Borrado', 'Item borrado', 'success')

      })
      .catch(err => {
        Swal.fire('Borrado', err.message, 'error')
      });
  }
}
