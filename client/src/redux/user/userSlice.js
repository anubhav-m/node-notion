import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser: null,
    error: null,
    loading: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
            state.error = null;
        },

        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },

        signInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        clearError: (state) => {
            state.error = null;
        },

        signUpStart: (state) => {
            state.loading = true;
            state.error = null;
        },

        signUpSuccess: (state) => {
            state.loading = false;
            state.error = null;
        },

        signUpFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        updateStart: (state) => {
            state.loading = true,
                state.error = null
        },

        updateSuccess: (state, action) => {
            state.currentUser = action.payload,
                state.loading = false,
                state.error = false
        },

        updateFailure: (state, action) => {
            state.loading = false,
                state.error = action.payload
        }
    }
});

export const {
    signInStart,
    signInSuccess,
    signInFailure,
    signUpStart,
    signUpSuccess,
    signUpFailure,
    clearError,
    updateStart,
    updateSuccess,
    updateFailure
} = userSlice.actions;

export default userSlice.reducer;