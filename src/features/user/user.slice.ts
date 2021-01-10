import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { ApiErrorResponse } from "apisauce"
import UserApi from "../../api/http-api"
import { RootState } from "../../app/root-reducer"
import { User, UserRegisterInfo, UserState } from "./user.interface"

const initialState: UserState = {
  loading: false,
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
    console.log(response)
    if (!response.ok || !response.data) return rejectWithValue(response as ApiErrorResponse<User>)
    return response.data
  },
  {
    condition: (registerInfo, { getState }) => {
      const { loading }: UserState = getState().user
      return !loading
    },
  },
)

export const slice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(register.pending, state => {
      if (!state.loading) {
        state.loading = true
      }
    })
    builder.addCase(register.fulfilled, (state, action) => {
      if (state.loading) {
        state.loading = false
        state.user = action.payload
      }
    })
    builder.addCase(register.rejected, (state, action) => {
      if (state.loading) {
        state.loading = false
        state.error = action.payload?.originalError.message
      }
    })
  },
})

export const selectUser = (state: RootState): UserState => state.user

export const userActions = slice.actions

export default slice.reducer
