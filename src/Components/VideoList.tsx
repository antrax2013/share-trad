import * as React from 'react'
import * as cx from 'classnames'

import VideoStore from '../Store/VideoStore'
import { Video } from '../Store/VideoInterface'
import  VideoItem from './VideoItem'

interface videoListProps { }

interface videoListState { 
    videos : Video[]
}

export default class videoList extends React.PureComponent<videoListProps,videoListState>  {
  private store : VideoStore= new VideoStore()

  constructor (props: videoListProps) {
    super(props);

    this.state = {
        videos : [],
    }       
    this.store.onChange((store : VideoStore) => {
        this.setState({videos : store.videos})
    })    
  }

  componentDidMount() {
    this.store.loadVideo({
      id : '0',
      titre : 'Combien de temps vont ils tenir leurs mensonges ?',
      url : 'https://www.youtube.com/watch?v=PWQx2t7r404'
    })
  }


  render () {
    let {videos} = this.state
    return  <div className='video-list'>
              <ul>
              {
                  videos.map(v => {
                      return <VideoItem video={v} key={v.id} />
                  })
              }
              </ul>
            </div>
  }
}