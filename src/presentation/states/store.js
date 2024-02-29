import { configureStore } from '@reduxjs/toolkit'
import inputReducer from "./reducers/inputSlice"
import popupReducer from './reducers/popupSlice'

export default configureStore({
    reducer: {
        input: inputReducer,
        popup: popupReducer
    }
})