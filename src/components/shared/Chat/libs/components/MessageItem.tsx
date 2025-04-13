import { FilesList } from "@/components/shared/Chat/libs/components/FilesList";
import { getTimeAgo } from "@/components/shared/Chat/libs/helpers/getTimeAgo";
import { File } from "@/entities/FIle";
import { FC } from "react";

type MessageItemProps = {
  username: string;
  message: string;
  avatarSrc: string;
  creatingDate: string;
  isIncoming?: boolean;
  files?: File[];
};

export const MessageItem: FC<MessageItemProps> = ({
  isIncoming = true,
  message,
  avatarSrc,
  files,
  creatingDate,
  username,
}) => {
  const containerClassName = `flex ${
    isIncoming ? "justify-start" : "justify-end"
  } mb-4 cursor-pointer`;

  const backgroundColor = isIncoming ? "bg-white" : "bg-[#6366f1]";

  const filesAlign = isIncoming ? "flex-start" : "flex-end";

  const isFiles = files && files.length > 0;

  return (
    <div className={containerClassName}>
      <div className="flex flex-col gap-3" style={{ alignItems: filesAlign }}>
        <div className="flex gap-2">
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center mt-2`}
          >
            <img
              src={avatarSrc}
              alt={`${isIncoming ? "User" : "My"} Avatar`}
              className="w-10 h-10 rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <div className="text-[.9em]">
              <span>{username}</span>
              <span className="mx-[5px]">-</span>
              <span>{getTimeAgo(creatingDate)}</span>
            </div>
            <div
              className={`flex max-w-96 ${backgroundColor} ${
                isIncoming ? "text-black" : "text-white"
              } rounded-lg p-3 gap-3 mt-1`}
            >
              <p>{message}</p>
            </div>
            {isFiles && (
              <div className="mt-2">
                <FilesList files={files} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
