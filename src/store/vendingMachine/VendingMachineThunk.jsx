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
      // Step 1: Get the vending machine data to find the operator ID
      const vendingMachineRef = ref(db, `vendingMachine/${id}`);
      const vendingMachineSnapshot = await get(vendingMachineRef);

      if (vendingMachineSnapshot.exists()) {
        const vendingMachineData = vendingMachineSnapshot.val();
        const operatorId = vendingMachineData.operatorId;

        // Step 2: Remove the vending machine from the vendingMachine node
        await remove(vendingMachineRef);
        console.log(
          `Vending machine with ID ${id} deleted successfully.`
        );

        // Step 3: Access the assignedMachines list under the specific operator
        const operatorRef = ref(db, `operators/${operatorId}/assignedMachines`);
        const operatorSnapshot = await get(operatorRef);

        if (operatorSnapshot.exists()) {
          const assignedMachines = operatorSnapshot.val();
          let machineKeyToDelete = null;

          // Find the key for the machineId we want to delete
          Object.keys(assignedMachines).forEach((key) => {
            if (assignedMachines[key] === id) {
              machineKeyToDelete = key;
            }
          });

          if (machineKeyToDelete) {
            // Remove the machine from the assignedMachines list
            const machineRefToDelete = ref(
              db,
              `operators/${operatorId}/assignedMachines/${machineKeyToDelete}`
            );
            await remove(machineRefToDelete);
            console.log(
              `Machine ID ${id} removed from operator's assignedMachines list.`
            );
          } else {
            console.log(
              `Machine ID ${id} not found in operator's assignedMachines list.`
            );
          }
        } else {
          console.log("Operator's assignedMachines list not found.");
        }
      } else {
        console.log("Vending machine not found.");
      }

      // await remove(ref(db, `vendingMachine/${id}`));

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
