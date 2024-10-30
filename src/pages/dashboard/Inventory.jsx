import React, { useState, useEffect } from "react";
import AddOperatorModal from "../../components/dashboard/operators/AddOperatorModal";
import InventoryTable from "../../components/dashboard/inventory/InventoryTable";
import { useDispatch, useSelector } from "react-redux";
import {
  getInventoryInMachine,
  getVendingMachines,
} from "../../store/vendingMachine/VendingMachineThunk";
import { ImSpinner8 } from "react-icons/im";
import { getProducts } from "../../store/product/productThunk";
const Inventory = () => {
  const [addInventoryModal, setAddInventoryModal] = useState(false);
  const [filteredInventory, setFilteredInventory] = useState(null);
  const { inventory, getInventoryLoader } = useSelector(
    (state) => state.vendingMachine
  );
  const dispatch = useDispatch();

  const addClicked = () => {
    setAddInventoryModal(true);
  };
  const handleOnClose = () => {
    setAddInventoryModal(false);
  };
  const handleOnSave = () => {
    dispatch(
      getInventoryInMachine({
        onSuccess: (data) => {
          setFilteredInventory(data);
        },
        onError: (data) => {},
      })
    );
  };

  const handleSearch = (value) => {
    const filtered = inventory.filter(
      (item) =>
        item.machineName.toLowerCase().includes(value.toLowerCase()) ||
        item.productName.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredInventory(filtered);
  };

  useEffect(() => {
    dispatch(
      getVendingMachines({
        onSuccess: (data) => {
        },
        onError: (data) => {},
      })
    );
    dispatch(
      getProducts({
        onSuccess: (data) => {
        },
        onError: (data) => {},
      })
    );
    dispatch(
      getInventoryInMachine({
        onSuccess: (data) => {
          setFilteredInventory(data);
        },
        onError: (data) => {},
      })
    );
  }, []);
  return (
    <div>
      <div className="sm:flex sm:justify-between sm:items-center mb-8">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
            Inventory
          </h1>
        </div>
        <div className=" flex justify-center items-center gap-2 lg:gap-5">
          <input
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
            type="text"
            placeholder="Search..."
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-6">
        {getInventoryLoader ? (
          <div className="col-span-12 flex justify-center items-center h-96">
            <ImSpinner8 className="spinning-icon animate-spin text-4xl" />
          </div>
        ) : (
          <InventoryTable
            inventory={filteredInventory}
            setFilteredInventory={setFilteredInventory}
          />
        )}
      </div>
    </div>
  );
};

export default Inventory;
