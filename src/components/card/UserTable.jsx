import React from "react";
import { useSelector } from "react-redux";

const UserTable = ({ users, onAddProduct }) => {
  const { products } = useSelector((state) => state.product);

  return (
    <div className="col-span-full xl:col-span-12 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">
          Users and Redeemable Products
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
                  <div className="font-semibold text-left truncate">Email</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-left truncate">
                    Redeemable Products
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
              {users &&
                Object.entries(users).map(([userId, user]) => (
                  <tr key={userId}>
                    <td className="p-2">
                      <div className="text-gray-800 dark:text-gray-100">
                        {user?.name}
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="text-gray-800 dark:text-gray-100 truncate">
                        {user?.email}
                      </div>
                    </td>
                    <td className="p-2">
                      {/* Display redeemable products */}
                      {user.productCredits ? (
                        <div className="space-y-2">
                          {Object.entries(user.productCredits).map(
                            ([productId, credit]) => (
                              <div
                                key={`${userId}-${productId}`}
                                className="flex justify-between items-center w-56 md:w-auto"
                              >
                                <span className="text-gray-800 dark:text-gray-100">
                                  {products[productId]?.productName || "Unknown Product"}
                                </span>
                                <span className="text-gray-600 dark:text-gray-400">
                                  Credits: {credit}
                                </span>
                              </div>
                            )
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-500 dark:text-gray-400">
                          No redeemable products assigned
                        </span>
                      )}
                    </td>
                    <td className="p-2">
                      <div className="flex items-center w-56 md:w-auto justify-center">
                        <button
                          onClick={() => onAddProduct(userId,user)}
                          className="py-2 px-4 w-30 bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white rounded-md transition duration-200"
                        >
                          Add Product for Redemption
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
