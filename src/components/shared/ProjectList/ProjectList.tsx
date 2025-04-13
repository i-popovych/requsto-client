import { FC } from 'react';

import { Project } from '../../entities/Project';
import { ProjectItem } from '../UI/ProjectItem/ProjectItem';

type Props = {
  projects: Project[];
};

export const ProjectList: FC<Props> = ({ projects }) => {
  const renderProjects = () => {
    return projects.map((project, index) => <ProjectItem key={project.id} project={project} />);
  };

  return <div className='max-w-[600px] w-full flex flex-col gap-7 mt-4'>{renderProjects()}</div>;
};
