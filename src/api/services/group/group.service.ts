import { CreateGroupParams } from '@/api/services/group/libs/CreateGroupParams';

import $baseAPI from '../../axios';
import { GetGroupParams } from './libs/GetGroupParams';

class GroupService {
  getAllProjectGroups(params: GetGroupParams) {
    return $baseAPI.get('group', {
      params,
    });
  }

  getAllUserGroups(params: GetGroupParams) {
    return $baseAPI.get('group/user', {
      params,
    });
  }

  getAllGroupUsers(params: { groupId: number }) {
    return $baseAPI.get(`group/${params.groupId}/users`);
  }

  createGroup(params: CreateGroupParams) {
    return $baseAPI.post('group', params);
  }

  addUserToGroup(params: { group_id: number; user_id: number }) {
    return $baseAPI.post(`group/add-user`, params);
  }
}

export const groupService = new GroupService();
