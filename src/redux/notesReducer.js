import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAuth } from "firebase/auth";
import { collection, deleteDoc, doc, getDoc, getDocs, getFirestore, updateDoc } from "firebase/firestore";
import { STATUS } from "./STATUS";
const initialState = {
    notes: [],
    notesState: STATUS.IDLE,
    searchTerm: ""
}

export const fetchUserNotes = createAsyncThunk(
    "notes/fetchUserNotes",
    async (_, { rejectWithValue }) => {
        try {
            const auth = getAuth();
            const db = getFirestore();
            const user = auth.currentUser;
            if (!user) throw new Error("Kullanıcı oturum açmamış");

            const notesRef = collection(db, "users", user.uid, "notes");
            const snapshot = await getDocs(notesRef);

            const notes = snapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    ...data,
                    createdAt: data.createdAt?.toDate?.().toISOString() || null,
                };
            });

            return notes;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const addNewNote = createAsyncThunk("notes/addNewNote", async (noteData, { dispatch, rejectWithValue }) => {
    try {
        const auth = getAuth();
        const db = getFirestore();
        const user = auth.currentUser;
        if (!user) throw new Error("Kullanıcı oturum açmamış");

        await addDoc(collection(db, "users", user.uid, "notes"), {
            ...noteData,
            createdAt: new Date().toISOString()
        });

        dispatch(fetchUserNotes()); // not eklendikten sonra listeyi güncelle

        return true;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const deleteNote = createAsyncThunk("notes/deleteNote", async (noteId, { dispatch, rejectWithValue }) => {
    try {
        const auth = getAuth();
        const db = getFirestore();
        const user = auth.currentUser;
        if (!user) throw new Error("Kullanıcı oturum açmamış"); //kullanici giriş kontolu

        const noteRef = doc(db, "users", user.uid, "notes", noteId); //silincek notenin docId buluyoruz
        await deleteDoc(noteRef); //bulunan doc siliniyor
        dispatch(fetchUserNotes()); //ardından tekrardan notelistemizi güncelliyoruz

        return noteId;
    } catch (error) {
        return rejectWithValue(error.message);
    }
})
export const updateNote = createAsyncThunk(
    "notes/updateNote",
    async ({ noteId, noteData }, { rejectWithValue }) => {
        try {
            const auth = getAuth();
            const db = getFirestore();
            const user = auth.currentUser;
            if (!user) throw new Error("Kullanıcı oturum açmamış");

            const noteRef = doc(db, "users", user.uid, "notes", noteId);
            await updateDoc(noteRef, noteData);

            // İlgili noteyi tekrar çekip, veriyi serialize edelim
            const updatedDoc = await getDoc(noteRef);
            const updatedData = updatedDoc.data();
            console.log("güncellenmiş note: ", updatedData)
            return {
                noteId,
                noteData: {
                    ...updatedData,
                    createdAt: updatedData.createdAt?.toDate?.().toISOString() || null//  burada dönüşüm
                }
            };

        } catch (error) {
            console.error(error);
            return rejectWithValue(error.message);
        }
    }
);


const notesReducer = createSlice({
    name: "notes",
    initialState,
    reducers: {
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserNotes.pending, (state) => {
                state.notesState = STATUS.LOADING;
            })
            .addCase(fetchUserNotes.fulfilled, (state, action) => {
                state.notesState = STATUS.SUCCESS;
                state.notes = action.payload;
            })
            .addCase(fetchUserNotes.rejected, (state) => {
                state.notesState = STATUS.FAIL;
            })
            .addCase(addNewNote.pending, (state) => {
                state.notesState = STATUS.LOADING;
            })
            .addCase(addNewNote.fulfilled, (state) => {
                state.notesState = STATUS.SUCCESS;
            })
            .addCase(addNewNote.rejected, (state) => {
                state.notesState = STATUS.FAIL;
            })
            .addCase(deleteNote.pending, (state) => {
                state.notesState = STATUS.LOADING;
            })
            .addCase(deleteNote.fulfilled, (state) => {
                state.notesState = STATUS.SUCCESS;
            })
            .addCase(deleteNote.rejected, (state) => {
                state.notesState = STATUS.FAIL;
            })
            .addCase(updateNote.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateNote.fulfilled, (state, action) => {
                const { noteId, noteData } = action.payload;
                state.notes = state.notes.map((note) =>
                    note.id === noteId ? { ...note, ...noteData } : note
                );
                state.loading = false;
                state.error = null;
            })
            // updateNote işlemi başarısız olursa:
            .addCase(updateNote.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Hata mesajını state'e kaydediyoruz
            });

    }
})
export const { setSearchTerm } = notesReducer.actions;

export default notesReducer.reducer;