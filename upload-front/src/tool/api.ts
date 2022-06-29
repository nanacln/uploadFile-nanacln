import request from './request'
import { AxiosRequestConfig } from 'axios'
import { resBase, reqBase64 } from './type'

export function UploadSingle(param: FormData, other?: AxiosRequestConfig): Promise<resBase> {
  const config =Object.assign({
    headers: {
        'Content-Type': 'multipart/form-data',
    },
  },other)
  return request.post('/upload_single', param,config)
}
export function UploadBase64(param: reqBase64): Promise<resBase> {
  return request.post('/upload_single_base64', param)
}
export function uploadBigCheck(md5Val: string): Promise<resBase> {
  return request.post('/bigFile/check', { md5Val })
}
export function uploadBigUp(md5Val: string, param: FormData): Promise<resBase> {
  return request.post(`/bigFile/upload?md5Val=${md5Val}`, param,{
    headers: {
        'Content-Type': 'multipart/form-data',
    },
  })
}
export function uploadBigMerge(md5Val: string, ext: string): Promise<resBase> {
  return request.post('/bigFile/merge', { md5Val, ext })
}