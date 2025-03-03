import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserTable from "../../components/card/UserTable";
import { getUsers, addUser } from "../../store/user/userThunk";
import { ImSpinner8 } from "react-icons/im";
import * as XLSX from "xlsx";
import { nanoid } from "nanoid";

const UserManagement = () => {
  // add new user

  // import { nanoid } from "nanoid";
  // import { ref, set, get, update, remove, child } from "firebase/database";
  // import { db } from "../../config/firebase";

  // const handleSubmit = async () => {
  //   const uniqueId = nanoid();
  //   const payload = {
  //     name: "Sohaib",
  //     email: "sohaib@gmail.com",
  //     cardDetails: {
  //       cardNumber: "4242424242424242",
  //       expiry: "12/25",
  //     },
  //     productCredits: {
  //       "3T_rQEez2dFD9S97RMLiI": 3,
  //     },
  //   };
  //   await set(ref(db, `users/${uniqueId}`), payload);
  // };
  const dispatch = useDispatch();

  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);

  const { users, getUsersLoader } = useSelector((state) => state.user);
  const [filteredUsers, setFilteredUsers] = useState(null);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [selectedUserId, setSelectedUserId] = useState(null);
  // const [selectedUser, setSelectedUser] = useState(null);

  // const handleOpenModal = (userId, user) => {
  //   setSelectedUserId(userId);
  //   setSelectedUser(user);
  //   setIsModalOpen(true);
  // };

  // const handleCloseModal = () => {
  //   setIsModalOpen(false);
  //   setSelectedUserId(null);
  // };
  const handleSearch = (value) => {
    const filtered = Object.entries(users).filter(([id, user]) =>
      user.Name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredUsers(Object.fromEntries(filtered));
  };
  // const handleSAveModal = () => {
  //   dispatch(
  //     getUsers({
  //       onSuccess: (data) => {
  //         setFilteredUsers(data);
  //       },
  //       onError: (data) => {},
  //     })
  //   );
  // };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      let jsonData = XLSX.utils.sheet_to_json(sheet);

      jsonData = jsonData.map((row) => {
        const newRow = {};
        Object.keys(row).forEach((key) => {
          const newKey = key.replace(/\s+/g, "");
          newRow[newKey] = row[key];
        });
        return newRow;
      });
      jsonData.forEach((row) => {
        const userId = nanoid();

        const payload = { ...row };

        dispatch(
          addUser({
            id: userId,
            payload,
            onSuccess: () => {
              fileInputRef.current.value = null;
            },
            onError: (error) => {
              fileInputRef.current.value = null;
            },
          })
        );
      });

      setIsUploading(false);
    };
    reader.readAsArrayBuffer(file);
    fileInputRef.current.value = null;
    dispatch(
      getUsers({
        onSuccess: (data) => {
          setFilteredUsers(data);
        },
        onError: (data) => {},
      })
    );
  };

  // Function to trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    dispatch(
      getUsers({
        onSuccess: (data) => {
          setFilteredUsers(data);
        },
        onError: (data) => {},
      })
    );
  }, [isUploading]);

  return isUploading ? (
    <div className="col-span-12 flex justify-center items-center h-96">
      <ImSpinner8 className="spinning-icon animate-spin text-4xl" />
    </div>
  ) : (
    <div>
      <div className="sm:flex sm:justify-between sm:items-center mb-8">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
            Card User Management
          </h1>
        </div>
        <div className="flex flex-wrap md:flex-nowrap justify-center items-center gap-2 lg:gap-5">
          <input
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
            type="text"
            placeholder="Search..."
            onChange={(e) => handleSearch(e.target.value)}
          />

          <div className="flex items-center w-full md:w-36">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".xlsx, .xls"
              style={{ display: "none" }}
            />
            <button
              type="file"
              onClick={triggerFileInput}
              disabled={isUploading}
              className={"py-2 w-full md:w-36 px-4 bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white rounded-md transition duration-200"}
            >
              Import Users
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-6">
        {/* Table (Top Channels) */}
        {getUsersLoader ? (
          <div className="col-span-12 flex justify-center items-center h-96">
            <ImSpinner8 className="spinning-icon animate-spin text-4xl" />
          </div>
        ) : (
          <UserTable users={filteredUsers} />
        )}
      </div>
    </div>
  );
};

export default UserManagement;
