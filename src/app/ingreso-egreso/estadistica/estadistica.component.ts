import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import { IncomeExpense } from '../../models/income-expense.model';

import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit {
  subscriptionStore: Subscription;
  incomes: number = 0;
  expenses: number = 0;

  totalIncomes: number = 0;
  totalExpenses: number = 0;


  public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: MultiDataSet = [
    []
  ];
  public doughnutChartType: ChartType = 'doughnut';

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.storeSubscribe();
  }
  storeSubscribe() {
    this.subscriptionStore = this.store.select('incomeExpense').subscribe(({ items }) => {

      this.generateStadistic(items);
    });
  }
  generateStadistic(items: IncomeExpense[]) {
    this.incomes = 0;
    this.expenses = 0;
  
    this.totalIncomes = 0;
    this.totalExpenses = 0;

    for (const item of items) {
      if (item.type === 'income') {
        this.totalIncomes += item.amount;
        this.incomes++;
      } else {
        this.totalExpenses += item.amount;
        this.expenses++;
      }
    }
    this.doughnutChartData = [[this.totalIncomes, this.totalExpenses]]
  }
}
