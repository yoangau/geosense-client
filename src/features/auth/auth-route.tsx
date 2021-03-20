import React from "react"
import { Route, RouteProps } from "react-router-dom"
import { useRecoilValue } from "recoil"
import { UserSignUp } from "../user/user-sign-up"
import { userState } from "../user/user.atom"

export const AuthRoute = ({ component, ...props }: RouteProps) => {
  const user = useRecoilValue(userState)
  return <Route {...props} component={user ? component : UserSignUp} />
}

export default AuthRoute
