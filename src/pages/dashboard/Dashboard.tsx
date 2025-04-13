import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppSelector } from "@/redux/hooks";

import { SelectChat } from "./libs/SelectChat";
import { PrivateRoutes } from "@/components/shared/Routes/libs/constants/privateRoutes.enum";
import { AppHeader } from "@/components/shared/SideBar/SideBar";
import { Chat } from "@/components/shared/Chat/Chat";

export const Dashboard = () => {
  const { currentGroup } = useAppSelector((state) => state.group);
  const { currentProject } = useAppSelector((state) => state.project);

  const navigate = useNavigate();

  useEffect(() => {
    if (!currentProject) {
      navigate(PrivateRoutes.SELECT_PROJECT);
      return;
    }
  }, [currentProject]);

  return (
    <AppHeader>
      <div className="flex justify-between mx-auto">
        <div className="flex grow max-w-[1000px] max-h-[calc(100vh)] ml-auto">
          {currentGroup?.id ? (
            <Chat currentGroupId={currentGroup?.id} />
          ) : (
            <SelectChat />
          )}
        </div>
      </div>
    </AppHeader>
  );
};
