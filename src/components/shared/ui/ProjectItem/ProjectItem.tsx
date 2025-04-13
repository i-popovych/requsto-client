import { FC } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { PrivateRoutes } from "../../Routes/libs/constants/privateRoutes.enum";
import { Project } from "@/entities/Project";
import { setProject } from "@/redux/features/project/projectSlice";

type Props = {
  project: Project;
};

export const ProjectItem: FC<Props> = ({ project }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onProjectClick = () => {
    dispatch(setProject(project));
    navigate(PrivateRoutes.DASHBOARD);
  };

  return (
    <div className="flex gap-7 justify-between p-5 text-xl bg-[#bbbbbb] rounded-3xl shadow-xl ">
      <div className="cursor-pointer" onClick={onProjectClick}>
        <span className="hover:underline hover:underline-offset-1">
          {project.project_name}
        </span>
      </div>
      <div>
        <span>Connection ID: </span>
        <span>{project.id}</span>
      </div>
    </div>
  );
};
