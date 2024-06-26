import { CircularProgress } from "@mui/material"
import styles from './Loader.module.scss'

export const Loader = () => {

  return (
    <div className={styles.loaderWrapper}>
      <CircularProgress />
    </div>
  )
}