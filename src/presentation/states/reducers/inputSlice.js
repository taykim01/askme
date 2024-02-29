import { createSlice } from '@reduxjs/toolkit'

export const emptyInquiry = {
    content: '',
}

const initialState = emptyInquiry

export const inputSlice = createSlice({
    name: 'input',
    initialState,
    reducers: {
        applyInput: (state, action) => {
            state.content = action.payload
        }
    }
})

export const { applyInput, resetInput } = inputSlice.actions
export default inputSlice.reducer