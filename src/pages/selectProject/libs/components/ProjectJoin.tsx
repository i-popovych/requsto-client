import { FC, useState } from 'react';

import { projectService } from '../../../../api/services/project/project.service';
import { Button } from '../../../../components/UI/Button/Button';
import { Popup } from '../../../../components/UI/PopUp/PopUp';
import { Notification } from '../../../../packages/notification';

type Props = {
  refetchProjects: () => void;
  isOpen: boolean;
  handleClose: () => void;
};

export const ProjectJoinModal: FC<Props> = ({ refetchProjects, handleClose, isOpen }) => {
  const [projectId, setProjectId] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectId(e.target.value);
  };

  const onJoinProject = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    try {
      await projectService.projectJoin({ project_id: projectId });
      Notification.success('Project joined successfully');
      refetchProjects();
    } catch (error) {
      console.log('[onCreateProject]', error);
    }

    e.preventDefault();
  };

  return (
    <Popup handleClose={handleClose} isOpen={isOpen}>
      <div>
        <div className='cursor-pointer hover:drop-shadow text-xl text-center font-bold'>
          Join to the project
        </div>

        <div className='flex gap-1 items-center flex-col mt-4'>
          <div className='text-[1.1em]'>Project ID</div>
          <div className='mt-2 max-w-[210px]'>
            <input
              type='text'
              value={projectId}
              onChange={onChange}
              className='block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6'
            />
            <div className='flex mt-4'>
              <Button text='Join' handleClick={onJoinProject} isFull />
            </div>
          </div>
        </div>
      </div>
    </Popup>
  );
};
