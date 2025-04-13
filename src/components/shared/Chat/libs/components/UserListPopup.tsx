import { FC } from "react";

import { projectService } from "@/api/services/project/project.service";

import { useLoading } from "@/hooks/useLoading";
import { useAppSelector } from "@/redux/hooks";
import { PopUpProps } from "@/components/shared/ui/PopUp/PopUp";
import { User } from "@/entities/User";

interface Props extends Omit<PopUpProps, "children"> {
  projectId: number;
  handleUserClick: (user: User) => void;
  header?: string;
}

export const UserListPopup: FC<Props> = ({
  handleClose,
  isOpen,
  projectId,
  handleUserClick,
  header,
}) => {
  const userId = useAppSelector((state) => state.user.user?.id);

  const fetchUsers = async () => {
    if (!isOpen) return [];

    try {
      const res = await projectService.getUsers(projectId);

      const filteredUsers = res.data.filter((user: User) => user.id !== userId);

      return filteredUsers;
    } catch (error) {
      console.error("[Error while fetching the users]", error);
      return [];
    }
  };

  const { data, loading } = useLoading(fetchUsers, [isOpen]);

  if (loading) return <div>Loading...</div>;

  if (!data) return <div>No users</div>;

  const renderHeader = () => {
    return header ? (
      <div className="">
        <h2 className="text-lg font-bold">{header}</h2>
      </div>
    ) : null;
  };

  return (
    <Popup isOpen={isOpen} handleClose={handleClose}>
      {renderHeader()}
      <div className="min-h-[300px] min-w-[400px] mt-4">
        <UserList users={data} handleClick={handleUserClick} />
      </div>
    </Popup>
  );
};
