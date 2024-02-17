import { useState, useEffect } from 'react';
import Router from './components/Router/Router';
import SplashScreen from './components/UI/SplashScreen';

function App() {
  const [showRouter, setShowRouter] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowRouter(true);
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      <SplashScreen />
      {showRouter && <Router />}
    </>
  );
}

export default App;
