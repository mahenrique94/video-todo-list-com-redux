import React, { Component } from 'react'

import { Provider } from 'react-redux'

import { store } from './redux'

import TodoList from './components/TodoList'

import './App.css'

class App extends Component {

    render() {
        return (
            <Provider store={ store }>
                <div className="container">
                    <TodoList/>
                </div>
            </Provider>
        )
    }

}

export default App
