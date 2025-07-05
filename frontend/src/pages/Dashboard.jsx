import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CreateProduct from "../components/CreateProduct";

import api from "../axios";
import {
  Bell,
  Search,
  Settings,
  Menu,
  Home,
  Users,
  TrendingUp,
  Calendar,
  DollarSign,
  ShoppingCart,
  Activity,
  User,
  ChevronDown,
  Filter,
  LogOut,
} from "lucide-react";
import CategoryManager from "../components/CategoryManager";
import Header from "../components/Header";

const Dashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const [refreshSignal, setRefreshSignal] = useState(0);
  const [showProductForm, setShowProductForm] = useState(false);

  const handleRefreshCategories = () => {
    setRefreshSignal((prev) => prev + 1);
  };

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await api.post("/api/logout", null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      localStorage.removeItem("token");
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  const MetricCard = ({ title, value, change, icon: Icon, color }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          <p
            className={`text-sm mt-1 ${
              change >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {change >= 0 ? "+" : ""}
            {change}% from last month
          </p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Toggle Button (always visible) */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed lg:hidden z-40 left-4 top-4 p-2 rounded-md bg-white shadow-md"
      >
        <Menu className="h-6 w-6 text-gray-600" />
      </button>

      {/* Sidebar */}
      {/*   <div
        ref={sidebarRef}
        className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } transition-transform duration-300 ease-in-out flex flex-col`}
      >
        <div className="flex items-center justify-center h-16 bg-gradient-to-r from-green-600 to-green-800">
          <h1 className="text-xl font-bold text-white">LocusVMS</h1>
        </div>

        <nav className="flex-1 overflow-y-auto mt-4">
          <div className="px-4 space-y-2">
            <a
              href="#"
              className="flex items-center px-4 py-3 text-gray-700 bg-green-50 rounded-lg hover:bg-green-100"
            >
              <Home className="h-5 w-5 mr-3" />
              Dashboard
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100"
            >
              <Users className="h-5 w-5 mr-3" />
              Users
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100"
            >
              <TrendingUp className="h-5 w-5 mr-3" />
              Analytics
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100"
            >
              <ShoppingCart className="h-5 w-5 mr-3" />
              Orders
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100"
            >
              <Calendar className="h-5 w-5 mr-3" />
              Calendar
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100"
            >
              <Settings className="h-5 w-5 mr-3" />
              Settings
            </a>
          </div>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 hover:text-red-600 transition-colors"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </button>
        </div>
      </div> */}

      {/* Main Content */}
      <div className="flex-1 overflow-x-hidden">
        <div className="bg-red-600 p-10 mt-10">
          <Header refreshSignal={refreshSignal} />
        </div>
        <div className="container mx-auto p-4">
          <CategoryManager onChange={handleRefreshCategories} />
        </div>

        <button
          onClick={() => setShowProductForm(true)}
          className="bg-green-600 text-white p-2 rounded"
        >
          Ajouter un produit
        </button>

        {showProductForm && (
          <CreateProduct onProductCreated={() => setShowProductForm(false)} />
        )}
        {/* Header */}
        {/*  <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Dashboard Overview
            </h2>
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 w-64"
                />
              </div>
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-700 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700 hidden md:inline">
                  Admin
                </span>
                <ChevronDown className="h-4 w-4 text-gray-500 hidden md:inline" />
              </div>
            </div>
          </div>
        </header> */}

        {/* Dashboard Content */}
        <main className="p-4 md:p-6">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 mb-6 text-white">
            <h1 className="text-2xl font-bold mb-2">Welcome back, Admin! 👋</h1>
            <p className="opacity-90">
              Here's what's happening with your venue management system today.
            </p>
          </div>

          {/* Metrics Cards */}
          {/*     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <MetricCard
              title="Total Revenue"
              value="$54,239"
              change={12.5}
              icon={DollarSign}
              color="bg-green-500"
            />
            <MetricCard
              title="Total Orders"
              value="1,423"
              change={8.2}
              icon={ShoppingCart}
              color="bg-blue-500"
            />
            <MetricCard
              title="Total Users"
              value="8,539"
              change={-2.4}
              icon={Users}
              color="bg-purple-500"
            />
            <MetricCard
              title="Active Sessions"
              value="2,147"
              change={15.8}
              icon={Activity}
              color="bg-orange-500"
            />
          </div> */}

          {/* Recent Bookings Table */}
          {/*  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Recent Bookings
              </h3>
              <button className="text-sm text-green-600 hover:text-green-800 font-medium">
                View All
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Booking ID
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Customer
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Venue
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Amount
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </div> */}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
