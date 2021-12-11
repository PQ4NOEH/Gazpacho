import CreateSession from "./components/Session/CreateSession";
import SessionsSummary from "./components/SessionsSummary/SessionsSummary";

function App() {
  return (
    <div
      style={{
        width: "75%",
        margin: "2em auto",
        backgroundColor: "cadetblue",
        padding: "2em",
        borderRadius: "5px",
      }}
    >
      <div className="App">
        <header>
          <h1>Gazpacho</h1>
        </header>
      </div>
      <div
        style={{
          display: "inline-block",
          width: "25%",
          verticalAlign: "top",
        }}
      >
        <h2>Sessions</h2>
        <SessionsSummary />
      </div>
      <div style={{ display: "inline-block", width: "75%" }}>
        <CreateSession />
      </div>
    </div>
  );
}

export default App;
