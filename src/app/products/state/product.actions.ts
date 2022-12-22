import { Action } from '@ngrx/store';
import { Product } from '../../shared/models/product';
import { PageLoadConfig } from '../../shared/models/page-load-config';
import { Paginator } from 'src/app/shared/models/paginator';

export enum ProductActionTypes {
    Load = '[Load] Load Products',
    LoadSuccess = '[Product] Load Success',
    LoadFail = '[Product] Load Fail',
  }

  // Action Creators

  export class Load implements Action {
    readonly type = ProductActionTypes.Load;
    constructor(public payload: PageLoadConfig) {}
  }
  
  export class LoadSuccess implements Action {
    readonly type = ProductActionTypes.LoadSuccess;
  
    constructor(public payload: Paginator<Product>) { }
  }
  
  export class LoadFail implements Action {
    readonly type = ProductActionTypes.LoadFail;
  
    constructor(public payload: string) { }
  }

  
  // Union the valid types
  export type ProductActions =
    | LoadSuccess
    | LoadFail
    | Load;
  