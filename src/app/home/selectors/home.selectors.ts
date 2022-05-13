import { createSelector } from '@ngrx/store';
import { UserState } from 'src/app/login/reducers/login.reducers';
      
export const selectUserFeature = (state: UserState) => state.user;
 
export const userSelector = createSelector(
  selectUserFeature,
  state => state
);