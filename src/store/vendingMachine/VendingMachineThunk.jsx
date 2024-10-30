import { createAsyncThunk } from "@reduxjs/toolkit";
import { ref, set, get, update, remove, child } from "firebase/database";
import { db } from "../../config/firebase";

export const addVendingMachine = createAsyncThunk(
  "vendingMachine/addVendingMachine",
  async ({ id, payload, onSuccess, onError }, thunkAPI) => {
    try {
      await set(ref(db, `vendingMachine/${id}`), payload);
      onSuccess();
    } catch (error) {
      onError(error.data.details || "something went wrong");

      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getVendingMachines = createAsyncThunk(
  "vendingMachine/getVendingMachines",
  async ({ onSuccess, onError }, thunkAPI) => {
    try {
      const machinesRef = ref(db, "vendingMachine");
      const snapshot = await get(machinesRef);

      if (!snapshot.exists()) {
        onSuccess({});
        return {};
      }

      const data = snapshot.val();

      onSuccess(data);
      return data;
    } catch (error) {
      onError(error.message || "Something went wrong");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateVendingMachine = createAsyncThunk(
  "vendingMachine/updateVendingMachine",
  async ({ id, payload, onSuccess, onError }, thunkAPI) => {
    try {
      const machinesRef = ref(db, `vendingMachine/${id}`);
      await update(machinesRef, payload);
      onSuccess();
    } catch (error) {
      onError(error.data.details || "something went wrong");

      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteVendingMachine = createAsyncThunk(
  "vendingMachine/VendingMachine",
  async ({ id, onSuccess, onError }, thunkAPI) => {
    try {
      await remove(ref(db, `vendingMachine/${id}`));
      onSuccess();
    } catch (error) {
      onError(error.data.details || "something went wrong");

      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addUpdateInventoryInMachine = createAsyncThunk(
  "vendingMachine/addUpdateInventoryInMachine",
  async ({ id, payload, onSuccess, onError }, thunkAPI) => {
    try {
      await update(ref(db, `vendingMachine/${id}`), payload);
      onSuccess();
    } catch (error) {
      onError(error.data.details || "something went wrong");

      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getInventoryInMachine = createAsyncThunk(
  "vendingMachine/getInventoryInMachine",
  async ({ onSuccess, onError }, thunkAPI) => {
    try {
      // Fetch vending machine data
      const vendingMachineSnapshot = await get(ref(db, `vendingMachine`));
      const vendingMachines = vendingMachineSnapshot.val();

      // Fetch products data
      const productsSnapshot = await get(ref(db, `products`));
      const products = productsSnapshot.val();

      const inventoryData = [];

      for (const [machineId, machineData] of Object.entries(vendingMachines)) {
        const { machineName, location, productInventory } = machineData;
        const machineInventory = {
          machineId,
          machineName,
          location,
          products: [],
        };

        // Check if productInventory exists and is not empty
        if (productInventory && Object.keys(productInventory).length > 0) {
          // Iterate over each product in the inventory
          for (const [productId, inventoryCount] of Object.entries(
            productInventory
          )) {
            const productData = products[productId];

            // Check if the product data exists
            if (productData) {
              machineInventory.products.push({
                productId,
                productName: productData.productName,
                productPrice: productData.price,
                inventoryCount,
              });
            }
          }
        } else {
          // If productInventory is empty or undefined, add a message
          machineInventory.message = "No products available in this machine.";
        }

        // Add machine inventory to the main inventory data
        inventoryData.push(machineInventory);
      }

      // Invoke onSuccess callback with the processed data
      onSuccess(inventoryData);
      return inventoryData;
    } catch (error) {
      // Invoke onError callback with error details
      onError(error.message || "Something went wrong");
      return thunkAPI.rejectWithValue(error);
    }
  }
);
