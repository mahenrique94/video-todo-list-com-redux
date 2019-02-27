import React, { Component } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { actions } from '../redux'

import './TodoList.css'

class TodoList extends Component {

    state = {
        task: ''
    }

    render() {
        const { tasks } = this.props
        const { task } = this.state
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

    handleRemove = task => {
        const { remove } = this.props
        remove(task)
    }

    handleSubmit = event => {
        const { add } = this.props
        const { task } = this.state
        event.preventDefault()
        add(task)
        this.setState({ task : '' })
    }

}

const mapStateToProps = state => ({
    tasks: state.todoReducer.tasks
})

const mapDispatchToProps = dispatch => ({
    add: bindActionCreators(actions.add, dispatch),
    remove: bindActionCreators(actions.remove, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)