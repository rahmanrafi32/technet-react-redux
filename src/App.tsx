import { Toaster } from './components/ui/Toaster';
import MainLayout from './layouts/MainLayout';
import { useAppDispatch } from '@/hooks/reduxTypedHooks.ts';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase.ts';
import { setLoading, setUser } from '@/redux/features/user/userSlice.ts';
import { useEffect } from 'react';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    onAuthStateChanged(auth, (user) => {
      if (user && user.email) {
        dispatch(setUser(user.email));
        dispatch(setLoading(false));
      } else dispatch(setLoading(false));
    });
  }, [dispatch]);

  return (
    <div>
      <Toaster />
      <MainLayout />
    </div>
  );
}

export default App;
