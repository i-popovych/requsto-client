import { Popup, PopUpProps } from "@/components/shared/ui/PopUp/PopUp";
import { FC } from "react";
import { useDropzone } from "react-dropzone";

interface Props extends Omit<PopUpProps, "children"> {
  onDrop: (acceptedFiles: File[]) => void;
}

export const DropPopup: FC<Props> = ({ onDrop, handleClose, isOpen }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropAccepted,
  });

  function onDropAccepted() {
    handleClose();
  }

  const renderDragZoneText = (text: string) => {
    return (
      <div className="flex items-center justify-center border-2 border-dashed border-[gray]  h-[120px] w-[80%]">
        <div>{text}</div>
      </div>
    );
  };

  const dragZoneText = isDragActive
    ? "Your files are here"
    : "Put your files here";

  return (
    <Popup handleClose={handleClose} isOpen={isOpen}>
      <div
        className="flex items-center justify-center h-[270px] w-[600px] "
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {renderDragZoneText(dragZoneText)}
      </div>
    </Popup>
  );
};
