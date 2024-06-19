import { ReactElement } from 'react'
import styles from './AppLayout.module.sass'
import { Navbar } from '../components/navbar/Navbar'
import { Sidebar } from '../components/sidebar/Sidebar'

type Props = {
  children: ReactElement | ReactElement[]
}

export const AppLayout = ({ children }: Props) => {

  return (
    <div className={styles.appWrapper}>
      <div className={styles.navbarWrapper}>
        <Navbar />
      </div>
      <div className={styles.sidebarWrapper}>
        <Sidebar />
      </div>
      <div className={styles.dataWrapper}>
        {children}
      </div>
    </div>
  )
}