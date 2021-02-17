import { useEffect, useState } from 'react';
import './App.css';

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const tomorrowStr = tomorrow.toISOString().slice(0, 10)

function App() {
  const [date, setDate] = useState(tomorrowStr);
  const [garbage, setGarbage] = useState('ładuję...');

  useEffect(() => {
    const url = 'https://hcgxeeks66.execute-api.us-east-1.amazonaws.com/default/garbage-collector?';
    const params = new URLSearchParams();
    const dateFormatted = date.split('-').reverse().join('.');
    params.append('date', dateFormatted);
    setGarbage('sprawdzam...');

    (async () => {
      try {
        const response = await fetch(url + params);
        const json = await response.json();
        setGarbage(json.garbage);
      } catch(e) {
        setGarbage('błędy errory');
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
