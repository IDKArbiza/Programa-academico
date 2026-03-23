import { useAppStore } from '@/lib/store';
import Login from './Login';
import { Navigate } from 'react-router-dom';

const Index = () => {
  const currentRole = useAppStore((s) => s.currentRole);

  if (!currentRole) return <Login />;

  return <Navigate to={`/${currentRole}`} replace />;
};

export default Index;
