import React, { useState, useEffect } from "react";
import AddProductModal from "../../components/dashboard/products/AddProductModal";
import { HiOutlinePlusSm } from "react-icons/hi";
import ProductTable from "../../components/dashboard/products/ProductTable";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../store/product/productThunk";
import { ImSpinner8 } from "react-icons/im";

const ProductManagement = () => {
  const [addProductModal, setAddProductModal] = useState(false);
  const [filteredProduct, setFilteredProducts] = useState(null);
  const { products, getProductsLoader } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const addClicked = () => {
    setAddProductModal(true);
  };
  const handleOnClose = () => {
    setAddProductModal(false);
  };
  const handleOnSave = () => {
    dispatch(
      getProducts({
        onSuccess: (data) => {
          setFilteredProducts(data);
        },
        onError: (data) => {},
      })
    );
  };

  useEffect(() => {
    dispatch(
      getProducts({
        onSuccess: (data) => {
          setFilteredProducts(data);
        },
        onError: (data) => {},
      })
    );
  }, []);
  
  const handleSearch = (value) => {
    const filtered = Object.entries(products).filter(([id, product]) =>
      product.productName.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProducts(Object.fromEntries(filtered));
  };

  return (
    <div>
      <div className="sm:flex sm:justify-between sm:items-center mb-8">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
            Product List
          </h1>
        </div>
        <div className="flex justify-center items-center gap-2 lg:gap-5">
          <input
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
            type="text"
            placeholder="Search..."
            onChange={(e) => handleSearch(e.target.value)}
          />
          <button
            onClick={addClicked}
            className="py-2 px-4 bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white rounded-md transition duration-200"
          >
            <div className="flex items-center gap-1">
              <HiOutlinePlusSm className="text-2xl" />
              <h3>Add</h3>
            </div>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-6">
        {getProductsLoader ? (
          <div className="col-span-12 flex justify-center items-center h-96">
            <ImSpinner8 className="spinning-icon animate-spin text-4xl" />
          </div>
        ) : (
          <ProductTable products={filteredProduct} setFilteredProducts={setFilteredProducts}/>
        )}
      </div>
      <AddProductModal
        isOpen={addProductModal}
        onSave={handleOnSave}
        onClose={handleOnClose}
      />
    </div>
  );
};

export default ProductManagement;
