import React, { useState, useEffect } from "react";
import AddOperatorModal from "../../components/dashboard/operators/AddOperatorModal";
import { HiOutlinePlusSm } from "react-icons/hi";
import OperatorTable from "../../components/dashboard/operators/OperatorTable";
import { useDispatch, useSelector } from "react-redux";
import { getOperators } from "../../store/operator/operatorThunk";
import { ImSpinner8 } from "react-icons/im";

const OperatorList = () => {
  const [addOperatorModal, setAddOperatorModal] = useState(false);
  const [filteredOperator, setFilteredOperators] = useState(null);
  const { operators, getOperatorsLoader } = useSelector(
    (state) => state.operator
  );
  const dispatch = useDispatch();

  const addClicked = () => {
    setAddOperatorModal(true);
  };
  const handleOnClose = () => {
    setAddOperatorModal(false);
  };
  const handleOnSave = () => {
    dispatch(
      getOperators({
        onSuccess: (data) => {
          setFilteredOperators(operators);
        },
        onError: (data) => {},
      })
    );
  };
  useEffect(() => {
    dispatch(
      getOperators({
        onSuccess: (data) => {
          setFilteredOperators(operators);
        },
        onError: (data) => {},
      })
    );
  }, []);

  const handleSearch = (value) => {
    const filtered = Object.entries(operators).filter(
      ([id, operator]) =>
        operator.fname.toLowerCase().includes(value.toLowerCase()) ||
        operator.lname.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOperators(Object.fromEntries(filtered));
  };

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
      <div className="grid grid-cols-12 gap-6">
        {getOperatorsLoader ? (
          <div className="col-span-12 flex justify-center items-center h-96">
            <ImSpinner8 className="spinning-icon animate-spin text-4xl" />
          </div>
        ) : (
          <OperatorTable operators={filteredOperator} />
        )}
      </div>
      <AddOperatorModal
        isOpen={addOperatorModal}
        onSave={handleOnSave}
        onClose={handleOnClose}
      />
    </div>
  );
};

export default OperatorList;
