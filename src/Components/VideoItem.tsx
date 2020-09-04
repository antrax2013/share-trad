import * as React from 'react'
import {Video} from '../Store/VideoInterface'
import ReactPlayer from 'react-player/lazy'
import { format } from "date-fns";
import * as cx from 'classnames'

interface Props {
  video : Video,
  onIncrement : (video : Video) => void
}

interface State {
  incremented : boolean
}

export default class VideoItem extends React.PureComponent<Props, State>  {  

  constructor(props: Props){
    super(props)
    this.state = { incremented : false }
  }
  
  render () {
    let {video} = this.props

    let ops = {
      youtube :
      {
        playerVars: {
          autoplay: 0,
          modestbranding: 1,
          rel : 0
        }
      }
    }

  //#region render
    return  <li className='video-item'>
              <div className="view">
                  <div className='video-link'>
                    <ReactPlayer config={ops}  
                      url={video.url} 
                      height='157px' 
                      width='280px' />
                  </div>
                  <div className='video-infos'>
                    <h1 className='video-title'>{video.titre}</h1>
                    <div className='video-depose'>
                      Proposée le {format(video.datePublication, "dd/MM/yyyy")} par <a href='#' className='video-fournisseur-link'>{video.demandeur}</a>
                      <ul className='video-list-tags'>
                        {
                            video.tags.map(t => {
                                return <li className={`video-tag t`} key={t}>{t}</li>
                            })
                        }
                      </ul>
                    </div>
                    <div className='video-list-trad-element'>
                      <ul className='video-list-trs'>
                        {
                            video.transScripts.map(t => {
                                return <li className={`video-tr t`} key={t}>{t}</li>
                            })
                        }
                      </ul>
                    </div>
                    <div className='video-list-st-element'>
                      <ul className='video-list-sts'>
                        {
                            video.sousTitrages.map( t => {
                                return <li className={`video-st t`} key={t}>{t}</li>
                            })
                        }
                      </ul>
                    </div>
                  </div>
                  <div className='video-votes'>
                    <span>{video.nbVotes} votes</span>
                    <button className="plus1" key={video.id} disabled={this.state.incremented} onClick={this.like}>+1</button>
                  </div>
              </div>
            </li>
  }
  //#endregion

  like = (e : React.MouseEvent<HTMLButtonElement>) => {
    let {video} = this.props
    this.props.onIncrement(video)
    this.setState({incremented : true})
  }

  _onReady(event : any) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
}