import { auth } from '@/lib/firebase';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

interface IUserState {
  user: {
    email: string | null;
  };
  isLoading: boolean;
  isError: boolean;
  error: string | null;
}

interface IUserCredential {
  email: string;
  password: string;
}
const initialState: IUserState = {
  user: {
    email: null,
  },
  isLoading: true,
  isError: false,
  error: null,
};

export const createUser = createAsyncThunk(
  'user/crete-user',
  async ({ email, password }: IUserCredential) => {
    const data = await createUserWithEmailAndPassword(auth, email, password);
    return data.user.email;
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async ({ email, password }: IUserCredential) => {
    const data = await signInWithEmailAndPassword(auth, email, password);
    return data.user.email;
  }
);

//! This code has a bug on user persistance check --> after sign in email is set to user thus some condition fails

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string | null>) => {
      state.user.email = action.payload;
    },
    setUserLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
        // state.user.email = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        (state.isLoading = false), (state.user.email = action.payload); // return value from createUser function --> return data.user.email
      })
      .addCase(createUser.rejected, (state, action) => {
        state.user.email = null;
        (state.isLoading = false),
          (state.isError = true),
          (state.error = action.error.message!);
      })

      //* is login section

      .addCase(loginUser.pending, (state) => {
        // state.user.email = null;
        state.isLoading = true;
        (state.isError = false), (state.error = null);
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.isError = false),
          (state.error = null),
          (state.user.email = action.payload);
      })
      .addCase(loginUser.rejected, (state, action) => {
        (state.isLoading = false),
          (state.isError = true),
          (state.error = action.error.message!);
      });
  },
});

export const { setUser, setUserLoading } = userSlice.actions;
export default userSlice.reducer;
