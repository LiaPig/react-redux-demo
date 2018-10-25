import React from 'react'
import { Component } from 'react'

class Counter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            count: props.count || 0,
            hello: props.hello || ''
        }
    }

    render() {
        const { count, hello, onIncreaseClick, onSayHello } = this.props
        // console.log(this.props)
        return (
            <div className="my-button">
                <button onClick={onIncreaseClick}>Click Me</button>
                <button onClick={onSayHello}>Say Hello</button>
                <div>
                    <div>Click Count: {count}</div>
                    <div>Say: {hello}</div>
                </div>
            </div>
        )
    }

    propTypes: {
        count: propTypes.number.isRequired,
        hello: propTypes.string.isRequired,
        onIncreaseClick: PropTypes.func.isRequired,
        onSayHello: PropTypes.func.isRequired
    }
}

export default Counter


