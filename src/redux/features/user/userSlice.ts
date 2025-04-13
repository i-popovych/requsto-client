import { User } from "@/entities/User";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserState {
  user: User | null;
  isAuthInitialized: boolean;
}

const initialState: UserState = {
  user: null,
  isAuthInitialized: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, { payload }: PayloadAction<User>) {
      state.user = payload?.user;
    },
    clearUser(state) {
      state.user = null;
    },

    setAuthInitialize(state, { payload }: PayloadAction<boolean>) {
      state.isAuthInitialized = payload;
    },
  },
});

export const { setUser, clearUser, setAuthInitialize } = userSlice.actions;
export default userSlice.reducer;
