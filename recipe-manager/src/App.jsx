import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import HomePage from './pages/HomePage';
import AddMenu from './pages/AddMenu';
import EditPage from './pages/EditPage';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/homepage" element={<HomePage />} />
      <Route path="/addmenu" element={<AddMenu />} />
      <Route path="/editpage" element={<EditPage />} />
    </Routes>
  );
}

export default App
