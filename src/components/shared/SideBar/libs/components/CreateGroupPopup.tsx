import { FC, useState } from 'react';

import { groupService } from '@/api/services/group/group.service';
import { useAppSelector } from '@/redux/hooks';

import { Button } from '../../../../components/UI/Button/Button';
import { Popup } from '../../../../components/UI/PopUp/PopUp';
import { Notification } from '../../../../packages/notification';

type Props = {
  refetchGroups: () => void;
  isOpen: boolean;
  handleClose: () => void;
};

export const CreateGroupPopup: FC<Props> = ({ refetchGroups, handleClose, isOpen }) => {
  const [groupName, setGroupName] = useState('');

  const user = useAppSelector((state) => state.user.user);
  const { currentProject } = useAppSelector((state) => state.project);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroupName(e.target.value);
  };

  const onCreateGroup = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!user?.id || !currentProject) return;
    try {
      await groupService.createGroup({
        group_name: groupName,
        project_id: currentProject.id,
      });

      Notification.success('Project created successfully');
      handleClose();
      refetchGroups();
    } catch (error) {
      console.log('[onCreateGroup]', error);
    } finally {
    }
  };

  return (
    <Popup handleClose={handleClose} isOpen={isOpen}>
      <div>
        <div className='cursor-pointer hover:drop-shadow text-xl text-center font-bold text-black'>
          Create Group
        </div>

        <div className='flex gap-1 items-center flex-col mt-4'>
          <div className='text-[1.1em] text-black'>Group Name</div>
          <div className='mt-2 max-w-[210px]'>
            <input
              type='text'
              value={groupName}
              onChange={onChange}
              className='block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6'
            />
            <div className='flex mt-4'>
              <Button text='Create' handleClick={onCreateGroup} isFull />
            </div>
          </div>
        </div>
      </div>
    </Popup>
  );
};
