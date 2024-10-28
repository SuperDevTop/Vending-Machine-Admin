import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { assignProductSchema } from "../../schemas/index";
import { useDispatch, useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import { ImSpinner8 } from "react-icons/im";

// Redux actions
import { updateUser } from "../../store/card/CardThunk";

const AssignRedeemableProductModal = ({ isOpen, onClose, onSave, userId, user }) => {
  // Redux hooks
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  const { updateUsersLoader } = useSelector((state) => state.card);

  // Form handling
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(assignProductSchema),
    defaultValues: {
      selectedProductId: "",
      creditAmount: null,
    },
  });

  // Early return if modal is not open
  if (!isOpen) return null;

  // Event handlers
  const handleClose = () => {
    reset();
    onClose();
  };

  // Form submission handler
  const onSubmit = async (data) => {
    const { selectedProductId, creditAmount } = data;

    // Calculate updated product credits
    const updatedProductCredits = {
      ...user.productCredits,
      [selectedProductId]: user.productCredits[selectedProductId]
        ? user.productCredits[selectedProductId] + creditAmount
        : creditAmount,
    };

    const payload = {
      ...user,
      productCredits: updatedProductCredits,
    };

    dispatch(
      updateUser({
        userID: userId,
        payload,
        onSuccess: () => {
          onSave();
          handleClose();
        },
        onError: () => {
          handleClose();
        },
      })
    );
  };

  // UI Components
  const FormField = ({ label, children, error }) => (
    <div className="mb-4">
      <label className="block text-left text-gray-700 dark:text-gray-300 font-bold mb-2">
        {label}
      </label>
      {children}
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
    </div>
  );

  return (
    <div
      className="fixed top-0 left-0 right-0 bg-gray-800 bg-opacity-90 flex items-center justify-center md:inset-0 h-[calc(100%-1rem)] max-h-full"
      style={{ zIndex: 1000 }}
    >
      <div className="flex flex-col w-full max-w-lg bg-white dark:bg-gray-800 border dark:border-gray-600 text-center rounded-lg text-black dark:text-white">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-300 dark:border-gray-700">
          <h2 className="text-lg font-bold">Assign Redeemable Product</h2>
          <button type="button" onClick={handleClose}>
            <IoClose size={24} color="#A0AEC0" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          {/* Product Select */}
          <FormField 
            label="Select Product"
            error={errors.selectedProductId?.message}
          >
            <select
              {...register("selectedProductId")}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
            >
              <option value="">Select a product</option>
              {products &&
                Object.entries(products).map(([id, product]) => (
                  <option key={id} value={id}>
                    {product.productName}
                  </option>
                ))}
            </select>
          </FormField>

          {/* Credit Amount Input */}
          <FormField 
            label="Enter Credit Amount"
            error={errors.creditAmount?.message}
          >
            <input
              type="number"
              {...register("creditAmount", { valueAsNumber: true })}
              min="1"
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
            />
          </FormField>

          {/* Action Buttons */}
          <div className="flex justify-center my-0 md:my-6 gap-2">
            <button
              onClick={handleClose}
              className="mt-4 w-32 py-2 px-4 text-gray-800 dark:text-gray-100 border dark:border rounded-md transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={updateUsersLoader}
              className="mt-4 w-48 py-2 px-4 bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white rounded-md transition duration-200"
            >
              {updateUsersLoader ? (
                <ImSpinner8 className="spinning-icon" />
              ) : (
                "Assign Product"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignRedeemableProductModal;