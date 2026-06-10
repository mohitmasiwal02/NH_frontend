import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { publicAxios } from '@/lib/axios';

export interface Package {
  id: number;
  title: string;
  description: string;
  person: number;
  allowedPhotos: number;
}

interface PackagesState {
  items: Package[];
  total: number;
  page: number;
  limit: number;
  loading: boolean;
  error: string | null;
}

const initialState: PackagesState = {
  items: [],
  total: 0,
  page: 1,
  limit: 10,
  loading: false,
  error: null,
};

export const fetchPublicPackages = createAsyncThunk(
  'packages/fetchPublic',
  async ({ page = 1, limit = 10 }: { page?: number; limit?: number }, { rejectWithValue }) => {
    try {
      const { data } = await publicAxios.get('/public/packages', { params: { page, limit } });
      return data;
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      return rejectWithValue(error.response?.data?.message || 'Failed to load packages');
    }
  }
);

const packagesSlice = createSlice({
  name: 'packages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPublicPackages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPublicPackages.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
        state.total = action.payload.meta.total;
        state.page = action.payload.meta.page;
        state.limit = action.payload.meta.limit;
      })
      .addCase(fetchPublicPackages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default packagesSlice.reducer;
