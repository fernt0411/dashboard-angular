import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { IncomeExpenseService } from '../services/income-expense.service';
import * as incomeExpenseActions from '../ingreso-egreso/income-expense.actions';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {
  subscriptionStore: Subscription;
  subscriptionIncomeExpense: Subscription;
  constructor(
    private store: Store<AppState>,
    private incomeExpenseService: IncomeExpenseService
  ) { }

  ngOnInit() {
    this.storeSubscribe();

  }

  ngOnDestroy() {
    this.subscriptionStore.unsubscribe();
    this.subscriptionIncomeExpense.unsubscribe();
  }

  storeSubscribe() {
    this.subscriptionStore = this.store.select('user')
      .pipe(filter(auth => auth.user != null))
      .subscribe(({ user }) => {
        // console.log(user)
        this.subscriptionIncomeExpense = this.incomeExpenseService.getIncomeExpenses(user.uid).subscribe(incomeExpense => {
          console.log(incomeExpense)
          this.store.dispatch(incomeExpenseActions.setItems({ items: incomeExpense}))
        });
      });
  }

}
