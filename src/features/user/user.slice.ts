import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { ApiErrorResponse } from "apisauce"
import UserApi from "../../api/http-api"
import { RootState } from "../../app/root-reducer"

export interface UserRegisterInfo {
  name: string
  color: string
}

enum Loading {
  Idle,
  Pending,
}

export interface User {
  id: number
  color: string
  dateCreated: Date
  games: any[]
  adminGroups: any[]
  groups: any[]
  isActive: boolean
}

export interface UserState {
  user?: User
  loading: Loading
  error?: string
}

const initialState: UserState = {
  loading: Loading.Idle,
}

const userApi = new UserApi()

export const register = createAsyncThunk<
  User,
  UserRegisterInfo,
  {
    state: RootState
    requestId: string
    rejectValue: ApiErrorResponse<User>
  }
>(
  "user/register",
  async (registerInfo, { rejectWithValue }) => {
    const response = await userApi.register(registerInfo)
    if (!response.ok || !response.data) return rejectWithValue(response as ApiErrorResponse<User>)
    return response.data
  },
  {
    condition: (registerInfo, { getState }) => {
      const { loading }: UserState = getState().user
      return loading === Loading.Idle
    },
  },
)

export const slice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(register.pending, state => {
      if (state.loading === Loading.Idle) {
        state.loading = Loading.Pending
      }
    })
    builder.addCase(register.fulfilled, (state, action) => {
      if (state.loading === Loading.Pending) {
        state.loading = Loading.Idle
        state.user = action.payload
      }
    })
    builder.addCase(register.rejected, (state, action) => {
      if (state.loading === Loading.Pending) {
        state.loading = Loading.Idle
        state.error = action.payload?.originalError.message
      }
    })
  },
})

export const selectUser = (state: RootState): UserState => state.user

export const userActions = slice.actions

export default slice.reducer
