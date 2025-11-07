import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PurchaseModalState {
  open: boolean;
  lotId?: string;
  artistId?: string;
  lotTitle?: string;
  lotImage?: string;
  lotPrice?: number;
}

const initialState: PurchaseModalState = {
  open: false,
};

const purchaseModalSlice = createSlice({
  name: "purchaseModal",
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<{
        lotId: string;
        artistId: string;
        lotTitle: string;
        lotImage: string;
        lotPrice: number;
      }>
    ) => {
      state.open = true;
      state.lotId = action.payload.lotId;
      state.artistId = action.payload.artistId;
      state.lotTitle = action.payload.lotTitle;
      state.lotImage = action.payload.lotImage;
      state.lotPrice = action.payload.lotPrice;
    },
    closeModal: (state) => {
      state.open = false;
      state.lotId = undefined;
      state.artistId = undefined;
      state.lotTitle = undefined;
      state.lotImage = undefined;
      state.lotPrice = undefined;
    },
  },
});

export const { openModal, closeModal } = purchaseModalSlice.actions;
export default purchaseModalSlice.reducer;
