import React, { FC } from "react";

import { CloseIcon } from "../../../../assets/images";

export interface PopUpProps {
  isOpen: boolean;
  handleClose: () => void;
  children: React.ReactNode;
}

export const Popup: FC<PopUpProps> = ({ isOpen, handleClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed transition centered-fixed-component">
      <div className="bg-white border-black-1 shadow-md px-3 py-2  relative">
        <div
          className="cursor-pointer absolute top-[5px] right-[5px]"
          onClick={handleClose}
        >
          <img src={CloseIcon} className="w-[20px]" />
        </div>
        {children}
      </div>
    </div>
  );
};
