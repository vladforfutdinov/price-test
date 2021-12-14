import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import List from './components/list/List';
import Prices from './components/prices/Prices';
import { getNames } from './utils/api';

function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const current = pathname.split('/')[1];

  const [names, setNames] = useState([] as string[]);

  const fetchNames = useCallback(async (): Promise<void> => {
    const names = (await getNames()) || [];

    setNames(names);
  }, []);

  useEffect(() => {
    !names.length && fetchNames();
  }, [names, fetchNames]);

  useEffect(() => {
    !current && navigate(names[0] || '');
  }, [names, current, navigate]);

  return (
    <div className="App">
      <List names={names} />
      <Prices />
    </div>
  );
}

export default App;
