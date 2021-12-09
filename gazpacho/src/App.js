import CreateSession from "./components/Session/CreateSession";
import SessionsSummary from "./components/SessionsSummary/SessionsSummary";

function App() {
  return (
    <>
      <div className="App">
        <header>
          <h1>Gazpacho</h1>
        </header>
      </div>
      <div
        style={{ display: "inline-block", width: "25%", verticalAlign: "top" }}
      >
        <h2>Sessions</h2>
        <SessionsSummary />
      </div>
      <div style={{ display: "inline-block", width: "75%" }}>
        <CreateSession />
      </div>
    </>
  );
}

export default App;
