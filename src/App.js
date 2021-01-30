import { useEffect, useState } from 'react';
import './App.css';

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

function App() {
  const [date, setDate] = useState(tomorrow.toISOString().slice(0, 10));
  const [garbage, setGarbage] = useState('ładuję...');

  useEffect(() => {
    const url = 'https://hcgxeeks66.execute-api.us-east-1.amazonaws.com/default/garbage-collector?';
    const params = new URLSearchParams();
    params.append('date', date.split('-').reverse().join('.'));
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
    <div className="App">
      <header className="App-header">
        <h4>Co wywożą</h4>
        <input type="date" defaultValue={date} onChange={ev => setDate(ev.target.value)}/>
        <h3>{ garbage }</h3>
      </header>
    </div>
  );
}

export default App;
