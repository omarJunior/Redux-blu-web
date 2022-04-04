
import { Provider } from 'react-redux';
import generateStore from './redux/store';
import Pokemones from './components/Pokemones';
import './App.css';


function App({callback}) {

  const store = generateStore()
  
  return (
      <Provider store={store}>
        <div className="container mt-3" ref={callback}>
          <Pokemones />
        </div>
      </Provider>
  );
}

export default App;
