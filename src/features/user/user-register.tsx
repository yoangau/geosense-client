import styled from "@emotion/styled"
import { Button, Input, Text } from "@geist-ui/react"
import React, { useState } from "react"
import { CirclePicker } from "react-color"
import { User } from "@geist-ui/react-icons"
import { useDispatch, useSelector } from "react-redux"
import { register, selectUser } from "./user.slice"

const StyledCirclePicker = styled(CirclePicker)`
  margin-top: 15px;
`

const StyledRegisterButton = styled(Button)`
  margin-top: 15px;
`

export const UserRegister = () => {
  const [name, setName] = useState("")
  const [color, setColor] = useState("")
  const { loading, error } = useSelector(selectUser)
  const dispatch = useDispatch()

  const registerUser = () => {
    if (name && color) dispatch(register({ name, color }))
  }

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
        icon={<User />}
        disabled={loading}
        onClick={registerUser}
      >
        Register
      </StyledRegisterButton>
      {error && <Text small>{error}</Text>}
    </>
  )
}

export default UserRegister
