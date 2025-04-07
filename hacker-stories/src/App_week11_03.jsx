import { useState } from "react";

// Sets up useState, what variable, what function changes it, and what start value
const Home = () => {
  const [name, setName] = useState('Jaspreet')


// Function actually making dynamic change
let handleClick = () => {
  setName('Geralt');
}

  return (
    <div className="home">
      <h1>Hello World</h1>
      <p>{name}</p>
      <button onClick={handleClick}>Update Name</button>
    </div>
  );
}

export default Home;
