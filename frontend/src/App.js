import { Provider } from 'react-redux';
import './App.css';
import Header from './components/header/Header';
import Navbar from './components/navbar/Navbar';
import Project from './components/project/Project';
import { store } from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <div className='main'>
          <Navbar />
          <Project />
        </div>
      </div>
    </Provider>
  );
}

export default App;
