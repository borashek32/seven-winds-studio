export type RowType = {
  child: RowType[]
  equipmentCosts: number
  estimatedProfit: number
  id: number
  machineOperatorSalary: number
  mainCosts: number
  materials: number
  mimExploitation: number
  overheads: number
  rowName: string,
  salary: number
  supportCosts: number
  total: number
  parentId: number | null
}

export type FormType = RowType

export type ItemType = {
  row: RowType
  isChildRow?: boolean
  marginLeft: number
}

export type UpdateRowType = {
  rowId: number
  row: FormType
}

export type CreateRowType = {
  row: FormType
}

export type UpdateFormProps = {
  mode: boolean
  setMode: (editMode: boolean) => void
}

export type CreateFormProps = {
  mode: boolean
  setMode: (editMode: boolean) => void
  parentId?: number
}

export type ResponseRowType = {
  current: RowType
  changed: RowType[]
}
