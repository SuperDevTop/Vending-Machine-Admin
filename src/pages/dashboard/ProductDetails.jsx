import React from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import ThemeToggle from "../../components/ThemeToggle";
import { ImSpinner8 } from "react-icons/im";
import { IoMdArrowBack } from "react-icons/io";

const ProductsDetails = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const { products } = useSelector((state) => state.product);
  const { vendingMachines } = useSelector((state) => state.vendingMachine);

  const product = products[productId];
  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen w-full">
        <ImSpinner8 className="spinning-icon animate-spin text-4xl" />
      </div>
    );
  }

  const machine = vendingMachines[product.machineID];

  return (
    <>
      <div className="fixed top-10 md:top-5 right-5 z-50">
        <ThemeToggle />
      </div>

      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 dark:bg-gray-900 py-6 sm:py-12">
        <div className="relative cursor-default overflow-hidden bg-white dark:bg-gray-800 px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 mx-auto w-[310px] md:w-[500px] rounded-lg ">
          <button
            onClick={() => navigate(-1)}
            className="py-2 px-4 mb-5 bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white rounded-md transition duration-200"
          >
            <IoMdArrowBack />
          </button>
          <div className="relative z-10  ">
            <span className="grid h-20 w-20 place-items-center rounded-full bg-sky-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-10 w-10 text-white transition-all"
              >
                <rect
                  x="5"
                  y="6"
                  width="14"
                  height="12"
                  rx="2"
                  ry="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <line
                  x1="7"
                  y1="10"
                  x2="17"
                  y2="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <line
                  x1="7"
                  y1="14"
                  x2="17"
                  y2="14"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8.5 6V4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 .5.5V6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>

            <div className="space-y-2 pt-5 text-base leading-7 text-gray-600 dark:text-gray-300">
              <h2 className="text-2xl font-bold pb-2 text-gray-900 dark:text-gray-100">
                {product?.productName}
              </h2>
              <div className="flex justify-between py-1">
                <strong>Price:</strong> <span>{product?.price}</span>
              </div>
            </div>


          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsDetails;
