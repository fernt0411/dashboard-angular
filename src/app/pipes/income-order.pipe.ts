import { Pipe, PipeTransform } from '@angular/core';
import { IncomeExpense } from '../models/income-expense.model';
import { SlicePipe } from '@angular/common';

@Pipe({
  name: 'incomeOrder'
})
export class IncomeOrderPipe implements PipeTransform {

  transform(items: IncomeExpense[]): IncomeExpense[] {
 
    return items.slice().sort((a, b) => {

      if (a.type === 'income') {
        return -1;
      } else {
        return 1;
      }
    });
  }

}
