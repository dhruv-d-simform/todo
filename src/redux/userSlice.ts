import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    name: string;
}

const USER_NAME_KEY = 'TODO_USER_NAME';

let storedUserName: string | null = null;
try {
    storedUserName = localStorage.getItem(USER_NAME_KEY);
} catch (err) {
    console.log('No name stored. ', err);
}

const initialState: UserState = {
    name: storedUserName || 'Guest',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        changeName(state, action: PayloadAction<string>) {
            state.name = action.payload;
            localStorage.setItem(USER_NAME_KEY, action.payload);
        },
    },
});

export const { changeName } = userSlice.actions;

export default userSlice.reducer;
