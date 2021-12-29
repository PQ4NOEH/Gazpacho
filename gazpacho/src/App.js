import CreateSession from './components/Session/CreateSession';
import SessionsSummary from './components/SessionsSummary/SessionsSummary';

function App() {
  return (
    <div>
      <header className="bg-emerald-400 p-4">
        <h1 className="text-rose-600 text-3xl">Gazpacho</h1>
      </header>
      <section className="mx-8 p-8 flex flex-row">
        <div className="basis-1/4">
          <h2 className="text-rose-600 text-2xl">Sessions</h2>
          <SessionsSummary />
        </div>
        <div className="basis-3/4">
          <CreateSession />
        </div>
      </section>
    </div>
  );
}

export default App;
