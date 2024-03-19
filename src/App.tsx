import './App.css';
import Timer from './components/Timer/Timer';
import Tasks from './components/tasks-component/Tasks';

const App = () => {
  return (
    <main className="wrapper">
      <div className="containert">
        <Timer />

        <Tasks />
      </div>
    </main>
  );
};

export default App;
