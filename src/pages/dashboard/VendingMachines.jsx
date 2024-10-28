import React, { useState, useEffect } from "react";
import { HiOutlinePlusSm } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import MachineTable from "../../components/dashboard/machine/MachineTable";
import { getVendingMachines } from "../../store/vendingMachine/VendingMachineThunk";
import { ImSpinner8 } from "react-icons/im";
import { IoMdClose } from "react-icons/io";
import AddMachineModal from "../../components/dashboard/machine/AddMachineModal";
import { FaFilterCircleXmark } from "react-icons/fa6";

const VendingMachines = () => {
  const [addMachineModal, setAddMachineModal] = useState(false);
  const [filteredMachines, setFilteredMachines] = useState(null);
  const [operatorID, setOperatorID] = useState("");
  const [selectedOperator, setSelectedOperator] = useState(null);

  const { operators } = useSelector((state) => state.operator);
  const { vendingMachines, getVendingMachineLoader } = useSelector(
    (state) => state.vendingMachine
  );
  const dispatch = useDispatch();

  const addClicked = () => {
    setAddMachineModal(true);
  };
  const handleOnClose = () => {
    setAddMachineModal(false);
  };
  const handleOnSave = () => {
    dispatch(
      getVendingMachines({
        onSuccess: (data) => {
          setFilteredMachines(vendingMachines);
        },
        onError: (data) => {},
      })
    );
  };

  const handleSearch = (value) => {
    const filtered = Object.entries(vendingMachines).filter(([id, machine]) =>
      machine.machineName.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredMachines(Object.fromEntries(filtered));
  };

  const handleOperatorIDChange = (event) => {
    const value = event.target.value;
    setOperatorID(value);

    if (value === "") {
      setFilteredMachines(vendingMachines);
      setSelectedOperator(null);
    } else {
      const operator = operators ? operators[value] : null;
      setSelectedOperator(operator);
      const filtered = Object.entries(vendingMachines).filter(([id, machine]) =>
        machine.operatorId.includes(value)
      );
      setFilteredMachines(Object.fromEntries(filtered));
    }
  };

  const handleRemoveFilters = () => {
    setFilteredMachines(vendingMachines); // Reset to show all machines
    setOperatorID(""); // Clear operator filter
    setSelectedOperator(null); // Reset selected operator
  };

  useEffect(() => {
    dispatch(
      getVendingMachines({
        onSuccess: (data) => {
          setFilteredMachines(vendingMachines);
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
            Vending Machines
          </h1>
        </div>
        <div className=" flex flex-wrap md:flex-nowrap justify-center items-center gap-2 lg:gap-5">
          <div className=" w-full md:w-80  flex justify-center items-center gap-2 lg:gap-5">
            <select
              value={operatorID}
              onChange={handleOperatorIDChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 outline-none rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
            >
              <option value="">Select an operator</option>
              {operators &&
                Object.entries(operators).map(([id, operator]) => (
                  <option key={id} value={id}>
                    {operator?.fname} {operator?.lname}
                  </option>
                ))}
            </select>
            {selectedOperator && operatorID && (
              <button
                onClick={handleRemoveFilters}
                className="py-2 px-4 bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white rounded-md transition duration-200"
              >
                <FaFilterCircleXmark className="text-2xl" />
              </button>
            )}
          </div>
          <div className=" w-full flex justify-center items-center gap-2 lg:gap-5">
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
      </div>
      <div className="grid grid-cols-12 gap-6">
        {getVendingMachineLoader ? (
          <div className="col-span-12 flex justify-center items-center h-96">
            <ImSpinner8 className="spinning-icon animate-spin text-4xl" />
          </div>
        ) : (
          <MachineTable vendingMachines={filteredMachines} />
        )}
      </div>
      <AddMachineModal
        isOpen={addMachineModal}
        onClose={handleOnClose}
        onSave={handleOnSave}
      />
    </div>
  );
};

export default VendingMachines;
