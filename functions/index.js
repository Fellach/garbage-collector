// eslint-disable-next-line no-restricted-globals
addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  if (request.method === 'OPTIONS') {
    return createOptionsResponse();
  } else if (request.method === 'GET') {
    return createResponse(await loadPage(request.url));
  }
}

function loadPage(url) {
  const { searchParams } = new URL(url)
  const street = searchParams.get('street');
  const city = 'Gorzów Wielkopolski';

  return load(city, street);
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

function createResponse(fetchResponse) {
  const response = new Response(fetchResponse.body, fetchResponse)
  response.headers.set("Access-Control-Allow-Origin", "*")
  response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");

  return response;
}

function createOptionsResponse() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS'
    }
  });
}