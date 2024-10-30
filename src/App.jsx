import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import OperatorList from "./pages/dashboard/OperatorList";
import VendingMachines from "./pages/dashboard/VendingMachines";
import VendingMachineDetails from "./pages/dashboard/VendingMachineDetails";
import ProductDetails from "./pages/dashboard/ProductDetails";
import ProductManagement from "./pages/dashboard/ProductManagement";
import Inventory from "./pages/dashboard/Inventory";
import UserManagement from "./pages/credit_management/UserManagement";
import CardAssociation from "./pages/credit_management/CardAssociation";
import OperatorReports from "./pages/reports/OperatorReports";
import MachineReports from "./pages/reports/MachineReports";
import AdminLayout from "./layout/AdminLayout";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import "./css/style.css";
import "./charts/ChartjsConfig";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import store from "./store/store";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const location = useLocation();
  let persistor = persistStore(store);

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastContainer />
        <Routes>
          {/* Admin Layout routes with nested pages */}
          <Route exact path="/" element={<Login />} />
          {/* /admin/dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <AdminLayout
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                />
              </ProtectedRoute>
            }
          >
            <Route path="operator-list" element={<OperatorList />} />
            <Route path="vending-machines" element={<VendingMachines />} />
            <Route path="product-management" element={<ProductManagement />} />
            <Route path="inventory" element={<Inventory />} />
            {/* Add more routes as needed */}
          </Route>
          {/* /admin/card-parameters */}
          <Route
            path="/credit-management"
            element={
              <ProtectedRoute>
                <AdminLayout
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                />
              </ProtectedRoute>
            }
          >
            <Route
              path="user-management"
              element={<UserManagement />}
            />
            {/* <Route path="card-association" element={<CardAssociation />} /> */}
            {/* Add more routes as needed */}
          </Route>
          {/* /admin/reports */}
          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <AdminLayout
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                />
              </ProtectedRoute>
            }
          >
            <Route path="operator-reports" element={<OperatorReports />} />
            <Route path="machine-reports" element={<MachineReports />} />
            {/* Add more routes as needed */}
          </Route>
          {/* Vending Machine Details Page */}
          <Route
            exact
            path="/dashboard/vending-machines/:machineId"
            element={<VendingMachineDetails />}
          />
          {/* Product Details Page */}
          <Route
            exact
            path="/dashboard/product-management/:productId"
            element={<ProductDetails />}
          />

          {/* Fallback route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PersistGate>
    </Provider>
  );
}

export default App;
