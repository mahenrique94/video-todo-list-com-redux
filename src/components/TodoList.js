import React, { Component } from 'react'

import { actions, store } from '../redux'

import './TodoList.css'

class TodoList extends Component {

    state = {
        task: '',
        tasks: []
    }

    componentDidMount() {
        store.subscribe(() => {
            this.setState({
                task: '',
                tasks: store.getState().todoReducer.tasks
            })
        })
    }

    render() {
        const { task, tasks } = this.state
        return (
            <div className="todo">
                <form className="todo-form" onSubmit={ this.handleSubmit }>
                    <input className="todo-field" onChange={ this.handleChange } type="text" value={ task }/>
                    <button className="todo-btn" type="submit">Add</button>
                </form>
                <table className="todo-table">
                    <thead>
                        <tr>
                            <th>Task</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { tasks.map(task => (
                            <tr key={ task }>
                                <td>{ task }</td>
                                <td>
                                    <button className="todo-table-btn" onClick={ () => this.handleRemove(task) } type="button">Done</button>
                                </td>
                            </tr>
                        )) }
                    </tbody>
                </table>
            </div>
        )
    }

    handleChange = event => this.setState({ task: event.target.value })

    handleRemove = task => store.dispatch(actions.remove(task))

    handleSubmit = event => {
        const { task } = this.state
        event.preventDefault()
        store.dispatch(actions.add(task))
    }

}

export default TodoList