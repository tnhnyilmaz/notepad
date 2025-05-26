import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import { STATUS } from "./STATUS";

const initialState = {
    tags: [],
    tagsState: STATUS.IDLE
}
export const AllTags = createAsyncThunk("AllTags", async () => {
    try {
        const db = getFirestore();
        const snapshot = await getDocs(collection(db, "tags"));
        console.log("snapshot tagas", snapshot);
        const tags = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        console.log("tags final: ", tags);
        return tags;
    } catch (error) {
        console.error("tags çekme hatası.:", error);
        throw error;
    }
})
export const addNewTags = createAsyncThunk("AddNewTags", async (tagsName, { dispatch, rejectWithValue }) => {
    try {
        const db = getFirestore();
        const docRef = await addDoc(collection(db, "tags"), {
            tagsName: tagsName,
        });
        console.log("yeni tags eklendi", docRef.id)
        dispatch(AllTags());
        return docRef.id;
    } catch (error) {
        console.error("yeni tags eklenirken hat oluştu : ", error);
        return rejectWithValue(error.message);
    }
})
const tagsReducer = createSlice({
    name: "tags",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(AllTags.pending, (state) => {
                state.tagsState = STATUS.LOADING;
            })
            .addCase(AllTags.fulfilled, (state, action) => {
                state.tagsState = STATUS.SUCCESS;
                state.tags = action.payload;
            })
            .addCase(AllTags.rejected, (state) => {
                state.tagsState = STATUS.FAIL;
            })
            .addCase(addNewTags.pending, (state) => {
                state.tagsState = STATUS.LOADING;
            })
            .addCase(addNewTags.fulfilled, (state) => {
                state.tagsState = STATUS.SUCCESS;
            })
            .addCase(addNewTags.rejected, (state) => {
                state.tagsState = STATUS.FAIL;
            })
    }
})

export default tagsReducer.reducer;