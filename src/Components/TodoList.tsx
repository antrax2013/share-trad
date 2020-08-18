import * as React from 'react'
import TodoStore from './../Store/TodoStore'
import { Todo } from '../Store/TodoInterface'
import  TodoItem from './TodoItem'
import * as cx from 'classnames'

import * as firebase from 'firebase'
import {db} from  './../../firestore-config'

type FilterOption = 'completed' | 'active' | 'all'

interface TodoListProps { }

interface TodoListState { 
    todos : Todo[],
    newTodo : string,
    filter : FilterOption,
    loading : boolean
}

const Filters = {
    completed : (todo : Todo) => todo.completed,
    active : (todo : Todo) => !todo.completed,
    all : (todo : Todo) => true
  }

export default class TodoList extends React.PureComponent<TodoListProps,TodoListState>  {
    private store : TodoStore= new TodoStore()
    private toggleTodo: (todo : Todo) => void
    private destroyTodo: (todo : Todo) => void
    private clearCompleted: () => void
    private updateTitle : (todo : Todo, title : string) => void


    constructor (props: TodoListProps) {
        super(props);

        this.state = {
            todos : [],
            newTodo : '',
            filter : 'all',
            loading : true
        }       
        this.store.onChange((store) => {
            this.setState({todos : store.todos})
        })

        this.toggleTodo = this.store.toggleTodo.bind(this.store)
        this.destroyTodo = this.store.removeTodo.bind(this.store)
        this.clearCompleted = this.store.clearCompleted.bind(this.store)
        this.updateTitle = this.store.updateTitle.bind(this.store)
    }

    get remainingCount() : number {
        return this.state.todos.reduce((count, todo)=> !todo.completed? count+1:count,0)
    }

    get completedCount() : number {
        return this.state.todos.reduce((count, todo)=> todo.completed? count+1:count,0)
    }

    componentDidMount() {
        this.setState({loading : true})

        const db = firebase.firestore()

        const store = this.store
        db.collection('todos').get()
        .then(snapshot => {
            snapshot.docs.map(doc => store.loadTodo(
                {
                    id : doc.id,
                    title : (doc.data() as Todo).title,
                    completed : (doc.data() as Todo).completed
                })
            );          
        });
        
    }

  render () {
      //console.log("render")
      let {todos, newTodo} = this.state
      let remaining = this.remainingCount
      let completedCount = this.completedCount
      let todosFiltred = todos.filter(Filters[this.state.filter])

      if(this.state.loading) {
          <h1>Chargement en cours</h1>
      }
    return <section className="todoApp">
                    <header className="header">
                        <h1>todos</h1>
                        <input 
                            className="new-todo"    
                            defaultValue={newTodo}                        
                            placeholder="What needs to be done?" 
                            onBlur={this.validNewTodo} 
                            onKeyPress={this.editNewTodo} 
                            onInput={this.updateNewTodo} 
                        />
                    </header>
                    <section className="main">
                        <input id="toggle-all" className="toggle-all" type="checkbox" checked={remaining > 0} onChange={this.toggleAll} />
                        <label htmlFor="toggle-all">Mark all as complete</label>
                        <ul className="todo-list">
                            {
                                todosFiltred.map(t => {
                                    return <TodoItem todo={t} key={t.id} onToggle={this.toggleTodo} onDestroy={this.destroyTodo} onUpdate={this.updateTitle} />
                                })
                            }
                            
                        </ul>
                    </section>
                    <footer className="footer">
                        {remaining > 0 && 
                            <span className="todo-count">
                            <strong>{remaining}</strong> 
                            <span> </span>
                            <span>item{ remaining > 1 && 's'}</span>
                            <span> left</span>
                        </span> }
                        <ul className="filters">
                            <li><a href="#/" className={cx({ selected : this.state.filter === 'all'})} onClick={this.setFilter('all')}>All</a></li>
                            <span> </span>
                            <li><a href="#/active" className={cx({ selected : this.state.filter === 'active'})} onClick={this.setFilter('active')}>Active</a></li>
                            <span > </span>
                            <li><a href="#/completed" className={cx({ selected : this.state.filter === 'completed'})} onClick={this.setFilter('completed')}>Completed</a></li>
                        </ul>
                        {completedCount > 0 && <span className="clear-completed" onClick={this.clearCompleted}>Clear completed</span> }
                    </footer>
                </section>
  }

  updateNewTodo = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({newTodo : (e.target as HTMLInputElement).value})
  }

  setFilter = (filter : FilterOption) => {
    return (e: React.MouseEvent<HTMLElement>) => {
        this.setState({filter})
    }
  }

  createNewTodo = () => {
    this.store.addTodo(this.state.newTodo)
    this.setState({newTodo : ''})
}

  editNewTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key==='Enter') {
        (e.target as HTMLInputElement).value = ''
        this.createNewTodo()
      
    }
  }

  validNewTodo = (e: React.FormEvent<HTMLInputElement>) => {
    if(this.state.newTodo.length > 0 )  {
        (e.target as HTMLInputElement).value = ''
        this.createNewTodo()
    }
  }

  toggleAll = (e:React.FormEvent<HTMLInputElement>) => {
    this.store.toggleAll(this.remainingCount > 0)
  }
}
