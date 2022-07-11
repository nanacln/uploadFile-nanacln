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
export type ManyUploadState = {
  imgUrls: string[],
  imgUrls2: string[]
}
export type BigFileState={
  rate:number,
  rate2:number,
  time:number,
  url:string,
  url2:string,
  time2:number,
  showUploadProgress:boolean,
  showUploadProgress2:boolean
}