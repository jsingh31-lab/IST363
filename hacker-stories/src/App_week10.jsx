function showMessage(message) {
    alert(message);
  }
  
  function App() {
    return (
      <div>
        <h1>Button React</h1>
        <button onClick={() => showMessage('The button is working!')}>
          Click Me
        </button>
      </div>
    );
  }
  
  export default App;
  