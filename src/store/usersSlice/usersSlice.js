import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {USER_API, USERS_API} from "../../data";
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
);

export const getUserById = createAsyncThunk(
    'user/getUserById',
    async (id, thunkAPI) => {
        try{
            const response = await axios.get(`${USER_API}/${id}`);
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

export const postEditUserById = createAsyncThunk(
    'user/postCreateNewUser',
    async (editUser, thunkAPI) => {

        try{
            const {user_id} = editUser;
            const response = await axios.put(`${USER_API}/${user_id}`, {
                ...editUser
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
);

const initialState = {
    users: [],
    user: {},
    loading: false,
    error: null,
    success: false,
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        resetUser: (state) => {
            state.user = {}
        },
        resetUsers: (state) => {
            state.users = []
        }
    },
    extraReducers: {
        [fetchUsers.pending]: (state)=> {
            state.loading = true;
            state.error = null;
            state.success = false;
            state.users = [];
        },
        [fetchUsers.fulfilled]: (state, action)=> {
            state.loading = false;
            state.error = null;
            state.users = action.payload;
        },
        [fetchUsers.rejected]: (state, action)=> {
            state.loading = false;
            state.error = action.payload.message;
            state.users = [];
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
        [getUserById.pending]: (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        },
        [getUserById.fulfilled]: (state, action) => {
            state.loading = false;
            state.error = null;
            state.success = false;
            state.user = action.payload;
        },
        [getUserById.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [postEditUserById.pending]: (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        },
        [postEditUserById.fulfilled]: (state) => {
            state.loading = false;
            state.error = null;
            state.success = true;
        },
        [postEditUserById.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },

    }
})
export const {resetUser, resetUsers} = usersSlice.actions;
export default usersSlice.reducer