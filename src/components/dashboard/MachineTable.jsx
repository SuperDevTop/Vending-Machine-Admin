import React from "react";

const MachineTable = () => {
  return (
    <>
      <div className="col-span-full xl:col-span-12 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
        <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
          <h2 className="font-semibold text-gray-800 dark:text-gray-100">
            Vending Machines
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
                    <div className="font-semibold text-left truncate">Serial No.</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-left truncate">Name</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-left truncate">Location</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-left truncate">Status</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-left truncate">Description</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-center truncate">Actions</div>
                  </th>
                </tr>
              </thead>
              {/* Table body */}
              <tbody className="text-sm font-medium divide-y divide-gray-100 dark:divide-gray-700/60">
                {/* Row */}
                <tr>
                  <td className="p-2">
                    <div className="text-gray-800 dark:text-gray-100">
                      12345678
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="text-gray-800 dark:text-gray-100 truncate">
                      Machine 1
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="text-gray-800 dark:text-gray-100 truncate">UK</div>
                  </td>
                  <td className="p-2">
                    <div className="text-gray-800 dark:text-gray-100 truncate">
                      Active
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="text-gray-800 dark:text-gray-100 truncate">
                      Juices and Drinks
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        // onClick={addClicked}
                        className="py-2 px-4 w-20 bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white rounded-md transition duration-200"
                      >
                        <h3>Details</h3>
                      </button>
                      <button
                        // onClick={addClicked}
                        className="py-2 px-4 w-20 bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white rounded-md transition duration-200"
                      >
                        <h3>Edit</h3>
                      </button>
                      <button
                        // onClick={addClicked}
                        className="py-2 px-4 w-20 bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white rounded-md transition duration-200"
                      >
                        <h3>Delete</h3>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default MachineTable;
