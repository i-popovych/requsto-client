import { Group } from 'entities/Group';

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface GroupState {
  currentGroup: Group | null;
}

const initialState: GroupState = {
  currentGroup: null,
};

const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    setGroup(state, { payload }: PayloadAction<Group>) {
      state.currentGroup = payload;
    },
  },
});

export const { setGroup } = groupSlice.actions;
export default groupSlice.reducer;
