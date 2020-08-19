import * as React from 'react'
import {Video} from '../Store/VideoInterface'
import ReactPlayer from 'react-player/lazy'
import * as cx from 'classnames'

interface Props {
  video : Video,
}

interface State {
}

export default class VideoItem extends React.PureComponent<Props, State>  {
  

  constructor(props: Props){
    super(props)
  }
  
  render () {
    let {video} = this.props

    return  <li className='video-item'>
              <div className="view">
                  <div className='video-link'>
                    <ReactPlayer config={
                      {
                        youtube:
                        {
                          playerVars: {
                            autoplay: 0,
                            modestbranding: 1,
                            rel : 0
                          }
                        }
                      }
                    }  
                      url={video.url} 
                      height='157px' 
                      width='280px' />
                  </div>
                  <div className='video-infos'>
                    <h1 className='video-title'>{video.titre}</h1>
                    <p className='video-depose'>
                      Proposée le 18/07/2020 par <a href='#' className='video-fournisseur-link'>Antrax</a>
                      <ul className='video-list-tags'>
                        <li className='video-tag'>Corbett Report</li>
                        <li className='video-tag'>Masques</li>
                      </ul>
                    </p>
                    <div className='video-list-trad-element'>
                      <ul className='video-list-trs'>
                        <li className='video-tr'>EN</li>
                        <li className='video-tr'>FR</li>
                      </ul>
                    </div>
                    <div className='video-list-st-element'>
                      <ul className='video-list-sts'>
                        <li className='video-st'>EN</li>
                        <li className='video-st'>FR</li>
                      </ul>
                    </div>
                  </div>
              </div>
            </li>
  }

  _onReady(event : any) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
}