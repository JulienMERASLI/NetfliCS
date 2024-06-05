import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Layout from './components/Layout/Layout';
import Auth from './pages/Auth/Auth';
import Signup from './pages/Signup/Signup';
import AddMovieForm from './pages/AddMovie/AddMovie';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Auth />} />
        <Route path="signup" element={<Signup />} />
        <Route path="about" element={<About />} />
        <Route path="addMovie" element={<AddMovieForm />} />
        <Route path="*" element={<h1>404 - Not Found</h1>} />
      </Routes>
    </Layout>
  );
}

export default App;
