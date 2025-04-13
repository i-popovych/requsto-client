import { combineReducers } from 'redux';

import projectReducer from '@/redux/features/project/projectSlice';
import userReducer from '@/redux/features/user/userSlice';

import groupReducer from './groups/groupSlice';

export const rootReducer = combineReducers({
  user: userReducer,
  project: projectReducer,
  group: groupReducer,
});
