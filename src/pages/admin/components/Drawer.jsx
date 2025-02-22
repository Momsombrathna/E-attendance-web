import React from "react";

const Drawer = ({ isOpen, onClose, children }) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-end bg-black bg-opacity-50 transition-opacity ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className="p-4
        bg-base-300
        transition-transform
        transform
        translate-x-0
        rounded-s-xl w-1/2 h-full overflow-y-auto"
      >
        <button
          className="text-gray-200
            bg-base-100
            px-2 py-1
            rounded-lg
            hover:bg-base-200
            float-right"
          onClick={onClose}
        >
          Close
        </button>
        {children}
      </div>
    </div>
  );
};

export default Drawer;
