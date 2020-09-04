import * as React from 'react'
import * as cx from 'classnames'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Header from './Header'
import VideoList from './VideoList'
import TodoList from './TodoList'
import Footer from './Footer'

interface homeProps { }
interface homeListState { }

export default class home extends React.PureComponent<homeProps,homeListState>  {

  render () {
    return (
      <section className="home-body">
        <Router>
          <header className="header">
            <Header />
          </header>
          <section className="main">
            <Switch>
              <Route exact path='/' component={VideoList} />
              <Route path='/todo' component={TodoList} />
            </Switch>
          </section>
          <footer className="footer">
            <Footer />
          </footer>
        </Router>
      </section>
    )
  }
}