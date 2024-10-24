import React, { useState } from "react";
import EditProductModal from "./EditProductModal";
import DeleteProductModal from "./DeleteProductModal";
import { getProducts } from "../../../store/product/productThunk";
import { useDispatch } from "react-redux";

const ProductTable = ({ products }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const dispatch = useDispatch();

  // Function to handle edit
  const handleEdit = (id, product) => {
    setSelectedProduct(product);
    setSelectedId(id);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id, product) => {
    setSelectedId(id);
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const handleEditCloseModal = () => {
    setIsEditModalOpen(false);
    setSelectedProduct(null);
    setSelectedId(null);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedProduct(null);
    setSelectedId(null);
  };
  const handleOnSaveModal = () => {
    dispatch(
      getProducts({
        onSuccess: (data) => {},
        onError: (data) => {},
      })
    );
  };

  const handleOnDeleteModal = () => {
    dispatch(
      getProducts({
        onSuccess: (data) => {},
        onError: (data) => {},
      })
    );
  };
  return (
    <>
      <div className="col-span-full xl:col-span-12 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
        <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
          <h2 className="font-semibold text-gray-800 dark:text-gray-100">
            Products
          </h2>
        </header>
        <div className="p-3">
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="table-auto w-full dark:text-gray-300">
              {/* Table header */}
              <thead className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50 rounded-sm">
                <tr>
                  <th className="p-2">
                    <div className="font-semibold text-left truncate">Name</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-left truncate">
                      Category
                    </div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-left truncate">
                      Inventory
                    </div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-left truncate">
                      Price
                    </div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-center truncate">
                      Actions
                    </div>
                  </th>
                </tr>
              </thead>
              {/* Table body */}
              <tbody className="text-sm font-medium divide-y divide-gray-100 dark:divide-gray-700/60">
                {/* Row */}
                {products &&
                  Object.entries(products).map(([id, product]) => {
                    return (
                      <tr key={id}>
                        <td className="p-2">
                          <div className="text-gray-800 dark:text-gray-100">
                            {product?.productName}
                          </div>
                        </td>
                        <td className="p-2">
                          <div className="text-gray-800 dark:text-gray-100 truncate">
                            {product?.category}
                          </div>
                        </td>
                        <td className="p-2">
                          <div className="text-gray-800 dark:text-gray-100 truncate">
                            {product?.inventory}
                          </div>
                        </td>
                        <td className="p-2">
                          <div className="text-gray-800 dark:text-gray-100 truncate">
                            {product?.price}
                          </div>
                        </td>
                        <td className="p-2">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleEdit(id, product)}
                              className="py-2 px-4 w-20 bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white rounded-md transition duration-200"
                            >
                              <h3>Edit</h3>
                            </button>
                            <button
                              onClick={() => handleDelete(id, product)}
                              className="py-2 px-4 w-20 bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white rounded-md transition duration-200"
                            >
                              <h3>Delete</h3>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {isEditModalOpen && (
        <EditProductModal
          isOpen={isEditModalOpen}
          onClose={handleEditCloseModal}
          onSave={handleOnSaveModal}
          product={selectedProduct}
          id={selectedId}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteProductModal
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          onDelete={handleOnDeleteModal}
          product={selectedProduct}
          productId={selectedId}
        />
      )}
    </>
  );
};

export default ProductTable;
