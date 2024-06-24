import { useEffect, useState } from 'react'
import { useAppDispatch } from '@/common/hooks'
import { ItemType } from '@/features/data-table/DataTable.types'
import styles from './../DataTable.module.scss'
import { setRow } from '@/features/data-table/DataTable.slice'
import level from '@/common/assets/img/icons/level.svg'
import trash from '@/common/assets/img/icons/trash.svg'
import { useRemoveRowMutation } from '@/features/data-table/DataTable.service'
import { CreateForm } from '@/features/data-table/forms/CreateForm'
import { UpdateForm } from '@/features/data-table/forms/UpdateForm'

export const Item = ({
  isChildRow,
  row,
  marginLeft,
}: ItemType) => {
  const [visible, setVisible] = useState(false)
  const [createMode, setCreateMode] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [removeRow] = useRemoveRowMutation()

  const dispatch = useAppDispatch()

  const createNewRow = () => {
    !editMode && setCreateMode(!createMode)
  }

  const removeItem = async () => {
    await removeRow(row.id)
      .unwrap()
      .then(() => alert(`Запись успешно удалена`))
      .catch(e => alert(`Ошибка ${e}`))
  }

  const handleDoubleClick = () => {
    setEditMode(!editMode)
    dispatch(setRow(row))
  }

  useEffect(() => {
    dispatch(setRow(row))
  }, [row, dispatch])
  console.log(row)

  return (
    <>
        <div className={styles.tr} onDoubleClick={handleDoubleClick}>
          <div className={styles.td}>
            <div 
              style={{marginLeft: isChildRow ? marginLeft += 20 : ''}}
              className={(visible ? styles.active : '') + ' ' + (isChildRow ? styles.leftMargin : '')} 
              onMouseLeave={() => setVisible(!visible)}
            >
              <img 
                src={level} 
                alt="level" 
                onMouseEnter={() => setVisible(!visible)} 
                onClick={createNewRow}
              />
              {visible && 
                <img 
                  src={trash} 
                  alt="trash" 
                  onClick={removeItem} 
                />
              }
            </div>
          </div>
          {!editMode ? (
            <>
              <div className={styles.td}>{row.rowName}</div>
              <div className={styles.td}>{row.salary}</div>
              <div className={styles.td}>{row.equipmentCosts}</div>
              <div className={styles.td}>{row.overheads}</div>
              <div className={styles.td}>{row.estimatedProfit}</div>
            </>
            ) : (
              <UpdateForm
                key={row.id}
                mode={editMode}
                setMode={setEditMode}
              />
            )
          }
        </div>
        
      {createMode && !editMode && 
        <CreateForm
          parentId={row.id}
          mode={createMode}
          setMode={setCreateMode}
        />
      }
      {row.child && row.child.length > 0 && row.child.map(item => {
            return (
              <Item row={item} key={item.id} isChildRow={true} marginLeft={marginLeft} />
            )})
          } 
    </>
  )
}