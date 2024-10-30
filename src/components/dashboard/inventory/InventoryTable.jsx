import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getInventoryInMachine,
  getVendingMachines,
} from "../../../store/vendingMachine/VendingMachineThunk";
import { useNavigate } from "react-router-dom";
import AddInventoryModal from "../inventory/AddInventoryModal";
import EditInventoryModal from "../inventory/EditInventoryModal";

const InventoryTable = ({ inventory, setFilteredInventory }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [selectedMachineId, setSelectedMachineId] = useState(null);
  const { vendingMachines } = useSelector((state) => state.vendingMachine);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEdit = (machineId) => {
    const machine = vendingMachines[machineId];
    setSelectedMachine(machine);
    setSelectedMachineId(machineId);
    setIsEditModalOpen(true);
  };

  const handleAdd = (machineId) => {
    const machine = vendingMachines[machineId];
    setSelectedMachineId(machineId);
    setSelectedMachine(machine);
    setIsAddModalOpen(true);
  };

  const handleEditCloseModal = () => {
    setIsEditModalOpen(false);
    setSelectedMachine(null);
    setSelectedMachineId(null);
  };

  const handleAddCloseModal = () => {
    setIsAddModalOpen(false);
    setSelectedMachine(null);
    setSelectedMachineId(null);
  };

  const handleOnSaveModal = () => {
    dispatch(
      getInventoryInMachine({
        onSuccess: (data) => {
          setFilteredInventory(data);
        },
        onError: (data) => {},
      })
    );
  };

  const handleOnAddedModal = () => {
    dispatch(
      getInventoryInMachine({
        onSuccess: (data) => {
          setFilteredInventory(data);
        },
        onError: (data) => {},
      })
    );
    dispatch(
      getVendingMachines({
        onSuccess: (data) => {
          setFilteredInventory(data);
        },
        onError: (data) => {},
      })
    );
  };

  useEffect(() => {
    dispatch(
      getVendingMachines({
        onSuccess: (data) => {},
        onError: (data) => {},
      })
    );
  }, [isEditModalOpen, isAddModalOpen]);

  return (
    <>
      <div className="col-span-full xl:col-span-12 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
        <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
          <h2 className="font-semibold text-gray-800 dark:text-gray-100">
            Inventory
          </h2>
        </header>
        <div className="p-3">
          <div className="overflow-x-auto">
            <table className="table-auto w-full dark:text-gray-300">
              <thead className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50 rounded-sm">
                <tr>
                  <th className="p-2">
                    <div className="font-semibold text-left truncate">
                      Machine Name
                    </div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-left truncate">
                      Location
                    </div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-left truncate">
                      Products
                    </div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-left truncate">
                      Actions
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm font-medium divide-y divide-gray-100 dark:divide-gray-700/60">
                {inventory &&
                  inventory.map((machine, machineIndex) => (
                    <tr key={machineIndex}>
                      <td className="p-2 font-semibold text-gray-800 dark:text-gray-100">
                        {machine.machineName}
                      </td>
                      <td className="p-2 text-gray-800 dark:text-gray-100">
                        {machine.location}
                      </td>
                      <td className="p-2 text-gray-800 dark:text-gray-100 flex gap-4 w-56 md:w-auto  overflow-x-scroll md:overflow-x-auto">
                        {machine.products.length > 0 ? (
                          machine.products.map((product, productIndex) => (
                            <div key={productIndex} className="flex flex-col">
                              <span>{product.productName}</span>
                              <span>
                                Quanity: {product.inventoryCount || "-"}
                              </span>
                            </div>
                          ))
                        ) : (
                          <span>No products available</span>
                        )}
                      </td>
                      <td className="p-2">
                        <div className="flex items-center justify-center gap-2">
                          {machine.products.length > 0 ? (
                            <button
                              className="py-2 px-4 w-20 bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white rounded-md transition duration-200"
                              //   onClick={() => handleEdit(machine.machineId)}
                            >
                              <h3>Edit</h3>
                            </button>
                          ) : (
                            <button
                              onClick={() => handleAdd(machine.machineId)}
                              className="py-2 px-4 w-20 bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white rounded-md transition duration-200"
                            >
                              <h3>Add</h3>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {isAddModalOpen && (
        <AddInventoryModal
          isOpen={isAddModalOpen}
          onSave={handleOnAddedModal}
          onClose={handleAddCloseModal}
          machineId={selectedMachineId}
          selectedMachine={selectedMachine}
        />
      )}
      {isEditModalOpen && (
        <EditInventoryModal
          isOpen={isEditModalOpen}
          onSave={handleOnSaveModal}
          onClose={handleEditCloseModal}
        />
      )}
    </>
  );
};

export default InventoryTable;
