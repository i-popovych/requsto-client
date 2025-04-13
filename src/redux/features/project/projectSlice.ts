import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Project } from '../../../entities/Project';

interface ProjectState {
  currentProject: Project | null;
}

const initialState: ProjectState = {
  currentProject: null,
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProject(state, { payload }: PayloadAction<Project>) {
      state.currentProject = payload;
    },
  },
});

export const { setProject } = projectSlice.actions;
export default projectSlice.reducer;
