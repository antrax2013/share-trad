import { Todo } from './TodoInterface'
import * as firebase from 'firebase'
import {db} from  './../../firestore-config'

declare type ChangeCallBack = (store : TodoStore) => void

export default class TodoStore {

    public todos : Todo [] = []
    private callBacks : ChangeCallBack[]= []    

    onChange(cb: ChangeCallBack) {
        this.callBacks.push(cb)
    }

    //Pour informer les différents callbacks d'un changement du store
    inform() : void {
        this.callBacks.forEach(cb => cb(this))
    }

    loadTodo(todo : Todo) : void {
        this.todos = [
            {
                id : todo.id, 
                title : todo.title, 
                completed : todo.completed
            } , ...this.todos // concat
        ]
        this.inform()
    }

    addTodo (title: string) : void {
        let todo : Todo = {
            title : title, 
            completed : false,
            id : db.collection("todos").doc().id
        }

        db.collection("todos").doc(this.todos.length.toString())
        .set(todo)
        .then(() => {
            this.todos = [
                todo , ...this.todos // concat
            ]
            this.inform()

        })        
    }

    removeTodo(todo: Todo) : void {
        const that = this

        db.collection("todos").doc(todo.id).delete().then(() => {
            that.todos = that.todos.filter(t=> t!== todo);
            that.inform()
        });        
    }

    clearCompleted() : void {
        const that = this

        db.collection("todos").where("completed", "==", true).get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                doc.ref.delete()
            })
            
            that.todos = that.todos.filter(t=> !t.completed);
            that.inform()
        })        
    }

    updateTitle(todo: Todo, title: string): void {
        db.collection("todos").doc(todo.id).update({
            title: title
        }).then(() => {
            this.todos = this.todos.map(t=> t === todo ? { ...t, title }:t )
            this.inform()
        });        
    }

    toggleTodo(todo:Todo, completed = true): void {
        const that = this
        db.collection("todos").doc(todo.id).update({
            completed: !todo.completed
        }).then(() => {
            that.todos = that.todos.map(t=> t === todo ? { ...t, completed: !t.completed }:t )
            that.inform()
        });    
    }

    toggleAll(completed = true): void {       
        const that = this
        db.collection("todos").where("completed", "==", !completed).get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            doc.ref.update({
                completed: completed
            }).then(() => {
                that.todos = that.todos.map(t=> completed !== t.completed ? { ...t, completed }:t )
                that.inform()
            })
        })})
        
    }
}

