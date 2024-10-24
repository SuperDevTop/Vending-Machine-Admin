import { createSlice } from "@reduxjs/toolkit";
import {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "./productThunk";

const initialState = {
  test: null,
  products: null,
  addProductsLoader: false,
  getProductsLoader: false,
  updateProductsLoader: false,
  deleteProductsLoader: false,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    testOperator: (state) => {
      state.test = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state, action) => {
        state.addProductsLoader = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.addProductsLoader = false;
        state.products = action?.payload;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.addProductsLoader = false;
      })
      .addCase(getProducts.pending, (state, action) => {
        state.getProductsLoader = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.getProductsLoader = false;
        state.products = action?.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.getProductsLoader = false;
      })
      .addCase(updateProduct.pending, (state, action) => {
        state.updateProductsLoader = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.updateProductsLoader = false;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.updateProductsLoader = false;
      })
      .addCase(deleteProduct.pending, (state, action) => {
        state.deleteProductsLoader = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.deleteProductsLoader = false;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.deleteProductsLoader = false;
      });
  },
});

export const { testOperator } = productSlice.actions;

export default productSlice.reducer;
