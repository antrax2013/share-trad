import * as React from 'react'
import * as cx from 'classnames'

import Header from './Header'
import VideoList from './VideoList'
import Footer from './Footer'

interface homeProps { }
interface homeListState { }

export default class home extends React.PureComponent<homeProps,homeListState>  {

  render () {
    return <section className="home-body">
                  <header className="header">
                    <Header />
                  </header>
                  <section className="main">
                    <VideoList />
                  </section>
                  <footer className="footer">
                    <Footer />
                  </footer>
              </section>
  }
}