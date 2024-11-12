import React, { useState } from "react";
import { useDispatch } from "react-redux";
import EditMachineModal from "./EditMachineModal";
import DeleteMachineModal from "./DeleteMachineModal";
import { getVendingMachines } from "../../../store/vendingMachine/VendingMachineThunk";
import { useNavigate } from "react-router-dom";

const MachineTable = ({ vendingMachines, setFilteredMachines }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to handle edit
  const handleEdit = (id, machine) => {
    setSelectedMachine(machine);
    setSelectedId(id);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id, machine) => {
    setSelectedId(id);
    setSelectedMachine(machine);
    setIsDeleteModalOpen(true);
  };

  const handleDetails = (id) => {
    navigate(`/dashboard/vending-machines/${id}`);
  };

  const handleEditCloseModal = () => {
    setIsEditModalOpen(false);
    setSelectedMachine(null);
    setSelectedId(null);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedMachine(null);
    setSelectedId(null);
  };
  const handleOnSaveModal = () => {
    dispatch(
      getVendingMachines({
        onSuccess: (data) => {
          setFilteredMachines(data);
        },
        onError: (data) => {},
      })
    );
  };

  const handleOnDeleteModal = () => {
    dispatch(
      getVendingMachines({
        onSuccess: (data) => {
          setFilteredMachines(data);
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
            Machines
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
                    <div className="font-semibold text-left truncate">Serial Number</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-left truncate">Name</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-left truncate">
                      Location
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
                {vendingMachines &&
                  Object.entries(vendingMachines).map(([id, machine]) => {
                    return (
                      <tr key={id}>
                        <td className="p-2">
                          <div className="text-gray-800 dark:text-gray-100">
                            {machine?.serialNo}
                          </div>
                        </td>
                        <td className="p-2">
                          <div className="text-gray-800 dark:text-gray-100">
                            {machine?.machineName}
                          </div>
                        </td>
                        <td className="p-2">
                          <div className="text-gray-800 dark:text-gray-100 truncate">
                            {machine?.location}
                          </div>
                        </td>
                        <td className="p-2">
                          <div className="text-gray-800 dark:text-gray-100 truncate">
                            {machine?.status == true ? "Active" : "Inactive"}
                          </div>
                        </td>
                        <td className="p-2">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleDetails(id)}
                              className="py-2 px-4 w-20 bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white rounded-md transition duration-200"
                            >
                              <h3>Details</h3>
                            </button>
                            <button
                              onClick={() => handleEdit(id, machine)}
                              className="py-2 px-4 w-20 bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white rounded-md transition duration-200"
                            >
                              <h3>Edit</h3>
                            </button>
                            <button
                              onClick={() => handleDelete(id, machine)}
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
        <EditMachineModal
          isOpen={isEditModalOpen}
          onClose={handleEditCloseModal}
          onSave={handleOnSaveModal}
          machine={selectedMachine}
          id={selectedId}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteMachineModal
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          onDelete={handleOnDeleteModal}
          machineId={selectedId}
          machine={selectedMachine}
        />
      )}
    </>
  );
};

export default MachineTable;
