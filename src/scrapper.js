const url = 'https://garbage-collector.feleniak.workers.dev/';
const expireAt = 604800000;
const cacheCreatedAtKey = 'gc.created.at';
const cacheDatatKey = 'gc.data';

export async function scrap(street, date) {
    const dateFormatted = date.split('-').reverse().join('.');

    const table = await loadTable(street);
    const index = findIndex(table, dateFormatted);
    const garbage = findGarbage(table, index);

    return garbage;
}

function findGarbage(table, index) {
  if (index < 0) {
    return 'Nic';
  }

  const garbage = table.querySelectorAll('thead th')[index].textContent || '';

  return garbage.replace('/ Pozostałeodpady komunalne', '');
}

function findIndex(table, date) {
  const el = table.querySelector(`[title*="${date}"]`);

  if (el) {
    return el.parentElement.cellIndex;
  } else {
    return -1;
  }
}

async function loadTable(city, street) {
  let page = readCache();

  if (!page) {
    page = await load(city, street);
    writeCache(page);
  }

  return findTable(page);
}

function readCache() {
  const isInvalid = localStorage.getItem(cacheCreatedAtKey) * 1 + expireAt < Date.now();
  return isInvalid ? '' : localStorage.getItem(cacheDatatKey);
}

function writeCache(data) {
  localStorage.setItem(cacheCreatedAtKey, Date.now().toString());
  localStorage.setItem(cacheDatatKey, data);
}

async function load(street) {
  const params = new URLSearchParams();
  params.append('street', street);

  const response = await fetch(url + '?' + params);
  return await response.text();
}

function findTable(page) {
  const parser = new DOMParser();
  const dom = parser.parseFromString(page, 'text/html');
  return dom.querySelector('#jednorodzinna');
}
