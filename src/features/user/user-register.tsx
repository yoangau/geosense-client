import styled from "@emotion/styled"
import { Button, Input, Text } from "@geist-ui/react"
import { User as UserIcon } from "@geist-ui/react-icons"
import React, { useState } from "react"
import { CirclePicker } from "react-color"

const StyledCirclePicker = styled(CirclePicker)`
  margin-top: 15px;
`

const StyledRegisterButton = styled(Button)`
  margin-top: 15px;
`

export const UserRegister = () => {
  const [name, setName] = useState("")
  const [color, setColor] = useState("")

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
        // type={error ? "error" : "secondary"}
        auto
        ghost
        icon={<UserIcon />}
        // disabled={loading}
        // onClick={registerUser}
      >
        Register
      </StyledRegisterButton>
      {/* {error && <Text small>{error}</Text>} */}
    </>
  )
}

export default UserRegister
