import { useEffect, useState } from 'react'
import level from '@/common/assets/img/icons/level.svg'
import styles from '@/features/data-table/DataTable.module.scss'
import { useGetRowsQuery } from '@/features/data-table/DataTable.service'
import { useAppDispatch, useAppSelector } from '../../common/hooks'
import { Loader } from '@/common/components/loader/Loader'
import { setAllRows } from '@/features/data-table/DataTable.slice'
import { selectRows } from '@/features/data-table/DataTable.selectors'
import { RowType } from '@/features/data-table/DataTable.types'
import { Item } from '@/features/data-table/item/Item'
import { CreateForm } from './forms/CreateForm'

export const DataTable = () => {
  const { data, isLoading } = useGetRowsQuery()

  const dispatch = useAppDispatch()

  const [createMode, setCreateMode] = useState(false)
  const createNewRow = () => {
    setCreateMode(!createMode)
  }

  const rows = useAppSelector(selectRows)
  
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
                  marginLeft={0}
                />
              )
            })}
            <div 
              className={styles.createNewRow}
              style={{marginTop: !createMode ? 14 : ''}}
            >
              {!createMode &&
                <img 
                  src={level} 
                  alt="level" 
                  onClick={createNewRow}
                />
              }
              {createMode && 
                <CreateForm
                  mode={createMode}
                  setMode={setCreateMode}
                  marginLeft={0}
                />
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}