import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditOperatorSchema } from "../../../schemas/index";
import { useDispatch, useSelector } from "react-redux";
import { useThemeProvider } from "../../../utils/ThemeContext";
import { PhoneInput } from "react-international-phone";
import { IoClose } from "react-icons/io5";
import { ImSpinner8 } from "react-icons/im";
import "react-international-phone/style.css";

// Redux actions
import { updateOperator } from "../../../store/operator/operatorThunk";

const EditOperatorModal = ({ isOpen, onSave, onClose, operator, id }) => {
  // Theme and Redux hooks
  const { currentTheme } = useThemeProvider();
  const dispatch = useDispatch();
  const { updateOperatorsLoader } = useSelector((state) => state.operator);

  // Local state
  const [phone, setPhone] = useState(operator?.phoneNumber || "");
  const [status, setStatus] = useState(operator?.status ? "Active" : "Inactive");

  // Form handling
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(EditOperatorSchema),
    defaultValues: {
      fname: "",
      lname: "",
      email: "",
      phoneNumber: "",
    },
  });

  // Initialize form with operator data
  useEffect(() => {
    if (operator) {
      setValue("name", operator.name);
      setValue("email", operator.email);
      setValue("phoneNumber", operator.phoneNumber);
      setPhone(operator.phoneNumber);
      setStatus(operator.status ? "Active" : "Inactive");
    }
  }, [operator, setValue]);

  // Early return if modal is not open
  if (!isOpen) return null;

  // Phone input styles
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

  // Event handlers
  const handlePhoneChange = (value) => {
    setPhone(value);
    setValue("phoneNumber", value);
  };

  const handleStatusChange = (event) => {
    const value = event.target.value;
    setStatus(value);
    setValue("status", value === "Active");
  };

  const handleClose = () => {
    reset();
    onClose();
    setPhone("");
    setStatus("");
  };

  // Form submission handler
  const onSubmit = async (data) => {
    const result = EditOperatorSchema.safeParse({
      ...data,
      phoneNumber: phone,
    });

    if (result?.success) {
      const payload = {
        ...result.data,
        status: status === "Active",
        assignedMachines: operator?.assignedMachines || [],
      };

      dispatch(
        updateOperator({
          id,
          payload,
          onSuccess: () => {
            onSave();
            handleClose();
          },
          onError: (error) => {
            console.error("Error updating operator:", error);
            handleClose();
          },
        })
      );
    } else {
      console.log("Validation failed", result.error);
    }
  };

  // UI Components
  const FormField = ({ label, name, type = "text", disabled = false, children }) => (
    <div className="flex flex-col mb-2 md:mb-4 items-start">
      <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
        {label}
      </label>
      {children || (
        <input
          type={type}
          {...register(name)}
          disabled={disabled}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
          placeholder={`Enter your ${name.toLowerCase()}`}
          required
        />
      )}
      {errors[name] && (
        <p className="mt-1 text-sm text-destructive">{errors[name].message}</p>
      )}
    </div>
  );

  return (
    <div className="fixed top-0 left-0 right-0 bg-gray-800 bg-opacity-90 flex items-center justify-center md:inset-0 h-[calc(100%-1rem)] max-h-full" style={{ zIndex: 1000 }}>
      <div className="flex flex-col w-full max-w-3xl max-h-full bg-white dark:bg-gray-800 border dark:border-gray-600 text-center text-xs rounded-lg text-black dark:text-white font-quicksand box-border overflow-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 px-8 py-2 mb-8">
          <h2 className="flex items-center text-start font-bold left-[29px] text-[18px] text-dimgray">
            EDIT OPERATOR
            <button type="button" onClick={handleClose} className="ml-auto">
              <IoClose size={30} color="#A0AEC0" />
            </button>
          </h2>
        </div>

        {/* Form */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5" onSubmit={handleSubmit(onSubmit)}>
          <FormField label="Name" name="name" />
          <FormField label="Email" name="email" type="email" disabled={true} />
          
          {/* Phone Input */}
          <FormField label="Phone Number">
            <PhoneInput
              value={phone}
              onChange={handlePhoneChange}
              defaultCountry="ca"
              inputStyle={inputStyles}
              className="w-full p-[2px] border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
              countrySelectorStyleProps={countrySelectorStyleProps}
            />
          </FormField>

          {/* Status Select */}
          <FormField label="Status">
            <select
              value={status}
              onChange={handleStatusChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 outline-none rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </FormField>

          {/* Action Buttons */}
          <div className="col-span-1 md:col-span-2 flex justify-center my-0 md:my-6 gap-2">
            <button
              onClick={handleClose}
              className="mt-4 w-24 py-2 px-4 text-gray-800 dark:text-gray-100 border dark:border rounded-md transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={updateOperatorsLoader}
              className="mt-4 w-24 py-2 px-4 bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white rounded-md transition duration-200"
            >
              {updateOperatorsLoader ? (
                <ImSpinner8 className="spinning-icon" />
              ) : (
                "Update"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditOperatorModal;