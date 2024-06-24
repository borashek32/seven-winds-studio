import styles from '@/features/data-table/DataTable.module.scss'
import level from '@/common/assets/img/icons/level.svg'
import { Controller, useForm } from 'react-hook-form'
import { KeyboardEvent } from 'react'
import { useCreateRowMutation } from '@/features/data-table/DataTable.service'
import { CreateFormProps, RowType } from '@/features/data-table/DataTable.types'
import { useAppDispatch } from '@/common/hooks'
import { setRow } from '@/features/data-table/DataTable.slice'

export const CreateForm = ({
  parentId,
  mode,
  setMode,
}: CreateFormProps) => {
  const dispatch = useAppDispatch()

  const [createRow] = useCreateRowMutation()

  const { control, getValues } = useForm<RowType>({
    mode: "onChange",
    defaultValues: {
      rowName: '',
      salary: 0,
      equipmentCosts: 0,
      overheads: 0,
      estimatedProfit: 0,
      machineOperatorSalary: 0,
      mainCosts: 0,
      materials: 0,
      mimExploitation: 0,
      supportCosts: 0,
      total: 0,
      parentId: parentId ? parentId : null
    },
  })

  const handleOnPressEnter = async (event: KeyboardEvent<HTMLFormElement>) => {
    if (event.key === 'Enter') {
      const data = getValues()
      
      await createRow({ row: data })
        .unwrap()
        .then((res) => {
          setMode(!mode)
          dispatch(setRow(res.current))

          if (parentId) {
            alert(`Дочерняя запись ${res.current.rowName} успешно сoздана`)
          } else {
            alert(`Запись ${res.current.rowName} успешно сoздана`)
          }
        })
        .catch(e => alert(`Ошибка ${e}`))
    }
  }

  return (
    <>
      <form 
        className={styles.tr} 
        onDoubleClick={() => setMode(!mode)}
        onKeyDown={handleOnPressEnter}
      >
        <div className={styles.td + ' ' + styles.createFormLevel + ' ' + (parentId ? styles.leftMargin : '')}>
          <img src={level} alt="level" onClick={() => setMode(!mode)} />
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
    </>
  )
}