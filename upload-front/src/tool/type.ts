export type resBase = {
  code: number,
  msg: string,
  originFilename?: string,
  url?: string,
  data: string | number[]

}

export type vueCropperElement = {
  getCropData: (cb: (data: string) => void) => void
}
export type reqBase64 = {
  file: string,
  filename: string
}
export type aa = {
  name: string,
  age: number
}