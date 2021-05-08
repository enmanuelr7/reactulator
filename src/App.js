import './App.css';
import Calculator from './components/Calculator';
import { AppProvider } from './context/AppState';

function App() {
  return (
    <div className="App">
      <AppProvider>
        <Calculator />
      </AppProvider>
    </div>
  );
}

export default App;
