import {configureStore} from "@reduxjs/toolkit";
import usersReducer from "./usersSlice/usersSlice";



export const store = configureStore(
    {
        reducer: {
            users: usersReducer
        }
    }
)