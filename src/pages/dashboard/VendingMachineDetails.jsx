import React from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import ThemeToggle from "../../components/ThemeToggle";
import { ImSpinner8 } from "react-icons/im";
import { IoMdArrowBack } from "react-icons/io";

const VendingMachineDetails = () => {
  const { machineId } = useParams();
  const navigate = useNavigate();
  const { vendingMachines } = useSelector((state) => state.vendingMachine);
  const { operators } = useSelector((state) => state.operator);

  const machine = vendingMachines[machineId];
  if (!machine) {
    return (
      <div className="flex justify-center items-center min-h-screen w-full">
        <ImSpinner8 className="spinning-icon animate-spin text-4xl" />
      </div>
    );
  }

  const operator = operators[machine.operatorId];

  return (
    <>
      <div className="fixed top-10 md:top-5 right-5 z-50">
        <ThemeToggle />
      </div>

      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 dark:bg-gray-900 py-6 sm:py-12">
        <div className="relative cursor-default overflow-hidden bg-white dark:bg-gray-800 px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5  mx-auto w-[310px] md:w-[500px] rounded-lg ">
          <button
            onClick={() => navigate(-1)}
            className="py-2 px-4 mb-5 bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white rounded-md transition duration-200"
          >
            <IoMdArrowBack />
          </button>
          <div className="relative z-10">
            <span className="grid h-20 w-20 place-items-center rounded-full bg-sky-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-10 w-10 text-white"
              >
                <rect
                  x="5"
                  y="3"
                  width="14"
                  height="18"
                  rx="2"
                  ry="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line
                  x1="8"
                  y1="7"
                  x2="16"
                  y2="7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line
                  x1="8"
                  y1="11"
                  x2="16"
                  y2="11"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line
                  x1="8"
                  y1="15"
                  x2="16"
                  y2="15"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="8" cy="18.5" r="0.5" fill="currentColor" />
                <circle cx="10.5" cy="18.5" r="0.5" fill="currentColor" />
                <circle cx="13" cy="18.5" r="0.5" fill="currentColor" />
                <circle cx="15.5" cy="18.5" r="0.5" fill="currentColor" />
              </svg>
            </span>

            <div className="space-y-2 pt-5 text-base leading-7 text-gray-600 dark:text-gray-300">
              <h2 className="text-2xl font-bold pb-2 text-gray-900 dark:text-gray-100">
                {machine?.machineName}
              </h2>
              <div className="flex justify-between py-1">
                <strong>Location:</strong> {machine?.location}
              </div>

              <div className="flex justify-between py-1">
                <strong>Status:</strong>{" "}
                {machine?.status ? "Active" : "Inactive"}
              </div>
            </div>

            {operator && (
              <div className="mt-6 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                  Operator Information
                </h3>
                <div className="flex justify-between py-1">
                  <strong>Name:</strong> {operator.fname} {operator.lname}
                </div>

                <div className="flex flex-wrap truncate justify-between py-1">
                  <strong>Email:</strong> {operator.email}
                </div>
                <div className="flex justify-between py-1">
                  <strong>Phone:</strong> {operator.phoneNumber}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default VendingMachineDetails;
