
import { BrowserRouter,  Route, Routes } from 'react-router-dom';

import Register from './auth/register'
import Login from './auth/login'

const App = () => {
  return (
    <>
    <BrowserRouter>
    
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
       

      </Routes>
    
    </BrowserRouter>
  
  </>
);
}
export default App
