import * as React from 'react'
import {Todo} from '../Store/TodoInterface'
import * as cx from 'classnames'


interface Props {
  todo : Todo,
  onToggle : (todo : Todo) => void
  onDestroy : (todo : Todo) => void
  onUpdate : (todo : Todo, title : string) => void
}

interface State {
  editing : boolean
  title: string
}

//Remplacement de comonent par pureComponent pour evitier de rendre si pas de changement
export default class TodoList extends React.PureComponent<Props, State>  {
  

  constructor(props: Props){
    super(props)

    this.state = {
      editing : false,
      title : ''
    }
  }

  /*shouldComponentUpdate({todo}: Props, state : State){ //=> méthode pour éviter le rendu si pas de changement au niveau du component
    return todo !== this.props.todo
  }*/

  render () {
    console.log("Render.PureComponent")
    let {todo} = this.props
    let {editing, title} = this.state
    return <li className={cx({ completed : todo.completed, editing })}>
                <div className="view">
                    <input className="toggle" type="checkbox" onChange={this.toggle} checked={todo.completed} />
                    <label onDoubleClick={this.startEditing}>{todo.title}</label>
                    <button className="destroy" onClick={this.destroy}></button>
                </div>
                
                <input 
                  className="edit" 
                  defaultValue={todo.title}
                  onBlur={this.handleSubmit}
                  onKeyDown = {this.handleKeyDown}
                  onInput = {this.handleInput}
                />
          </li>
  }

  toggle =  (e : React.ChangeEvent<HTMLInputElement>) => {
    //console.log("change")
    //e.preventDefault()
    let {todo} = this.props
    this.props.onToggle(todo)
  }
  
  destroy =  (e : React.MouseEvent<HTMLButtonElement>) => {
    this.props.onDestroy(this.props.todo)
  }

  startEditing = (e : React.MouseEvent<HTMLLabelElement>) => {
    this.setState({editing : true, title : this.props.todo.title})
  }

  edit (value : string) : void {
    this.props.onUpdate(this.props.todo, value)
    this.setState({editing : false})
  }

  handleSubmit= (event: React.FocusEvent<HTMLInputElement>) => {
    let value = (event.target as HTMLInputElement).value
  
    if(value.length > 0) {
      this.edit(value)
    }
    this.setState({editing : false})
  }

  handleKeyDown= (event: React.KeyboardEvent<HTMLInputElement>)=> {
    if(event.key==='Escape'){
      this.setState({editing : false})
    }
    else if (event.key==='Enter') {
      this.edit((event.target as HTMLInputElement).value)
    }
  }

  handleInput= (event: React.FormEvent<HTMLInputElement>)=> {
    this.setState({title : (event.target as HTMLInputElement).value})
  }

}