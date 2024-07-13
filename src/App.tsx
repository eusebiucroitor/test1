import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './auth/register';
import Login from './auth/login';
import ProtectedRoute from './auth/ProtectedRoute';
import { AuthProvider } from './hooks/AuthProvider';
import Dashboard from './auth/dashboard';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
