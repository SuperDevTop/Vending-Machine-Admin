import React from "react";
import { useSelector } from "react-redux";

const UserTable = ({ users }) => {
  return (
    <div className="col-span-full xl:col-span-12 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">
          Users
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
                  <div className="font-semibold text-left truncate">No.</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-left truncate">Name</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-left truncate">
                    Staff ID
                  </div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-left truncate">
                    Cost Centre
                  </div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-left truncate">
                    Department Name
                  </div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-gray-100 dark:divide-gray-700/60">
              {users &&
                Object.entries(users)
                  .sort((a, b) => a[1].No - b[1].No)
                  .map(([userId, user]) => (
                    <tr key={userId}>
                      <td className="p-2">
                        <div className="text-gray-800 dark:text-gray-100">
                          {user?.No}
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="text-gray-800 dark:text-gray-100 truncate">
                          {user?.Name}
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="text-gray-800 dark:text-gray-100 truncate">
                          {user?.StaffID}
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="text-gray-800 dark:text-gray-100 truncate">
                          {user?.Costcentre}
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="text-gray-800 dark:text-gray-100 truncate">
                          {user?.DepartmentName}
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
