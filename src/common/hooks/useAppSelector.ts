import { TypedUseSelectorHook, useSelector } from "react-redux"
import { RootState } from "../providers/model/store"

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector