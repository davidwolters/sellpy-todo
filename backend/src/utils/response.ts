import { ResponseObject, Status } from "@typedefs/response"
import { Response } from "express"

const getResponse = (
  success: boolean,
  data: any,
  status: Status
): ResponseObject => ({
  success,
  data,
  status
})

export const getSuccess = (data: any) => getResponse(true, data, Status.Ok)

const getError = (data: any, status: Status) => getResponse(false, data, status)
export const getBadRequest = (data: any, message?: string) =>
  getError({ ...data, message }, Status.BadRequest)
export const getInternalError = (data: any, message?: string) =>
  getError({ ...data, message }, Status.InternalError)

export const sendResponse = (res: Response, responseObject: ResponseObject) =>
  res.status(responseObject.status).json(responseObject)
const sendFromFunction =
  (res: Response, responseGetter: (...args: any[]) => ResponseObject) =>
  (...args: any[]) => {
    const responseObject = responseGetter(...args)
    res.status(responseObject.status).json(responseObject)
  }

export const sendSuccess = (res: Response, data: any) =>
  sendFromFunction(res, getSuccess)(data)
export const sendBadRequest = (res: Response, data: any, message?: string) =>
  sendFromFunction(res, getBadRequest)(data, message)
export const sendInternalError = (res: Response, data: any, message?: string) =>
  sendFromFunction(res, getInternalError)(data, message)
