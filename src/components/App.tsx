import React, { useState } from 'react';
// import Progress from './Progress';
import Counter from './Counter/Counter';
// import CounterClass from './Counter/CounterClass';
import SearchResult from './Search/SearchResult';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

const Root = () => {
  return <div>
    Root
  </div>
}

const App = () => {
  const [step, setStep] = useState(1)
  return (
    <div>
      <button onClick={() => { setStep(step + 1) }}> Increase Step</button>
      <Router>
        <ul>
          <li><Link to='/counter'>Counter</Link></li>
          <li><Link to='/counterprops'>Counter Props</Link></li>
          <li><Link to='/search'>Search</Link></li>
          <li><Link to='/'>Main</Link></li>
        </ul>
        <Switch>
          <Route path='/counter' component={Counter}></Route>
          <Route path='/counterprops' render={(props) => (<Counter {...props} step={step} />)}></Route>
          <Route path='/search' component={SearchResult}/>
          <Route path='/' component={Root}></Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App;