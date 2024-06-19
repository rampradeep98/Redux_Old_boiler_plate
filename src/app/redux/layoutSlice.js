import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  sideModalStatus: false,
};

export const layout = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    toggleSideModal: (state) => {
      state.sideModalStatus = !state.sideModalStatus;
    },
  },
});

export const { toggleSideModal } = layout.actions;

export default layout.reducer;
