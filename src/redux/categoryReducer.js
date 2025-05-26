import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, collection, doc, getDoc, getDocs, getFirestore } from "firebase/firestore";
import { STATUS } from "../redux/STATUS";

const initialState = {
    categories: [],
    categoriesState: STATUS.IDLE
}
export const AllCategories = createAsyncThunk("AllCategories", async () => {
    try {
        const db = getFirestore();
        const snapshot = await getDocs(collection(db, "category"));
        console.log("snapshot", snapshot);
        const categories = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        console.log("final: ", categories);
        return categories;
    } catch (error) {
        console.error("Kategori çekme hatası:", error);
        throw error;
    }
});

export const addNewCategory = createAsyncThunk("AddNewCategory", async (categoryName, { dispatch, rejectWithValue }) => {
    try {
        const db = getFirestore();
        const docRef = await addDoc(collection(db, "category"), {
            categoryName: categoryName,
        });
        console.log("Yeni kategori eklendi ID:", docRef.id);

        dispatch(AllCategories());

        return docRef.id;
    } catch (error) {
        console.error("Yeni kategori eklenirken hata oluştu:", error);
        return rejectWithValue(error.message);
    }
});
export const fetchCategoryNamebyId = createAsyncThunk(
    "FetchCategoryNameById", async (docId, { dispatch, rejectWithValue }) => {
        try {
            const db = getFirestore()
            const docRef = await doc(db, "category", docId);
            const categorySnap = await getDoc(docRef);

            if (categorySnap.exists()) {
                const data = categorySnap.data();
                console.log("categoryName:", data.categoryName)
                return data.categoryName;
            } else {
                console.log("Belge bulunamadı.");
                return null;
            }

        } catch (error) {
            console.error("Kategori adı çekilirken hata:", error);
            return null;
        }
    }
)

const categoriesReducer = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(AllCategories.pending, (state) => {
                state.categoriesState = STATUS.LOADING;
            })
            .addCase(AllCategories.fulfilled, (state, action) => {
                state.categoriesState = STATUS.SUCCESS;
                state.categories = action.payload;
            })
            .addCase(AllCategories.rejected, (state) => {
                state.categoriesState = STATUS.FAIL;
            })
            .addCase(addNewCategory.pending, (state) => {
                state.categoriesState = STATUS.LOADING;
            })
            .addCase(addNewCategory.fulfilled, (state) => {
                state.categoriesState = STATUS.SUCCESS;
            })
            .addCase(addNewCategory.rejected, (state) => {
                state.categoriesState = STATUS.FAIL;
            })
    }
})
export default categoriesReducer.reducer;