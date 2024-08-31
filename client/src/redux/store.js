import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { alertSlice } from './alertSlice';
import { userSlice } from './userSlice';
import { socketSlice } from './socketSlice';
import { messageSlice } from './messageSlice';
import { bidSlice } from './bidSlice';
import { companySlice } from './companySlice';
import { jobSlice } from './jobSlice';
import { projectSlice } from './projectSlice';
import { applicationSlice } from './applicationSlice';

const rootReducer = combineReducers({
    alert: alertSlice.reducer,
    user: userSlice.reducer,
    socket: socketSlice.reducer,
    message: messageSlice.reducer,
    bid: bidSlice.reducer,
    company: companySlice.reducer,
    job: jobSlice.reducer,
    project: projectSlice.reducer,
    application: applicationSlice.reducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Disable serializable checks
        }),
});

export default store;
