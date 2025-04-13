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

export const CreateProject: FC<Props> = ({ refetchProjects, handleClose, isOpen }) => {
  const [projectName, setProjectName] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.target.value);
  };

  const onCreateProject = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    try {
      await projectService.postProject({ project_name: projectName });
      Notification.success('Project created successfully');
      handleClose();
      refetchProjects();
    } catch (error) {
      console.log('[onCreateProject]', error);
    } finally {
    }
  };

  return (
    <Popup handleClose={handleClose} isOpen={isOpen}>
      <div>
        <div className='cursor-pointer hover:drop-shadow text-xl text-center font-bold'>
          Create Project
        </div>

        <div className='flex gap-1 items-center flex-col mt-4'>
          <div className='text-[1.1em]'>Project Name</div>
          <div className='mt-2 max-w-[210px]'>
            <input
              type='text'
              value={projectName}
              onChange={onChange}
              className='block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6'
            />
            <div className='flex mt-4'>
              <Button text='Create' handleClick={onCreateProject} isFull />
            </div>
          </div>
        </div>
      </div>
    </Popup>
  );
};
