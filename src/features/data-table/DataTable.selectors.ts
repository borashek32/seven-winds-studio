import { RootState } from "../../common/providers/model/store"

const selectRows = (state: RootState) => state.dataTable.rows
const selectRow = (state: RootState) => state.dataTable.row

export { selectRows, selectRow }