const lambda = require('./index').handler

describe("aws lambda test", () => {
  test("it should return an error: missing date", async () => {
    const event = {
      queryStringParameters: {}
    }
    const result = await lambda(event)
    expect(result).toEqual(expect.objectContaining({ statusCode: 400 }))
  });

  test("it should return an json", async () => {
    const event = {
      queryStringParameters: {
        date: '2021-01-20'
      }
    }
    const result = await lambda(event)
    expect(result).toEqual(expect.objectContaining({ statusCode: 200, body: JSON.stringify({garbage: 'Nic'}) }))
  });
});