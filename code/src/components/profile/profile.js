import React from "react";
import { FaUserCircle, FaShoppingCart, FaTags, FaHeart, FaCalendarAlt } from "react-icons/fa";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <div className="bg-gray-900 text-white flex justify-between items-center px-10 py-3">
        <div className="text-xl font-bold">
          <a href="/home" className="no-underline text-white">
            📚 Bookify
          </a>
        </div>
        <div>
          <a href="/login" className="px-4 py-2 border border-white rounded mr-2">
            Log In
          </a>
          <a href="/signup" className="px-4 py-2 bg-lime-500 text-black rounded">
            Join for FREE
          </a>
        </div>
      </div>

      {/* Profile Section */}
      <div className="flex flex-col items-center py-10">
        {/* Profile Icon */}
        <FaUserCircle className="text-gray-700" size={120} />

        <h2 className="mt-4 text-2xl font-semibold text-gray-800">User Name</h2>
        <p className="text-gray-500">user@email.com</p>

        {/* Stats Container */}
        <div className="grid grid-cols-3 gap-6 mt-10 max-w-3xl w-full px-6">
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
            <FaShoppingCart className="text-blue-500 mb-2" size={40} />
            <h3 className="font-semibold">Buys</h3>
            <p className="text-gray-500">12 Books</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
            <FaTags className="text-green-500 mb-2" size={40} />
            <h3 className="font-semibold">Sells</h3>
            <p className="text-gray-500">8 Books</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
            <FaHeart className="text-red-500 mb-2" size={40} />
            <h3 className="font-semibold">Wishlist</h3>
            <p className="text-gray-500">5 Books</p>
          </div>
        </div>

        {/* Calendar Section */}
        <div className="mt-10 max-w-3xl w-full px-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center mb-4">
              <FaCalendarAlt className="text-purple-500 mr-2" size={30} />
              <h3 className="text-lg font-semibold">Calendar</h3>
            </div>
            <p className="text-gray-500">
              Upcoming events, reminders, or book deadlines will appear here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
