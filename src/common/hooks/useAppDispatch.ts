import { useDispatch } from "react-redux"
import { AppDispatch } from "../providers/model/store"

export const useAppDispatch = () => useDispatch<AppDispatch>()