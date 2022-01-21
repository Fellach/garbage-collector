import { useEffect, useState } from 'react';
import './App.css';
import { scrap } from './scrapper';

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const tomorrowStr = tomorrow.toISOString().slice(0, 10);

function App() {
  const [date, setDate] = useState(tomorrowStr);
  const [garbage, setGarbage] = useState('ładuję...');

  useEffect(() => {
    setGarbage('sprawdzam...');

    (async () => {
      try {
        const garbage = await scrap('Pomorska', date)
        setGarbage(garbage);
      } catch(err) {
        console.log(err);
        setGarbage('błąd');
      }
    })();

  }, [date]);

  return (
    <main>
      <header>
        <h4>Co wywożą { tomorrowStr === date && 'jutro' }</h4>
        <input type="date" defaultValue={date} onChange={ev => setDate(ev.target.value)}/>
        <h3>{ garbage }</h3>
      </header>
    </main>
  );
}

export default App;
