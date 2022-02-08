export enum Status {
  Ok = 200,
  BadRequest = 400,
  InternalError = 500
}

export type ResponseObject = {
  success: boolean
  status: Status
  data: any
}
