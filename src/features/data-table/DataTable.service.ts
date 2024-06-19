import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { baseUrl } from "../../common/constants/baseUrl"
import { CreateRowType, RowType, UpdateRowType, ResponseRowType } from "./DataTable.types"

const baseQuery = fetchBaseQuery({ baseUrl })

export const dataTableApi = createApi({
  reducerPath: 'dataTableApi',
  baseQuery: baseQuery,
  tagTypes: ['rows'],
  endpoints: build => {
    return {
      getRows: build.query<RowType[], void>({
        query: () => `/row/list`,
        providesTags: ['rows']
      }),
      updateRow: build.mutation<ResponseRowType, UpdateRowType>({
        query: (data) => {
          return {
            method: 'POST',
            url: `/row/${data.rowId}/update`,
            body: data.row
          }
        },
        invalidatesTags: ['rows'],
      }),
      createRow: build.mutation<ResponseRowType, CreateRowType>({
        query: (data) => {
          return {
            method: 'POST',
            url: `/row/create`,
            body: data.row
          }
        },
        invalidatesTags: ['rows'],
      }),
      removeRow: build.mutation<ResponseRowType, number>({
        query: (rowId: number) => {
          return {
            method: 'DELETE',
            url: `/row/${rowId}/delete`,
            body: rowId,
          }
        },
        invalidatesTags: ['rows'],
      })
    }
  },
})

export const {
  useGetRowsQuery,
  useCreateRowMutation,
  useUpdateRowMutation,
  useRemoveRowMutation,
} = dataTableApi