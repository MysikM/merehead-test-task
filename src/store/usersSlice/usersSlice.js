import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {USERS_API} from "../../data";
import axios from "axios";

export const fetchUsers = createAsyncThunk(
    'users/fetch',
    async (_, thunkAPI) => {
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

export const postCreateNewUser = createAsyncThunk(
    'user/postCreateNewUser',
    async (newUser, thunkAPI) => {

        try{
            const response = await axios.post(USERS_API, {
                ...newUser
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.data;
            if(data?.message) {
                throw new Error(data?.message);
            }
            if (data.status === 200) {
                return data
            }

        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
)

const initialState = {
    users: [],
    user: {},
    loading: false,
    error: null,
    success: false,
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
            state.success = false;
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
        [postCreateNewUser.pending]: (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        },
        [postCreateNewUser.fulfilled]: (state) => {
            state.loading = false;
            state.error = null;
            state.success = true;
        },
        [postCreateNewUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
    }
})

export default bearSlice.reducer