export type RowType = {
  child: number[]
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
}

export type FormType = Omit<RowType, 'id' | 'child'>

export type ItemType = {
  row: RowType
}

export type UpdateRowType = {
  rowId: number
  row: FormType
}

export type CreateRowType = {
  parentId?: number
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
  changed: []
}
