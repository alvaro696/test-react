import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorBoundary from './components/ErrorBoundary';
import { Spin } from 'antd';

//rutas de paginas y/o componenetes, se usa lazy para optimizar el cargado
const Login = lazy(() => import('./pages/Login'));
const RegistroCliente = lazy(() => import('./pages/RegistroCliente'));
const Inicio = lazy(() => import('./pages/Inicio'));
const Perfil = lazy(() => import('./pages/Perfil'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Unauthorized = lazy(() => import('./pages/Unauthorized'));
const AdminPanel = lazy(() => import('./pages/AdminPanel'));
const RoleManagement = lazy(() => import('./pages/RoleManagement'));
const PermissionManagement = lazy(() => import('./pages/PermissionManagement'));

const Cuentas = lazy(() => import('./pages/Cuentas'));

import Transferencias from './pages/Transferencias';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ErrorBoundary>
          <Suspense
            fallback={
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
              }}>
                <Spin size="large" tip="Cargando..." />
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/registro" element={<RegistroCliente />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />}>
                  <Route index element={<Inicio />} />
                  <Route path="perfil" element={<Perfil />} />
                  <Route path="cuentas" element={<Cuentas />} />
                  <Route path="transferencias" element={<Transferencias />} />
                  {/* <Route path="distritos" element={<Distritos />} />
                  <Route path="gerencias" element={<Gerencias />} />
                  <Route path="areas" element={<Areas />} /> */}
                  <Route path="usuarios">
                    <Route path="user" element={<AdminPanel />} />
                    <Route path="roles" element={<RoleManagement />} />
                    <Route path="permisos" element={<PermissionManagement />} />
                  </Route>
                </Route>
              </Route>
              <Route path="/unauthorized" element={<Unauthorized />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </AuthProvider>
    </Router>
  );
}

export default App;
