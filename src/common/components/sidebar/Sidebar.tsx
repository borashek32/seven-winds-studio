import styles from './Sidebar.module.scss'
import { WorkType } from './Sidebar.types'
import menuItemImg from './../../assets/img/icons/menu-item.svg'

export const Sidebar = () => {
  const works: WorkType[] = [
    { id: 1, title: 'По проекту' },
    { id: 2, title: 'Объекты' },
    { id: 3, title: 'РД' },
    { id: 4, title: 'График' },
    { id: 5, title: 'МиМ' },
    { id: 6, title: 'Рабочие' },
    { id: 7, title: 'Капвложения' },
    { id: 8, title: 'Бюджет' },
    { id: 9, title: 'Финансирование' },
    { id: 10, title: 'Панорамы' },
    { id: 11, title: 'Камеры' },
    { id: 12, title: 'Поручения' },
    { id: 13, title: 'Контрагенты' },
  ]

  return (
    <div className={styles.sidebarWrapper}>
      <ul className={styles.workList}>
        {works.map((item: WorkType) => {
          return (
            <div className={styles.workItem} key={item.id}>
              <img src={menuItemImg} alt="menu item" />
              <p>{item.title}</p>
            </div>
          )
        })}
      </ul>
    </div>
  )
}