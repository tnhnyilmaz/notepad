import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./categoryReducer";
import notesReducer from "./notesReducer";
import tagsReducer from "./tagsReducer";
export const store = configureStore({
    reducer: {
        categories: categoriesReducer,
        tags:tagsReducer,
        notes:notesReducer
    },

});