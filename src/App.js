import { useState } from 'react';
import './App.css';
import axios from 'axios'
import { useEffect } from 'react';

// const server = 'http://localhost:4000/'
const server = 'https://gym-tracker-server-8ab6.onrender.com/'

export default function App() {

  const [data, setData] = useState(null)
  const [newReps, setReps] = useState(0)

  function addRep(n) {
    axios.post(`${server}addRep`, {amnt: n})
      .then(res => {
        setReps(res.data.newReps)
      })
  }

  function submitNew() {
    let data = {
      weight: document.getElementById('weight').value,
      reps: document.getElementById('reps').value
    }
    axios.post(`${server}newWeight`, data)
      .then((res) => {
        setData(res.data)
      })
  }

  function getInfo() {
    axios.get(`${server}getInfo`)
      .then((res) => {
        setData(res.data.cat)
        setReps(res.data.newReps)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function skip(n) {
    axios.post(`${server}movePos`, {amnt: n})
      .then(res => {
        console.log(res.data)
        setData(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    getInfo();
  }, [])

  return (
    <div className="App">
      {data? (
        <div className='cont'>
          <div className="block">
            <div className="skipButtons">
              <button onClick={()=>{skip(-1)}} className="skipBack">&#8249;</button>
              <h2>{data.part}</h2>
              <button onClick={()=>{skip(1)}} className="skipForward">&#8250;</button>
            </div>
            <h3>Previous Weight</h3>
            <span>{data.weight}</span>
            <h3>Reps</h3>
            <span>{data.reps}</span>
          </div>
          
          <div className="block">
            <h3>New Weight</h3>
            <input id='weight' type="number" defaultValue={data.weight} />
            <h3>Reps Today</h3>
            <div className="row">
              <button onClick={() => {addRep(-1)}}>-</button>
              <input id='reps' className='newReps' type="number" value={newReps} />
              <button onClick={() => {addRep(1)}}>+</button>
            </div>
            <br />
            <br />
            <button className='submit' onClick={submitNew}>UPDATE</button>
          </div>
        </div>
      ) :''}
    </div>
  );
}
