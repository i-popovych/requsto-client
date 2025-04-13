import { FileItem } from "@/components/shared/ui/FileItem/FileItem";
import { File } from "@/entities/FIle";
import { FC } from "react";

type Props = {
  files: File[];
};

export const FilesList: FC<Props> = ({ files }) => {
  const renderFiles = () => {
    return files.map((file) => {
      return (
        <FileItem
          key={file.id}
          fileName={file.fileName}
          filePath={file.filePath}
        />
      );
    });
  };

  return <div className="flex flex-col gap-2">{renderFiles()}</div>;
};
