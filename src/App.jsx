import {Routes, Route} from "react-router-dom"
import Structure from "./Components/Structure"
const App = () => {
  return (
    <>
    
      <Routes>
          <Route path="/"  element={<Structure/>}/>
      </Routes>

    </>
  )
}

export default App;