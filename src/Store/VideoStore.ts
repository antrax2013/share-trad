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
            url : v.url,
            datePublication : v.datePublication,
            demandeur : v.demandeur,
            tags : v.tags,
            transScripts : v.transScripts,
            sousTitrages : v.sousTitrages,
            nbVotes : v.nbVotes
        } , ...this.videos // concat
    ]
    this.inform()
  }

  increment(video: Video) : void {
    this.videos = this.videos.map(v=> v === video ? { ...v, nbVotes : video.nbVotes+1 }:v )
            this.inform()
  }
}