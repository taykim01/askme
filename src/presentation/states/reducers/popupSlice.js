import { createSlice } from '@reduxjs/toolkit'

export const popupSlice = createSlice({
    name: 'popup',
    initialState: {
        createBoard: false,
        boardDetail: false
    },
    reducers: {
        changePopupStatus: (state, action) => {
            state.createBoard = action.payload.createBoard;
            state.boardDetail = action.payload.boardDetail;
        }
    }
})

export const { changePopupStatus } = popupSlice.actions
export default popupSlice.reducer