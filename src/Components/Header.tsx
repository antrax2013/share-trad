import * as React from 'react'
import * as cx from 'classnames'
import {Link} from 'react-router-dom';

interface headerProps { }
interface headerListState { }

export default class header extends React.PureComponent<headerProps,headerListState>  {

  render () {
    return (
      <section>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav mr-auto">
            <li><Link to={'/todo'} className="nav-link">Todo</Link></li> |
            <li><Link to={'/'} className="nav-link"> Home </Link></li>
          </ul>
        </nav>
      </section>
    )
  }
}