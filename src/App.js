import { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";

function App() {
  const [foodName, setFoodName] = useState("");
  const [days, setDays] = useState(0);
  const [foodList, setFoodList] = useState([]);

  useEffect(() => {
    Axios.get("https://food-crud-mern.herokuapp.com/read").then((response) => {
      setFoodList(response.data);
    });
  }, []);

  const addToList = () => {
    Axios.post("https://food-crud-mern.herokuapp.com/insert", {
      foodName: foodName,
      days: days,
    });
  };

  return (
    <div className="App">
      <h1>CRUD app with mern</h1>
      <label>Food Name</label>
      <input
        type="text"
        onChange={(e) => {
          setFoodName(e.target.value);
        }}
      />
      <label>Days since you ate it:</label>
      <input
        type="number"
        onChange={(e) => {
          setDays(e.target.value);
        }}
      />
      <button onClick={addToList}>Add To List</button>
      <hr />
      <h1>Food List</h1>
      {foodList.map((val, key) => {
        return (
          <div key={key}>
            <h1>{val.foodName}</h1>
            <p>{val.daysSinceIAte}</p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
