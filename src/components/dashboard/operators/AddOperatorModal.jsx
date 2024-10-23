import React, { useState } from "react";
import { useThemeProvider } from "../../../utils/ThemeContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddOperatorSchema } from "../../../schemas/index";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { nanoid } from "nanoid";
import { addOperator } from "../../../store/operator/operatorThunk";
import { ImSpinner8 } from "react-icons/im";

const AddOperatorModal = ({ isOpen, onSave, onClose }) => {
  const { currentTheme } = useThemeProvider();
  const dispatch = useDispatch();
  const { addOperatorsLoader } = useSelector((state) => state.operator);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(AddOperatorSchema),
    defaultValues: {
      fname: "",
      lname: "",
      email: "",
      phoneNumber: "",
    },
  });

  const [phone, setPhone] = useState("");

  const handlePhoneChange = (value) => {
    setPhone(value);
    setValue("phoneNumber", value);
  };

  const inputStyles = {
    border: "0px",
    width: "100%",
    backgroundColor: "transparent",
    padding: "8px",
    borderRadius: "4px",
    outline: "none",
    boxShadow: "none",
    color: currentTheme === "light" ? "black" : "#f9f9f9",
  };

  const countrySelectorStyleProps = {
    buttonStyle: {
      border: "none",
      backgroundColor: "transparent",
    },
    dropdownStyleProps: {
      style: {
        borderRadius: "5px",
        backgroundColor: currentTheme === "light" ? "#ffffff" : "#2d3748",
        color: currentTheme === "light" ? "#2d3748" : "#f9f9f9",
      },
    },
  };

  if (!isOpen) {
    return null;
  }

  const onSubmit = async (data) => {
    data.phoneNumber = phone;
    const uniqueId = nanoid();
    const result = AddOperatorSchema.safeParse(data);
    if (result?.success) {
      const payload = {
        ...data,
        status: true,
        assignedMachines: [],
      };
      dispatch(
        addOperator({
          id: uniqueId,
          payload: payload,
          onSuccess: (value) => {
            onSave();
            onClose();
            reset();
          },
          onError: (value) => {
            onClose(); // Close the modal after saving
            reset();
          },
        })
      );
    }
  };

  return (
    <>
      <div
        className="fixed top-0 left-0 right-0 bg-gray-800 bg-opacity-90 flex items-center justify-center md:inset-0 h-[calc(100%-1rem)] max-h-full"
        style={{ zIndex: 1000 }}
      >
        <div className="flex flex-col w-full max-w-3xl max-h-full bg-white dark:bg-gray-800 border dark:border-gray-600 text-center text-xs rounded-lg text-black dark:text-white font-quicksand box-border border-b-[1px] border-solid border-gainsboro overflow-auto">
          <div className="bg-white dark:bg-gray-800 px-8 py-2 mb-8">
            <h2 className="flex items-center text-start font-bold left-[29px] text-[18px] text-dimgray">
              ADD OPERATOR
              <button type="button" onClick={onClose} className="ml-auto">
                <IoClose size={30} color="#A0AEC0" />
              </button>
            </h2>
          </div>

          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col mb-2 md:mb-4 items-start">
              <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
                First Name
              </label>
              <input
                type="text"
                {...register("fname")}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                placeholder="Enter your first name"
                required
              />
              <p className="mt-1 text-sm text-destructive">
                {errors?.fname?.message}
              </p>
            </div>
            <div className="flex flex-col mb-2 md:mb-4 items-start">
              <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
                Last Name
              </label>
              <input
                type="text"
                {...register("lname")}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                placeholder="Enter your last name"
                required
              />
              <p className="mt-1 text-sm text-destructive">
                {errors?.lname?.message}
              </p>
            </div>
            <div className="flex flex-col mb-2 md:mb-4 items-start">
              <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                {...register("email")}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                placeholder="Enter your email"
                required
              />
              <p className="mt-1 text-sm text-destructive">
                {errors?.email?.message}
              </p>
            </div>
            <div className="flex flex-col mb-2 md:mb-4 items-start">
              <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
                Phone Number
              </label>
              <PhoneInput
                value={phone}
                onChange={handlePhoneChange}
                defaultCountry="ca"
                inputStyle={inputStyles}
                className="w-full p-[2px] border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                countrySelectorStyleProps={countrySelectorStyleProps}
              />
              <p className="mt-1 text-sm text-destructive">
                {errors?.phoneNumber?.message}
              </p>
            </div>

            <div className="col-span-1 md:col-span-2 flex justify-center my-0 md:my-6 gap-2">
              <button
                onClick={onClose}
                className="mt-4 w-24 py-2 px-4 text-gray-800 dark:text-gray-100 border dark:border rounded-md transition duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={addOperatorsLoader}
                className="mt-4 w-24 py-2 px-4 bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white rounded-md transition duration-200"
              >
                {addOperatorsLoader ? (
                  <ImSpinner8 className="spinning-icon" />
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddOperatorModal;
