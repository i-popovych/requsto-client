import $baseAPI from '../../axios';
import { CreateProject } from './libs/types/createProject.type';

class ProjectService {
  postProject(params: CreateProject) {
    return $baseAPI.post('projects', { ...params });
  }

  projectJoin(params: { project_id: string }) {
    return $baseAPI.get(`projects/join/${params.project_id}`);
  }

  getUsers(projectId: number) {
    return $baseAPI.get(`projects/${projectId}/users`);
  }
}

export const projectService = new ProjectService();
