import $baseAPI from "@/api/axios";

import { Project } from "../../../entities/Project";
import { User } from "../../../entities/User";

class UserService {
  profile(access_token?: string) {
    return $baseAPI.get<{ user: User }>("v1/auth/me", {
      headers: {
        Authorization: access_token ? `Bearer ${access_token}` : null,
      },
    });
  }

  getProjects() {
    return $baseAPI.get<Project[]>("/user/my-projects");
  }

  getAllGroupUsers(groupId: number) {
    return $baseAPI.get<User[]>(`/user/group/${groupId}`);
  }

  updateAvatar(avatarName: string) {
    return $baseAPI.put<User>("/user/avatar", { avatarName: avatarName });
  }
}

export const userService = new UserService();
