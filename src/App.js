import { useEffect, useState } from 'react';
import './App.css';
import Autocomplete from './Autocomplete';
import { scrap } from './scrapper';
import { gorzow } from './streets';
import { useStateCached } from './useStateCached';

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const tomorrowStr = tomorrow.toISOString().slice(0, 10);

function App() {
  const [street, setStreet] = useStateCached('gc.street', '');
  const [date, setDate] = useState(tomorrowStr);
  const [garbage, setGarbage] = useState('ładuję...');

  useEffect(() => whatIsCollected(setGarbage, street, date), [street, date]);

  return (
    <main>
      <Autocomplete items={gorzow} label="Ulica" onChange={setStreet} value={street} />

      <h4>Co wywożą { tomorrowStr === date && 'jutro' }</h4>
      <input type="date" defaultValue={date} onChange={ev => setDate(ev.target.value)}/>
      <h3>{ garbage }</h3>

    </main>
  );
}

async function whatIsCollected(print, street, date) {
  if (!date) {
    return void print('Brak daty');
  } 
  
  if (!street) {
    return void print('Brak ulicy');
  }
  
  print('sprawdzam...');

  try {
    const garbage = await scrap(street, date);
    print(garbage);
  } catch(err) {
    console.log(err);
    print('błąd');
  }
}

export default App;
