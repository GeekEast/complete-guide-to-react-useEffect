import React, { Component } from 'react';

export default class CounterClass extends Component {
  timeout = 0;
  constructor(props) {
    super(props);
    this.state = { count: 0 }
    console.log('constructor');
  }

  componentDidMount() {
    console.log('componentDidMount');
    this.setState({count: 1000});
    // this.timeout = setInterval(() => {
    //   this.setState({ count: this.state.count + 1 });
    //   console.log(this.state.count);
    // }, 1000);
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');
  }

  componentWillUnmount() {
    console.log('clean');
    clearInterval(this.timeout);
  }

  render() {
    console.log('render');
    return (
      <div>
        {this.state.count}

        <button onClick={() => {this.setState({count:100})}}>click me</button>
      </div>
    )
  }
}
