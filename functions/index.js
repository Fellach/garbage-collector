console.log(Date.now())
const http = require('https');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

exports.handler = async (event) => {
  const date = event.queryStringParameters.date;

  if (!date) {
    return sendResponse(400, { error: 'Missing the `date` param' })
  }

  try {
    const page = await load();
    const dom = new JSDOM(page);
    const table = findTable(dom);
    const index = findIndex(table, date);
    const garbage = findGarbage(table, index);

    return sendResponse(200, { garbage })

  } catch (error) {
    return sendResponse(422, { error })
  }
};

function sendResponse(statusCode, body) {
  return {
    statusCode,
    body: JSON.stringify(body),
    headers:{ 'Access-Control-Allow-Origin' : '*' }
  };
}

function findGarbage(table, index) {
  if (index < 0) {
    return 'Nic'
  }

  return table.querySelectorAll('thead th')[index].textContent;
}

function findIndex(table, date) {
  const el = table.querySelector(`[title*="${date}"]`);

  if (el) {
    return el.parentElement.cellIndex;
  } else {
    return -1;
  }
}

function findTable(dom) {
  return dom.window.document.querySelector('#jednorodzinna');
}

function load() {
  return new Promise((resolve, reject) => {
    const data = new URLSearchParams({
      city: 'Gorzów Wielkopolski',
      street: 'Pomorska',
    }).toString();

    const options = {
      hostname: 'zcg.net.pl',
      path: '/harmonogram',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': data.length
      }
    }
    const req = http.request(options, res => {
      let page = '';
      res.on('data', d => page += d);
      res.on('end', () => resolve(page))
    });

    req.on('error', error => reject(error));
    req.write(data);
    req.end();
  });
}
