import React from "react";
import DropableCanvas from "./DropableCanvas";

const MainContext = () => {
  return (
    <div className="flex-1 overflow-hidden flex">
      {/* Center - Canvas Area */}
      <div className="flex-1 overflow-auto p-4 sm:p-8">
        <div className="max-w-4xl mx-auto">
          <DropableCanvas />
        </div>
      </div>
    </div>
  );
};

export default MainContext;
