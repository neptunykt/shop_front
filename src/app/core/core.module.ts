import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectNavbarComponent } from './components/navbar/project-navbar.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {FooterComponent} from '../core/components/footer/footer.component';
@NgModule({
  declarations: [
    ProjectNavbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
    ]),
    SharedModule,
  ],
  exports:[
    ProjectNavbarComponent,
    FooterComponent
  ]
})
export class CoreModule { }
