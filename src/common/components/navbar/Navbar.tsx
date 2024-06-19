import styles from './Navbar.module.scss'
import menuImg from './../../assets/img/icons/menu.svg'
import backImg from'./../../assets/img/icons/back.svg'

export const Navbar = () => {

  return (
    <nav className={styles.navbarWrapper}>
      <div className={styles.navbarTop}>
        <div className={styles.imgWrapper}>
          <img src={menuImg} alt="menu" />
        </div>
        <div className={styles.imgWrapper}>
          <img src={backImg} alt="back" />
        </div>
        <ul className={styles.navbarProjectMenu}>
          <li>
            <p className={styles.projectMenuItemName}>Просмотр</p>
          </li>
          <li>
            <p className={styles.projectMenuItemName}>Управление</p>
          </li>
        </ul>
      </div>
      <div className={styles.navbarBottom}>
        <div className={styles.projectWork}>
          <p className={styles.projectMenuItemName}>Название проекта</p>
          <span className={styles.abbreviation}>Аббревиатура</span>
        </div>
        <div className={styles.projectWorkName}>
          <p>Строительно-монтажные работы</p>
        </div>
      </div>
    </nav>
  )
}