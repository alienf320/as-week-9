import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from 'src/app/shared/appState.interface';
import { ProductsState } from '../reducers/home.reducers';
      
export const selectProductsFeature = (state: AppState) => state.home;
// export const productsFeatureSelector = createFeatureSelector<AppState, ProductsState>('home')
 
export const selectProducts = createSelector(
  selectProductsFeature,
  state => state.products
);