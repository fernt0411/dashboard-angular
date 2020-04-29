import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncomeOrderPipe } from '../pipes/income-order.pipe';
import { DetalleComponent } from './detalle/detalle.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutesModule } from '../dashboard/dashboard-routes.module';
import { StoreModule } from '@ngrx/store';
import { incomeExpenseReducer } from './income-expense.reducer';



@NgModule({
  declarations: [
    DashboardComponent,
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    IncomeOrderPipe
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    DashboardRoutesModule,
    FormsModule,
    ChartsModule,
    StoreModule.forFeature('incomeExpense', incomeExpenseReducer)

  ]
})
export class IncomeExpenseModule { }
