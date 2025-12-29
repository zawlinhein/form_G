import React from "react";
import DropableCanvas from "./DropableCanvas";

const MainContext = () => {
  return (
    <div className="flex-1 overflow-hidden flex">
      {/* Center - Canvas Area */}
      <div className="flex-1 overflow-auto p-4 sm:p-8">
        <div className="max-w-4xl mx-auto">
          <DropableCanvas />

          {/* Helper Text */}
          <div className="text-center mt-6 text-sm text-muted-foreground">
            <p>
              Click on any field to edit or add new blocks from the toolbar
              above
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContext;
