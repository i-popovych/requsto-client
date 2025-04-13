import { FC, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FaBookmark } from "react-icons/fa";
import { FaBell, FaUser } from "react-icons/fa6";
import { IoMdPeople } from "react-icons/io";
import { IoChatboxEllipses } from "react-icons/io5";
import { RiChatSmileLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

import { groupService } from "@/api/services/group/group.service";

import { getRandomInt } from "@/helpers/getRandomInt";
import { useLoading } from "@/hooks/useLoading";
import { GroupsList } from "@/pages/dashboard/libs/GroupsList";
import { setGroup } from "@/redux/features/groups/groupSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { PrivateRoutes } from "@/components/shared/Routes/libs/constants/privateRoutes.enum";
import { Group } from "@/entities/Group";
import { BreakLine } from "@/components/shared/SideBar/libs/components/BreakLine";
import { MenuItem } from "@/components/shared/ui/MenuItem";
import Accordion from "@/components/shared/ui/Accordion/Accordion";

type Props = {
  children: React.ReactNode;
};

const NOTIFICATION = getRandomInt(1, 5);

export const AppHeader: FC<Props> = ({ children }) => {
  const project = useAppSelector((state) => state.project);
  const userState = useAppSelector((state) => state.user);

  const [isShowGroupPopup, setIsShowGroupPopup] = useState(false);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const onGroupClick = () => {
    navigate(PrivateRoutes.SELECT_PROJECT);
  };

  const fetchGroup = async () => {
    if (!project.currentProject) return;

    try {
      const { data: groups } = await groupService.getAllUserGroups({
        project: project.currentProject.id,
      });

      return groups;
    } catch (error) {
      console.error("[Error while fetchig the groups]", error);
    }
  };

  const handleGroupClick = (group: Group) => {
    dispatch(setGroup(group));
  };

  const { data: groupsList, refetchData } = useLoading(fetchGroup);

  if (!project.currentProject || !userState.user) return null;

  return (
    <div className="flex h-[100%]">
      <div className="w-[300px] flex flex-col grow  bg-[#4a194e] px-4 text-lg text-white">
        <div className="flex gap-8 mt-4 justify-between items-center">
          <div className="flex gap-3 items-center cursor-pointer ">
            <FaUser fill="white" size={22} />
            <span className="text-lg text-white">
              {userState.user.username}
            </span>
          </div>
          <div className="cursor-pointer mr-3 relative">
            <FaBell fill="white" size={22} />
            <div className="absolute top-[-8px] right-[-2px] w-[17px] h-[17px] bg-[red] flex items-center justify-center rounded-xl">
              <span className="text-[.7em]">{NOTIFICATION}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-7 text-white text-lg mt-3 pl-3 mb-2">
          <div
            onClick={onGroupClick}
            className="cursor-pointer hover:underline text-2xl flex gap-2 items-center"
          >
            <div>{project.currentProject.project_name}</div>
          </div>
        </div>
        <BreakLine />
        <div className="mt-2 grow flex flex-col gap-1">
          <div className="my-2">
            <MenuItem
              title="Threads"
              Icon={IoChatboxEllipses}
              handleClick={() => {}}
            />
            <MenuItem
              title="Mentions & Reactions"
              Icon={RiChatSmileLine}
              handleClick={() => {}}
            />
            <MenuItem
              title="Saved items"
              Icon={FaBookmark}
              handleClick={() => {}}
            />
            <MenuItem title="People" Icon={IoMdPeople} handleClick={() => {}} />
          </div>

          <BreakLine />
          <Accordion
            defaultOpenValue={true}
            content={
              groupsList && (
                <GroupsList
                  groups={groupsList}
                  handleGroupClick={handleGroupClick}
                />
              )
            }
            title={<div>Groups</div>}
          />
        </div>

        <div className="mb-3 flex items-center text-lg text-white gap-2">
          <div>
            <AiOutlinePlus size={22} fill="white" />
          </div>
          <div>
            <span
              onClick={() => setIsShowGroupPopup(true)}
              className="cursor-pointer"
            >
              Create Group
            </span>
          </div>
          <CreateGroupPopup
            handleClose={() => setIsShowGroupPopup(false)}
            isOpen={isShowGroupPopup}
            refetchGroups={refetchData}
          />
        </div>
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
};
