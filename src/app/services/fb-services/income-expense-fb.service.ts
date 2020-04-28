import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthFbService } from './auth-fb.service';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { IncomeExpense } from '../../models/income-expense.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IncomeExpenseFbService {

  constructor(
    private angularFirestore: AngularFirestore,
    private userService: UserService
  ) { }

  createIncomeExpense(incomeExpense: IncomeExpense): Promise<any> {
    console.log(this.userService.user.uid)
    const uid = this.userService.user.uid;
    return this.angularFirestore.doc(`${uid}/income-expense`)
      .collection('items')
      .add(
        {
          description: incomeExpense.description,
          amount: incomeExpense.amount,
          type: incomeExpense.type
        }
      );
    //{ ...incomeExpense }
    //    
    {
      // description: incomeExpense.description,
      // amount: incomeExpense.amount,
      // type: incomeExpense.type
    }

    // public description: incomeExpense.de,
    // public monto: number,
    // public type: string,
  }

  getIncomeExpenses(uid: string): Observable<any> {

    return this.angularFirestore.collection(`${uid}/income-expense/items`)
      .snapshotChanges()
      .pipe(
        map(snapshot => {
          return snapshot.map(doc => {
            const data: Object = doc.payload.doc.data();
            return {
              uid: doc.payload.doc.id,
              ...data
            }
          })
        })
      );
  }

  deleteIncomeExpense(uidItem: string): Promise<any> {
    const uid = this.userService.user.uid;
    return this.angularFirestore.doc(`${uid}/income-expense/items/${uidItem}`).delete();
  }
}
