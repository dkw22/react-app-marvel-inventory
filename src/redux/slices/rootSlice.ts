import { createSlice } from '@reduxjs/toolkit';

const rootSlice = createSlice({
    name: "root",
    initialState: {
        name: 'Your Superhero',
        description: "What is your Superhero like?",
        comics_appeared_in: "How many comics?",
        super_power: "What's giving you the power?",
    },
    reducers: {
        chooseName: (state, action) => { state.name = action.payload},
        chooseDescription: (state, action) => { state.description = action.payload},
        chooseComicsAppearedIn: (state, action) => { state.comics_appeared_in = action.payload},
        chooseSuperPower: (state, action) => { state.super_power = action.payload},
    }
})

// Export Reducer
export const reducer = rootSlice.reducer;
export const { chooseName, chooseDescription, chooseComicsAppearedIn, chooseSuperPower } = rootSlice.actions;