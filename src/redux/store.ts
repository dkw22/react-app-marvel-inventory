import { configureStore} from '@reduxjs/toolkit';
import { reducer } from '../redux/slices/rootSlice';

export const store = configureStore({
    reducer,
    devTools: true
})