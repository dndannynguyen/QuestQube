// Import the necessary dependencies
const fetch = require('node-fetch');
const { JSDOM } = require('jsdom');

// Mock the fetch function
jest.mock('node-fetch', () =>
  jest.fn().mockImplementation(() =>
    Promise.resolve({
      text: () =>
        Promise.resolve(
          '<html><body><img class="card-img" src="image_url"></body></html>'
        ),
    })
  )
);

describe('scrapeImages', () => {
  test('should scrape and set the image source correctly', async () => {
    // Import the function
    const { scrapeImages } = require('./your-module'); // Replace with the correct path to your module

    // Create a mock document object
    const dom = new JSDOM();
    global.document = dom.window.document;

    // Set up initial image element
    const imageElement = dom.window.document.createElement('img');
    imageElement.setAttribute('id', 'gamePos');

    // Call the function
    await scrapeImages('gameName', 'gamePos');

    // Assert the image source and alt attribute
    expect(imageElement.src).toBe('image_url');
    expect(imageElement.alt).toBe('gameName');
  });
});
