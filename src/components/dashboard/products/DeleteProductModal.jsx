import React from "react";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../../../store/product/productThunk";
import { ImSpinner8 } from "react-icons/im";

const DeleteProductModal = ({
  productId,
  product,
  isOpen,
  onClose,
  onDelete,
}) => {
  const dispatch = useDispatch();
  const { deleteProductsLoader } = useSelector((state) => state.product);

  if (!isOpen) {
    return null;
  }

  const handleDelete = async () => {
    try {
      dispatch(
        deleteProduct({
          id: productId,
          onSuccess: (value) => {
            onDelete();
            onClose();
          },
          onError: (value) => {
            onClose();
          },
        })
      );
    } catch (error) {
      console.error("Error deleting machine:", error);
    }
  };

  return (
    <div
      className="fixed top-0 left-0 right-0 bg-gray-800 bg-opacity-90 flex items-center justify-center md:inset-0 h-[calc(100%-1rem)] max-h-full"
      style={{ zIndex: 1000 }}
    >
      <div className="flex flex-col w-full max-w-md max-h-full bg-white dark:bg-gray-800 text-center text-xs rounded-lg text-black dark:text-white font-quicksand box-border border dark:border-gray-600 overflow-auto">
        <div className="mt-4 mr-4 flex justify-center items-center">
          <button type="button" onClick={onClose} className="ml-auto">
            <IoClose size={30} color="#A0AEC0" />
          </button>
        </div>

        <div className="mt-2 flex justify-center items-center">
          <svg
            className="mx-auto mb-2 text-gray-400 w-12 h-12 dark:text-gray-200"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>

        <div className="p-6 text-center">
          <h3 className="mb-2 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to delete this product?
          </h3>
          <div className="mb-2 text-lg font-normal text-gray-500 dark:text-gray-400">
            <strong>{product.productName}</strong>
          </div>
        </div>
        <div className="flex justify-center gap-2 w-full h-[50px] mb-10">
          <button
            onClick={onClose}
            className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-0 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          >
            No, cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={deleteProductsLoader}
            className="text-white bg-red-600 hover:bg-red-800 focus:ring-0 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
          >
            {deleteProductsLoader ? (
              <ImSpinner8 className="spinning-icon animate-spin text-4xl" />
            ) : (
              "Yes, I'm sure"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProductModal;
