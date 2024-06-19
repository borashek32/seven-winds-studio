import styles from '@/features/data-table/DataTable.module.scss'
import level from '@/common/assets/img/icons/level.svg'
import { Controller, useForm } from 'react-hook-form'
import { KeyboardEvent } from 'react'
import { useCreateRowMutation } from '@/features/data-table/DataTable.service'
import { CreateFormProps, RowType } from '@/features/data-table/DataTable.types'
import { useAppDispatch } from '@/common/hooks'
import { setChild, setRow } from '@/features/data-table/DataTable.slice'

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
    },
  })

  const handleOnPressEnter = async (event: KeyboardEvent<HTMLFormElement>) => {
    if (event.key === 'Enter') {
      const data = getValues()
      if (!parentId) {
        await createRow({ row: data })
          .unwrap()
          .then((res) => {
            setMode(!mode)
            alert(`Запись ${res.current.rowName} успешно сoздана`)
            dispatch(setRow(res.current))
          })
          .catch(e => alert(`Ошибка ${e}`))
      } else {
        dispatch(setChild({ parentId, row: data }))
        setMode(!mode)
        alert(`Дочерняя запись ${data.rowName} успешно сoздана`)
        dispatch(setRow(data))
      }
    }
  }

  return (
    <>
      <form 
        className={styles.tr} 
        onDoubleClick={() => setMode(!mode)}
        onKeyDown={handleOnPressEnter}
      >
        <div className={styles.td + ' ' + styles.createFormLevel}>
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
    </>
  )
}