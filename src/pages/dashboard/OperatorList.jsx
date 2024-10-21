import React from "react";
import DashboardCard07 from "../../partials/dashboard/DashboardCard07";
import { HiOutlinePlusSm } from "react-icons/hi";

const OperatorList = () => {
  return (
    <div>
      <div className="sm:flex sm:justify-between sm:items-center mb-8">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
            Operator List
          </h1>
        </div>
        <div className=" flex justify-center items-center gap-2 lg:gap-5">
          <input
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
            type="text"
            placeholder="Search..."
            // onChange={onFilterTextChange}
          />
          <button
            // onClick={addClicked}
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
        {/* Table (Top Channels) */}
        {/* <DashboardCard07 /> */}
      </div>
    </div>
  );
};

export default OperatorList;
