import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {USERS_API} from "../../data";
import axios from "axios";

export const fetchUsers = createAsyncThunk(
    'users/fetch',
    async (category, thunkAPI) => {
        try{
            const response = await axios.get(USERS_API);
            const data = await response.data;
            if(data?.message) {
                throw new Error(data?.message);
            }
            return data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

const initialState = {
    users: [],
    user: {},
    loading: false,
    error: null,
};

const bearSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
    },
    extraReducers: {
        [fetchUsers.pending]: (state)=> {
            state.loading = true;
            state.error = null;
        },
        [fetchUsers.fulfilled]: (state, action)=> {
            state.loading = false;
            state.error = null;
            state.users = [...action.payload];
        },
        [fetchUsers.rejected]: (state, action)=> {
            state.loading = false;
            state.error = action.payload.message;
        },
    }
})

export default bearSlice.reducer