import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Alert } from '../services/AlertService';
import AxiosInstance from '../services/AxiosInstance';
import jwtDecode from 'jwt-decode';

const initialState = {
  submitStatus: 'idle',
  status: 'idle',
};

export const LoginDetail = createAsyncThunk(
  'auth/StandardLogin',
  async (data, { rejectWithValue }) => {
    // const auth = getAuth();
    try {
      const response = await AxiosInstance.post('auth/login', data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createUser = createAsyncThunk(
  'auth/createUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post(`users/`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const userFetch = createAsyncThunk('user/fetchData', async () => {
  const response = await AxiosInstance.get(`users`);
  return response.data.data;
});

export const userUpdate = createAsyncThunk(
  'user/updateUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.put(`users/${data?.id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const archive = createAsyncThunk(
  'user/delete',
  async (data, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.delete(`users/${data}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [LoginDetail.pending]: (state, action) => {
      state.submitStatus = 'submitting';
    },
    [LoginDetail.fulfilled]: async (state, action) => {
      state.submitStatus = 'succeeded';
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem(
        'userData',
        JSON.stringify(jwtDecode(action.payload.token))
      );
    },
    [LoginDetail.rejected]: (state, action) => {
      state.submitStatus = 'failed';
      Alert('error', action.payload.msg);
    },
    [createUser.pending]: (state, action) => {
      state.status = 'user';
    },
    [createUser.fulfilled]: (state, action) => {
      Alert('success', action.payload.msg);
    },
    [createUser.rejected]: (state, action) => {
      Alert('error', action.payload.msg);
    },
    [userFetch.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'succeeded';
      Alert('success', action.payload.msg);
    },

    [userUpdate.pending]: (state, action) => {
      state.status = 'loading';
    },
    [userUpdate.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      Alert('success', action.payload.msg);
    },
    [userUpdate.rejected]: (state, action) => {
      state.status = 'failed';
      Alert('error', action.payload.msg);
    },
    [archive.pending]: (state, action) => {
      state.status = 'loading';
    },
    [archive.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload.data;
      Alert('success', action.payload.msg);
    },
    [archive.rejected]: (state, action) => {
      state.status = 'failed';
      Alert('error', action.payload.msg);
    },
  },
});

export default auth.reducer;
