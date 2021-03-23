import styled from "@emotion/styled"
import { Button, Input, Text } from "@geist-ui/react"
import { User as UserIcon } from "@geist-ui/react-icons"
import React, { useCallback, useEffect, useState } from "react"
import { CirclePicker } from "react-color"
import { useSetRecoilState } from "recoil"
import HttpApi from "../../api/http-api"
import { userState } from "./user.atom"

const StyledCirclePicker = styled(CirclePicker)`
  margin-top: 15px;
`

const StyledRegisterButton = styled(Button)`
  margin-top: 15px;
`

const httpApi = new HttpApi()

export const UserSignUp = () => {
  const [name, setName] = useState("")
  const [color, setColor] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const setUser = useSetRecoilState(userState)

  useEffect(() => setError(""), [name, color])

  const signUp = useCallback(async () => {
    if (!name || !color) {
      setError("The name and the color should be selected before submitting")
      return
    }
    setLoading(true)
    const signUpResponse = await httpApi.signUp({ name, color })
    setLoading(false)
    setUser(signUpResponse)
    setError(signUpResponse ? "" : "An error has occurred :(")
  }, [name, color])

  return (
    <>
      <Text h1>Register</Text>
      <Input
        label="name"
        placeholder="Will Bevisible"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <StyledCirclePicker color={color} onChange={c => setColor(c.hex)} />
      <StyledRegisterButton
        type={error ? "error" : "secondary"}
        auto
        ghost
        icon={<UserIcon />}
        disabled={loading}
        onClick={signUp}
      >
        Register
      </StyledRegisterButton>
      {error && <Text small>{error}</Text>}
    </>
  )
}

export default UserSignUp
