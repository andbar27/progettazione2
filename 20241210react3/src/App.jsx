import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './components/Card'
import Card from './components/Card'


function App() {
  const [count, setCount] = useState(0)

  const cities =[
    {
      id:0,
      name: "Tokyo",
      desc: "Capitale del Giappone",
      imgUrl: "https://www.bandiere.it/uploads/2016-6-6/1200-0/tokyo.jpg",
      isVisit: false,
    },
    {
      id:1,
      name: "Roma",
      desc: "Capitale del Mondo",
      imgUrl: "https://upload.wikimedia.org/wikipedia/commons/3/31/Roma-Stemma-2.svg",
      isVisit: true,
    },
    {
      id:2,
      name: "New York",
      desc: "Capitale di New York",
      imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSP8xJELCTKJplZFoq9yG9JwO8zRto1jiHTg&s",
      isVisit: false,
    },
  ]

  return (
    <>
      <div>
          {cities.map((city) => (
            <Card 
              key = {city.id}
              titolo={city.name}
              imgUrl={city.imgUrl}
              isVisit={city.isVisit}
              descrizione={city.desc}
            >
            </Card>
          ))}

          {cities.filter((city) => city.isVisit == true).map(
            (city)=>(
              <Card 
                key = {city.id}
                titolo={city.name}
                imgUrl={city.imgUrl}
                isVisit={city.isVisit}
                descrizione={city.desc}
              >
              </Card>
            ))}

        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App