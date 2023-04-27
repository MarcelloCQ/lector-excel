import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  data: ''
};

const datosXlsxSlice = createSlice({
  name: 'datosXlsx',
  initialState: initialState,
  reducers: {
    updateData: (state, payload) => {
      state.data = payload
    }
  }
});

export const { updateData } = datosXlsxSlice.actions;

export default datosXlsxSlice.reducer;