import { useEffect } from 'react'
import styles from '@/features/data-table/DataTable.module.scss'
import { useGetRowsQuery } from '@/features/data-table/DataTable.service'
import { useAppDispatch, useAppSelector } from '../../common/hooks'
import { Loader } from '@/common/components/loader/Loader'
import { setAllRows } from '@/features/data-table/DataTable.slice'
import { selectRows } from '@/features/data-table/DataTable.selectors'
import { RowType } from '@/features/data-table/DataTable.types'
import { Item } from '@/features/data-table/item/Item'

export const DataTable = () => {
  const { data, error, isLoading } = useGetRowsQuery()

  error && alert({error})

  const dispatch = useAppDispatch()

  const rows = useAppSelector(selectRows)
  console.log(rows)
  
  useEffect(() => {
    if (data) {
      dispatch(setAllRows(data))
    }
  }, [data, dispatch])
  
  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.dataTableWrapper}>
        <div className={styles.table}>
          <div className={styles.tr}>
            <div className={styles.th}>Уровень</div>
            <div className={styles.th}>Наименование работ</div>
            <div className={styles.th}>Основная з/п</div>
            <div className={styles.th}>Оборудование</div>
            <div className={styles.th}>Накладные расходы</div>
            <div className={styles.th}>Сметная прибыль</div>
          </div>
          <div className={styles.tbody}>
            {rows && rows.map((item: RowType) => {
              return (
                <Item
                  key={item.id}
                  row={item}
                />
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}