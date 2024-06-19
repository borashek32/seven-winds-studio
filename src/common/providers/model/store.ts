import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit'
import { dataTableApi } from '../../../features/data-table/DataTable.service'
import { dataTableReducer } from '../../../features/data-table/DataTable.slice'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
  reducer: {
    [dataTableApi.reducerPath]: dataTableApi.reducer,
    dataTable: dataTableReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(
    dataTableApi.middleware,
  ),
})

setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>