import { forIn, transform } from "lodash"
import io, { Socket } from "socket.io-client"
import { getUserToken } from "../helpers/local-storage"

export enum SocketEmitType {
  Join = "join",
  Remove = "remove",
}

export type SocketEmitCallback<T> = (payload: T) => void

export type SocketEmit = Record<
  SocketEmitType,
  <T, U>(data: T, callback?: SocketEmitCallback<U>) => void
>

export enum SocketOnType {
  Update = "update",
}
export type SocketOnCallback<T> = (payload?: T) => void

export type SocketOn = Record<SocketOnType, <T>(callback: SocketOnCallback<T>) => void>

export type SocketOnRegister<T> = Record<SocketOnType, SocketOnCallback<T>>

export default class SocketSocket {
  private socket: typeof Socket

  private createEmitApi = (eventType: string) => <T, U>(
    data: T,
    callback?: SocketEmitCallback<U>,
  ) => {
    if (callback) this.socket.emit(eventType, data, callback)
    else this.socket.emit(eventType, data)
  }

  private createOnApi = (eventType: string) => <T>(callback: SocketOnCallback<T>) => {
    this.socket.on(eventType, callback)
  }

  private on: SocketOn

  private registerOnEvents = <T>(onEvents: SocketOnRegister<T>) => {
    forIn(this.on, (_, key) => this.on[key as SocketOnType](onEvents[key as SocketOnType]))
  }

  private static initSocket<T, U extends CallableFunction, V>(enumType: T, createFunction: U): V {
    return transform(
      Object.values(enumType),
      (result: Record<string, CallableFunction>, type: string) => {
        result[type] = createFunction(type)
      },
      {},
    ) as V
  }

  public emit: SocketEmit

  public constructor(onEvents: SocketOnRegister<any>) {
    const token = getUserToken()
    this.socket = io("localhost:3001", {
      query: { token },
      autoConnect: false,
    })
    this.on = SocketSocket.initSocket(SocketOnType, this.createOnApi)
    this.emit = SocketSocket.initSocket(SocketEmitType, this.createEmitApi)
    this.registerOnEvents(onEvents)
    this.socket.connect()
  }
}
