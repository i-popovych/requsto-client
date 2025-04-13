import { DropPopup } from "@/components/shared/DropPopup/DropPopup";
import { FileItem } from "@/components/shared/ui/FileItem/FileItem";
import { FC, useState } from "react";
import { MdOutlineAttachFile } from "react-icons/md";

type Props = {
  handleSendMessage: (message: string, files?: File[]) => void;
};

export const ChatFooter: FC<Props> = ({ handleSendMessage }) => {
  const [message, setMessage] = useState("");
  const [isDropZoneOpen, setIsDropZoneOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const onChangeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const onSendMessage = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    handleSendMessage(message, uploadedFiles);
    setMessage("");
    setUploadedFiles([]);
  };

  const onDropZoneClick = () => {
    setIsDropZoneOpen((prev) => !prev);
  };

  const onDrop = (acceptedFiles: File[]) => {
    setUploadedFiles(acceptedFiles);
    console.log(acceptedFiles);
  };

  const renderFilesList = () => {
    return uploadedFiles.map((file) => {
      return <FileItem key={file.name} fileName={file.name} />;
    });
  };

  return (
    <footer className="bg-white border-t border-gray-300  absolute bottom-0 w-full py-3 px-5">
      <DropPopup
        handleClose={onDropZoneClick}
        isOpen={isDropZoneOpen}
        onDrop={onDrop}
      />
      <div className="flex items-center">
        <div onClick={onDropZoneClick} className="mr-2 hover:cursor-pointer">
          <MdOutlineAttachFile size={24} />
        </div>
        <input
          value={message}
          onChange={onChangeMessage}
          type="text"
          placeholder="Type a message..."
          className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
        />
        <button
          className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2"
          onClick={onSendMessage}
        >
          Send
        </button>
      </div>
      <div className="flex gap-3 mt-4">{renderFilesList()}</div>
    </footer>
  );
};
