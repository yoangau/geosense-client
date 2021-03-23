import { createContext } from "react"
import SocketApi from "../../api/socket-api"

export const SocketContext = createContext<SocketApi | undefined>(undefined)

export default SocketContext
