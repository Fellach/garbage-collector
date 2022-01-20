// eslint-disable-next-line no-restricted-globals
addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const { searchParams } = new URL(request.url)
  const street = searchParams.get('street');
  const city = 'Gorzów Wielkopolski';

  return await load(city, street);
}

function load(city, street) {
  const body = new URLSearchParams({
    city,
    street,
  });
  const headers = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded'
  })

  const url = 'https://zcg.net.pl/harmonogram/';
  const options = {
    method: 'POST',
    body,
    headers,
  }

  return fetch(url, options);
}
