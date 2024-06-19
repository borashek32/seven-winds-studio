import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RowType } from './DataTable.types'

interface DataTableState {
  rows: RowType[]
  row: RowType | null
}

const initialState: DataTableState = {
  rows: [],
  row: null,
}

const dataTableSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setAllRows(state, action: PayloadAction<RowType[]>) {
      state.rows = action.payload
    },
    setRow(state, action: PayloadAction<RowType>) {
      state.row = action.payload
    },
    setChild(state, action: PayloadAction<{ parentId: number, row: RowType}>) {
      const parentRow = state.rows.find((row: RowType) => row.id === action.payload.parentId);
      parentRow?.child.push(action.payload.row.id)
    }
  },
})

export const { setAllRows, setRow, setChild } = dataTableSlice.actions
export const dataTableReducer = dataTableSlice.reducer