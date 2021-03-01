/*
 * @Descripttion:
 * @version:
 * @Author: MFine
 * @Date: 2021-01-30 21:39:42
 * @LastEditors: MFine
 * @LastEditTime: 2021-02-02 21:41:44
 */

import { StateType } from 'typesafe-actions';

declare module 'typesafe-actions' {
  export type Store = StateType<typeof import('./store').default>

  export type RootState = StateType<typeof import('./reducer').default>;
  
  export type RootAction = ActionType<typeof import('./actions').default>
}


