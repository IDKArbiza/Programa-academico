import { useAppStore } from '@/lib/store';
import Login from './Login';
import { Navigate } from 'react-router-dom';

const Index = () => {
  const currentRole = useAppStore((s) => s.currentRole);

  if (currentRole) {
    const redirectPath = currentRole === 'director' ? '/administrador' : `/${currentRole}`;
    return <Navigate to={redirectPath} replace />;
  }

  return <Login />;
};

export default Index;
