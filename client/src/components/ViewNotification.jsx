import React from "react";
import ModalWrapper from "./ModalWrapper";
import { Dialog } from "@headlessui/react";
import Button from "./Button";

const ViewNotification = ({ open, setOpen, el }) => {
  return (
    <ModalWrapper show={open} open={open} setOpen={setOpen}>
      <div className="py-4 w-full flex flex-col gap-4 items-center justify-center">
        <Dialog.Title as="h3" className="font-semibold text-lg text-center">
          {el?.task?.title}
        </Dialog.Title>
        <p className="text-start text-gray-500">{el?.text}</p>
        <Button
          type="button"
          className="bg-red-500 px-8 py-2 mt-3 text-sm font-semibold text-white border border-transparent rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          onClick={() => setOpen(false)}
          label="Ok"
        />
      </div>
    </ModalWrapper>
  );
};


export default ViewNotification;
