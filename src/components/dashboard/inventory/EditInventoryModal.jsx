import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoClose } from "react-icons/io5";
import { ImSpinner8 } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { updateVendingMachine } from "../../../store/vendingMachine/VendingMachineThunk";
import { getProducts } from "../../../store/product/productThunk";

// Zod schema for form validation
const editInventorySchema = z.object({
  inventoryUpdates: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number().min(0, "Quantity must be 0 or greater"),
    })
  ),
});

const EditInventoryModal = ({
  isOpen,
  onSave,
  onClose,
  machineId,
  selectedMachine,
}) => {
  const dispatch = useDispatch();
  const { updateInventoryLoader } = useSelector(
    (state) => state.vendingMachine
  );
  const { products } = useSelector((state) => state.product);

  // Initialize state with existing products from `productInventory`
  const [editedProducts, setEditedProducts] = useState(
    selectedMachine?.productInventory
      ? Object.entries(selectedMachine.productInventory).map(
          ([productId, quantity]) => ({
            productId,
            quantity,
          })
        )
      : []
  );

  const [newProduct, setNewProduct] = useState("");
  const [newQuantity, setNewQuantity] = useState("");

  useEffect(() => {
    dispatch(getProducts()); // Fetch products

    // Update editedProducts if selectedMachine changes
    if (selectedMachine?.productInventory) {
      setEditedProducts(
        Object.entries(selectedMachine.productInventory).map(
          ([productId, quantity]) => ({
            productId,
            quantity,
          })
        )
      );
    }
  }, [selectedMachine, dispatch]);

  const {
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editInventorySchema),
  });

  if (!isOpen) return null;

  const handleClose = () => {
    setEditedProducts([]);
    setNewProduct("");
    setNewQuantity("");
    onClose();
  };

  const handleQuantityChange = (index, qty) => {
    const updatedProducts = [...editedProducts];
    updatedProducts[index].quantity = qty === "" ? "" : parseInt(qty);
    setEditedProducts(updatedProducts);
  };

  const handleAddProduct = () => {
    if (newProduct && newQuantity) {
      setEditedProducts([
        ...editedProducts,
        { productId: newProduct, quantity: parseInt(newQuantity) },
      ]);
      setNewProduct("");
      setNewQuantity("");
    }
  };

  const onSubmit = async () => {
    const inventoryUpdates = editedProducts.reduce(
      (acc, { productId, quantity }) => {
        if (productId && quantity >= 0) {
          acc[productId] = quantity;
        }
        return acc;
      },
      {}
    );

    const payload = {
      ...selectedMachine,
      productInventory: inventoryUpdates,
    };

    dispatch(
      updateVendingMachine({
        id: machineId,
        payload,
        onSuccess: () => {
          onSave();
          handleClose();
        },
        onError: (error) => {
          console.error("Error updating inventory:", error);
          handleClose();
        },
      })
    );
  };

  // Filter out products that are already in the inventory
  const availableProducts = products
    ? Object.entries(products).filter(
        ([productId]) =>
          !editedProducts.some((prod) => prod.productId === productId)
      )
    : [];

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-90 flex items-center justify-center z-50">
      <div className="w-full max-w-3xl max-h-full bg-white dark:bg-gray-800 rounded-lg overflow-auto">
        <div className="p-6 border-b dark:border-gray-600">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
              Edit Inventory
            </h2>
            <button onClick={handleClose}>
              <IoClose className="w-6 h-6 text-gray-500" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex flex-col mb-2 md:mb-4 items-start">
              <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
                Machine Name
              </label>
              <input
                value={selectedMachine?.machineName || ""}
                disabled={true}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
              />
            </div>
            <div className="flex flex-col mb-2 md:mb-4 items-start">
              <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
                Location
              </label>
              <input
                value={selectedMachine?.location || ""}
                disabled={true}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
              />
            </div>
          </div>

          {editedProducts.length > 0 ? (
            editedProducts.map((product, index) => {
              const productName =
                products && products[product.productId]
                  ? products[product.productId].productName
                  : product.productId; // Fallback to productId if name is unavailable

              return (
                <div key={product.productId} className="flex items-center gap-4 mb-4">
                  <span className="flex-1 text-gray-700 dark:text-gray-300">
                    {productName}
                  </span>
                  <input
                    type="number"
                    min="0"
                    value={product.quantity}
                    onChange={(e) => handleQuantityChange(index, e.target.value)}
                    className="w-24 p-2 border rounded-md dark:bg-gray-700"
                    placeholder="Qty"
                  />
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No products available to edit.
            </p>
          )}

          {/* <div className="flex items-center gap-4 mt-6">
            <select
              value={newProduct}
              onChange={(e) => setNewProduct(e.target.value)}
              className="flex-1 p-2 border rounded-md dark:bg-gray-700"
            >
              <option value="">Select Product to Add</option>
              {availableProducts.map(([productId, product]) => (
                <option key={productId} value={productId}>
                  {product.productName}
                </option>
              ))}
            </select>

            <input
              type="number"
              min="0"
              value={newQuantity}
              onChange={(e) => setNewQuantity(e.target.value)}
              placeholder="Qty"
              className="w-24 p-2 border rounded-md dark:bg-gray-700"
            />

            <button
              type="button"
              onClick={handleAddProduct}
              className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-md hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800"
            >
              Add Product
            </button>
          </div> */}

          <div className="flex justify-center gap-4 mt-6">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={updateInventoryLoader}
              className="px-6 py-2 text-white bg-gray-900 rounded-md hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 disabled:opacity-50"
            >
              {updateInventoryLoader ? (
                <ImSpinner8 className="w-5 h-5 animate-spin" />
              ) : (
                "Save"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditInventoryModal;
