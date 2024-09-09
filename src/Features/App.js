import './App.css'
import { useState } from 'react';
import store from '../store';

function App() {

  // console.log(store)

  const [bugs, setBugs] = useState([])

  store.subscribe(() => {
    setBugs(store.getState())
  })

  const [showAddBugPopUp, setShowAddBugPopUp] = useState(false)
  const [showRemoveBugPopUp, setShowRemoveBugPopUp] = useState(false)
  const [showResolveBugPopUp, setShowResolveBugPopUp] = useState(false)

  const [bugDescription, setBugDescription] = useState('')
  const [bugRemoveId, setBugRemoveId] = useState(0)
  const [bugResolveId, setBugResolveId] = useState(0)

  const addBug = () => {
    if (bugDescription !== '') {
      store.dispatch({
        type: 'bugAdded',
        payload: {
          description: bugDescription
        }
      })
    } else {
      alert("Invalid description!")
      return true;
    }

    setShowAddBugPopUp(false)
    setBugDescription('')
  }

  const removeBug = () => {
    if (bugRemoveId > 0) {
      store.dispatch({
        type: 'bugRemoved',
        payload: {
          id: bugRemoveId
        }
      })
    } else {
      alert("Invalid Id!")
      return true;
    }

    setShowRemoveBugPopUp(false)
    setBugRemoveId(0)
  }

  const resolveBug = () => {
    if (bugResolveId > 0) {
      store.dispatch({
        type: 'bugResolved',
        payload: {
          id: bugResolveId
        }
      })
    } else {
      alert("Invalid Id!")
      return true;
    }

    setShowResolveBugPopUp(false)
    setBugResolveId(0)
  }

  const removeAllBug = () => {
    if (bugs.length > 0) {
      let permission = window.confirm("You sure? select OK to confirm")
      permission && store.dispatch({
        type: 'bugRemoveAll',
      })
    } else {
      alert("NO BUGS FOUND!")
    }
  }

  return (
    <div className='mainDiv'>

      <div className='mainHeadingDiv'>
        <h1>Reported Bugs</h1>
        <button className='mainBtn' onClick={() => setShowAddBugPopUp(true)} children='Add Bug' />
        <button className='mainBtn' onClick={() => bugs.length > 0 ? setShowRemoveBugPopUp(true) : alert("NO BUGS FOUND!")} children='Remove Bug' />
        <button className='mainBtn' onClick={() => bugs.length > 0 ? setShowResolveBugPopUp(true) : alert("NO BUGS FOUND!")} children='Resolve Bug' />
        <button className='mainBtn' onClick={removeAllBug} children='Remove All' />
      </div>

      <div className='mainBugDiv'>
        {
          bugs.length > 0 ? bugs.map(bug => <div key={bug.id} className='bugDiv'>
            <div>
              <b>ID</b>: {bug.id}
            </div>
            <div>
              <b>Resolved</b>: {bug.resolved ? 'Yes' : 'No'}
            </div>
            <div>
              <b>Description</b>: {bug.description}
            </div>
          </div>) : ''
        }
      </div>

      {
        showAddBugPopUp ?
          <>
            <div className='popUpBack'></div>
            <div className='popUp'>
              <span className='closePopUp' onClick={() => setShowAddBugPopUp(false)}>X</span>
              <div className='popUpHeading'>
                <h2>Add Bug</h2>
              </div>
              <div className='popUpInputDiv'>
                <input autoFocus={true} type='text' placeholder='Enter Bug Description' onChange={event => setBugDescription(event.target.value)} />
              </div>
              <div className='popUpSubmitBtn'>
                <button onClick={addBug} children='SUBMIT' />
              </div>
            </div>
          </> : ''
      }

      {
        showRemoveBugPopUp ?
          <>
            <div className='popUpBack'></div>
            <div className='popUp'>
              <span className='closePopUp' onClick={() => setShowRemoveBugPopUp(false)}>X</span>
              <div className='popUpHeading'>
                <h2>Remove Bug</h2>
              </div>
              <div className='popUpInputDiv'>
                <input autoFocus={true} type='number' placeholder='Enter Bug Id' onChange={event => setBugRemoveId(event.target.value)} />
              </div>
              <div className='popUpSubmitBtn'>
                <button onClick={removeBug} children='SUBMIT' />
              </div>
            </div>
          </> : ''
      }

      {
        showResolveBugPopUp ?
          <>
            <div className='popUpBack'></div>
            <div className='popUp'>
              <span className='closePopUp' onClick={() => setShowResolveBugPopUp(false)}>X</span>
              <div className='popUpHeading'>
                <h2>Resolve Bug</h2>
              </div>
              <div className='popUpInputDiv'>
                <input autoFocus={true} type='number' placeholder='Enter Bug Id' onChange={event => setBugResolveId(event.target.value)} />
              </div>
              <div className='popUpSubmitBtn'>
                <button onClick={resolveBug} children='SUBMIT' />
              </div>
            </div>
          </> : ''
      }

    </div>
  );
}

export default App;