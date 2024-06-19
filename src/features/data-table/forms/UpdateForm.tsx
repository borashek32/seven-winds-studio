import styles from './../DataTable.module.scss'
import level from '@/common/assets/img/icons/level.svg'
import { Controller, useForm } from 'react-hook-form'
import { KeyboardEvent } from 'react'
import { useUpdateRowMutation } from '@/features/data-table/DataTable.service'
import { UpdateFormProps, RowType } from '@/features/data-table/DataTable.types'
import { useAppDispatch, useAppSelector } from '@/common/hooks'
import { setRow } from '@/features/data-table/DataTable.slice'
import { selectRow } from '@/features/data-table/DataTable.selectors'

export const UpdateForm = ({
  mode,
  setMode,
}: UpdateFormProps) => {
  const dispatch = useAppDispatch()

  const row = useAppSelector(selectRow)

  const [updateRow] = useUpdateRowMutation()

  const { control, getValues } = useForm<RowType>({
    mode: "onChange",
    defaultValues: {
      rowName: row ? row.rowName : '',
      salary: row ? row.salary : 0,
      equipmentCosts: row ? row.equipmentCosts : 0,
      overheads: row ? row.overheads : 0,
      estimatedProfit: row ? row.estimatedProfit : 0,
      machineOperatorSalary: row ? row.machineOperatorSalary : 0,
      mainCosts: row ? row.mainCosts : 0,
      materials: row ? row.materials : 0,
      mimExploitation: row ? row.mimExploitation : 0,
      supportCosts: row ? row.supportCosts : 0,
      total: row ? row.total : 0,
    },
  })

  const handleOnPressEnter = async (event: KeyboardEvent<HTMLFormElement>) => {
    if (event.key === 'Enter') {
      const data = getValues()
      row && await updateRow({ rowId: row.id, row: data })
        .unwrap()
        .then(res => {
          setMode(!mode)
          dispatch(setRow(res.current))
          alert(`Запись ${res.current.rowName} успешно обновлена`)
        })
        .catch(e => alert(`Ошибка ${e}`))
    }
  }

  return (
    <>
      {row &&
        <form 
          className={styles.tr} 
          onDoubleClick={() => setMode(!mode)}
          onKeyDown={handleOnPressEnter}
        >
          <div className={styles.td}>
            <img src={level} alt="level" />
          </div>
          <div className={styles.td}>
            <Controller
              control={control}
              name="rowName"
              render={({ field: { value, onChange } }) => (
                <input 
                  type='text'
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </div>
          <div className={styles.td}>
            <Controller
              control={control}
              name="salary"
              render={({ field: { value, onChange } }) => (
                <input 
                  type='number'
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </div>
          <div className={styles.td}>
            <Controller
              control={control}
              name="equipmentCosts"
              render={({ field: { value, onChange } }) => (
                <input 
                  type='number'
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </div>
          <div className={styles.td}>
            <Controller
              control={control}
              name="overheads"
              render={({ field: { value, onChange } }) => (
                <input 
                  type='number'
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </div>
          <div className={styles.td}>
            <Controller
              control={control}
              name="estimatedProfit"
              render={({ field: { value, onChange } }) => (
                <input 
                  type='number'
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </div>
        </form>
      }
    </>
  )
}