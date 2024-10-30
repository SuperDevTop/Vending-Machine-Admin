import React, { useState } from "react";
import EditOperatorModal from "./EditOperatorModal";
import DeleteOperatorModal from "./DeleteOperatorModal";
import { getOperators } from "../../../store/operator/operatorThunk";
import { useDispatch } from "react-redux";

const OperatorTable = ({ operators, setFilteredOperators }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedOperator, setSelectedOperator] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const dispatch = useDispatch();

  // Function to handle edit
  const handleEdit = (id, operator) => {
    setSelectedOperator(operator);
    setSelectedId(id);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id, operator) => {
    setSelectedId(id);
    setSelectedOperator(operator);
    setIsDeleteModalOpen(true);
  };

  const handleEditCloseModal = () => {
    setIsEditModalOpen(false);
    setSelectedOperator(null);
    setSelectedId(null);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedOperator(null);
    setSelectedId(null);
  };
  const handleOnSaveModal = () => {
    dispatch(
      getOperators({
        onSuccess: (data) => {
          setFilteredOperators(data);
        },
        onError: (data) => {},
      })
    );
  };

  const handleOnDeleteModal = () => {
    dispatch(
      getOperators({
        onSuccess: (data) => {
          setFilteredOperators(data);
        },
        onError: (data) => {},
      })
    );
  };
  return (
    <>
      <div className="col-span-full xl:col-span-12 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
        <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
          <h2 className="font-semibold text-gray-800 dark:text-gray-100">
            Operators
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
                    <div className="font-semibold text-left truncate">
                      Name
                    </div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-left truncate">
                      Email
                    </div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-left truncate">
                      Phone Number
                    </div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-left truncate">
                      Status
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
                {operators &&
                  Object.entries(operators).map(([id, operator]) => {
                    return (
                      <tr key={id}>
                        <td className="p-2">
                          <div className="text-gray-800 dark:text-gray-100">
                            {operator?.name}
                          </div>
                        </td>
                        <td className="p-2">
                          <div className="text-gray-800 dark:text-gray-100 truncate">
                            {operator?.email}
                          </div>
                        </td>
                        <td className="p-2">
                          <div className="text-gray-800 dark:text-gray-100 truncate">
                            {operator?.phoneNumber}
                          </div>
                        </td>
                        <td className="p-2">
                          <div className="text-gray-800 dark:text-gray-100 truncate">
                            {operator?.status == true ? "Active" : "Inactive"}
                          </div>
                        </td>
                        <td className="p-2">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleEdit(id, operator)}
                              className="py-2 px-4 w-20 bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white rounded-md transition duration-200"
                            >
                              <h3>Edit</h3>
                            </button>
                            <button
                              onClick={() => handleDelete(id, operator)}
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
        <EditOperatorModal
          isOpen={isEditModalOpen}
          onClose={handleEditCloseModal}
          onSave={handleOnSaveModal}
          operator={selectedOperator}
          id={selectedId}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteOperatorModal
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          onDelete={handleOnDeleteModal}
          operatorId={selectedId}
          operator={selectedOperator}
        />
      )}
    </>
  );
};

export default OperatorTable;
