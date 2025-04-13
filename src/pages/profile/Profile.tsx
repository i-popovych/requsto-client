import { useState } from "react";

import { userService } from "@/api/services/user/user.service";

import { AvatarSelectionModal } from "@/pages/profile/libs/AvatarSelectionModal";

import { setUser } from "@/redux/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { Notification } from "../../packages/notification/index";
import { UserAvatar } from "@/components/shared/UserAvatar/UserAvatar";

export const Profile = () => {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  const [isShowAvatarModal, setIsShowAvatarModal] = useState(false);

  const onAvatarClick = () => {
    setIsShowAvatarModal((prev) => !prev);
  };

  const onAvatarSelect = async (avatarName: string) => {
    try {
      const { data: user } = await userService.updateAvatar(avatarName);

      dispatch(setUser(user));
      setIsShowAvatarModal(false);
    } catch (error) {
      Notification.error("Error while updating avatar");
      console.error(error);
    }
  };

  const renderInfo = (title: string, desc?: string) => {
    return (
      <div>
        <span>{title} </span>
        <span>{desc}</span>
      </div>
    );
  };

  const userRegisteredDate = user?.createdAt.split("T")[0].replace(/-/g, ".");

  return (
    <div className=" flex flex-col gap-5 mt-10 items-center ">
      <div onClick={onAvatarClick} className="cursor-pointer">
        <UserAvatar width={130} />
      </div>
      <div className=" min-w-[300px] px-2 py-3 gap-2 flex flex-col border border-solid shadow mt-4">
        {renderInfo("Username: ", user?.username)}
        {renderInfo("Email: ", user?.email)}
        {renderInfo("Date of registarion: ", userRegisteredDate)}
      </div>
      <div>
        <AvatarSelectionModal
          handleClose={() => setIsShowAvatarModal(false)}
          isOpen={isShowAvatarModal}
          handleSelectAvatar={onAvatarSelect}
        />
      </div>
    </div>
  );
};
