import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserTable from "../../components/card/UserTable";
import { getUsers } from "../../store/card/CardThunk";
import { ImSpinner8 } from "react-icons/im";
import AssignRedeemableProductModal from "../../components/card/AssignRedeemableProductModal";

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

  const { users, getUsersLoader } = useSelector((state) => state.card);
  const [filteredUsers, setFilteredUsers] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleOpenModal = (userId, user) => {
    setSelectedUserId(userId);
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUserId(null);
  };
  const handleSearch = (value) => {
    const filtered = Object.entries(users).filter(([id, user]) =>
      user.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredUsers(Object.fromEntries(filtered));
  };
  const handleSAveModal = () => {
    dispatch(
      getUsers({
        onSuccess: (data) => {
          setFilteredUsers(data);
        },
        onError: (data) => {},
      })
    );
  };

  useEffect(() => {
    dispatch(
      getUsers({
        onSuccess: (data) => {
          setFilteredUsers(users);
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
            Card User Management
          </h1>
        </div>
        <div className="flex justify-center items-center gap-2 lg:gap-5">
          <input
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
            type="text"
            placeholder="Search..."
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-6">
        {/* Table (Top Channels) */}
        {getUsersLoader ? (
          <div className="col-span-12 flex justify-center items-center h-96">
            <ImSpinner8 className="spinning-icon animate-spin text-4xl" />
          </div>
        ) : (
          <UserTable users={filteredUsers} onAddProduct={handleOpenModal} />
        )}
      </div>
      <AssignRedeemableProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        userId={selectedUserId}
        user={selectedUser}
        onSave={handleSAveModal}
      />
    </div>
  );
};

export default UserManagement;
