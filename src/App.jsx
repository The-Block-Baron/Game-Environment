import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/main/Main';

function MainApp() {

  return (
    <Routes>
      <Route path="/" element={<Main />} />
    </Routes>
  )
}

const App = () => {
  return (
    <Router>
      <MainApp />
    </Router>
  );
};

export default App;

