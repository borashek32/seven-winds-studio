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
      if (action.payload.parentId) {
        state.row.id = Math.floor(Math.random() * 1000000) + 1
        state.rows.push(action.payload)
        const parentRow = state.rows.find((row: RowType) => row.id === action.payload.parentId)
        parentRow?.child.push(action.payload)
      }
    }
  }
})

export const { setAllRows, setRow } = dataTableSlice.actions
export const dataTableReducer = dataTableSlice.reducer