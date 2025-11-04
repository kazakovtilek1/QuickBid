import { configureStore } from "@reduxjs/toolkit";
import purchaseModalReducer from "./slices/modalSlice";
import searchReducer from "./slices/searchSlice";
import { baseApi } from "./services/baseApi";

export const store = configureStore({
  reducer: {
    purchaseModal: purchaseModalReducer,
    search: searchReducer,

    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
