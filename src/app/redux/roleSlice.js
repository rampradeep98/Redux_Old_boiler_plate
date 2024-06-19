import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Alert } from '../services/AlertService';
import AxiosInstance from '../services/AxiosInstance';

const initialState = {
  submitStatus: 'idle',
  status: 'idle',
  data: [],
  role: [],
  scope: [],
  roleData: [],
};

export const fetchData = createAsyncThunk(
  'role/fetchData',
  async (data, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get(`role`);
      return response.data.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const createRole = createAsyncThunk(
  'role/createRole',
  async (data, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post(`role`, data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateRole = createAsyncThunk(
  'role/updateRole',
  async (data, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.put(`role/${data?.id}`, data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const archive = createAsyncThunk('role/archive', async (data) => {
  const response = await AxiosInstance.delete(`role/${data}`);
  return response.data;
});

export const fetchScope = createAsyncThunk(
  'role/scope',
  async (data, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get('scope');
      // console.log('response', response);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const fetchRoleData = createAsyncThunk(
  'role/roleDatas',
  async (roleData, { rejectWithValue }) => {
    try {
      const responseRole = await AxiosInstance.get(`role/getrole/`);
      // console.log('response', responseRole);
      return responseRole.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const role = createSlice({
  name: 'role',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchData.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchData.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
      let roleDatas = [];
      action?.payload?.map((item) => {
        roleDatas?.push({
          value: item.name,
          label: item.name,
        });
      });
      state.role = roleDatas;
    },
    [fetchData.rejected]: (state, action) => {
      state.status = 'failed';
      Alert('error', action.payload.msg);
    },
    [createRole.pending]: (state, action) => {
      state.status = 'loading';
    },
    [createRole.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.data.push({ ...action.payload.data });
      Alert('success', action.payload.msg);
    },
    [createRole.rejected]: (state, action) => {
      state.status = 'failed';
      Alert('error', action.payload.msg);
    },
    [updateRole.pending]: (state, action) => {
      state.status = 'loading';
    },
    [updateRole.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      Alert('success', action.payload.msg);
    },
    [updateRole.rejected]: (state, action) => {
      state.status = 'failed';
      Alert('error', action.payload.msg);
    },
    [archive.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      Alert('success', action.payload.msg);
    },
    [fetchScope.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchScope.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      let scopData = [];

      action.payload.map((item) => {
        scopData.push({
          value: item?.id,
          label: item?.scope,
        });
      });
      state.scope = scopData;
      Alert('success', action.payload.msg);
    },
    [fetchRoleData.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      let roleName = [];

      action?.payload[0]?.map((da) => {
        return roleName?.push({
          value: da?.name,
          label: da?.name,
        });
      })
      state.roleData = roleName;
    },
  },
});

export default role.reducer;
