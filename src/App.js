import './App.css';

import { Header, Footer } from './components';
import { Allroutes } from './routes/Allroutes';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Allroutes />
      </main>
      <Footer />
    </div>
  );
}

export default App;
