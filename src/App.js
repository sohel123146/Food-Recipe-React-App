import "./App.css";
import LoadingBar from 'react-top-loading-bar';
import Recipe from "./comonents/Recipe";
import { useState } from "react";

function App() {
  const [progress, setProgress] = useState(0);

  return (
    <div className="App">
      <LoadingBar height={3} color="#f11946" progress={progress} />
      <Recipe setProgress={setProgress}/>
    </div>
  );
}

export default App;
