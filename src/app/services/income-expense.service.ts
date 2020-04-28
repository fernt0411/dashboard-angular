import { Injectable } from '@angular/core';
import { IncomeExpense } from '../models/income-expense.model';
import { IncomeExpenseFbService } from './fb-services/income-expense-fb.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncomeExpenseService {

  constructor(
    private incomeExpenseFbService:IncomeExpenseFbService
  ) { 



  }


  createIncomeExpense(incomeExpense: IncomeExpense): Promise<any> {
    
    return this.incomeExpenseFbService.createIncomeExpense(incomeExpense);
  }

  getIncomeExpenses(uid:string): Observable<any> {

    return this.incomeExpenseFbService.getIncomeExpenses(uid);
  }

  deleteIncomeExpense(uidItem: string): Promise<any> {

    return this.incomeExpenseFbService.deleteIncomeExpense(uidItem);
  }
}
