import { Video } from './VideoInterface'
import * as firebase from 'firebase'
import {db} from  '../../firestore-config'

declare type ChangeCallBack = (store : VideoStore) => void

export default class VideoStore {
  public videos : Video [] = []
  private callBacks : ChangeCallBack[]= []    

  onChange(cb: ChangeCallBack) {
    this.callBacks.push(cb)
  }

  inform() : void {
    this.callBacks.forEach(cb => cb(this))
  }

  loadVideo(v : Video) : void {
    this.videos = [
        {
            id : v.id, 
            titre : v.titre,
            url : v.url
        } , ...this.videos // concat
    ]
    this.inform()
  }
}