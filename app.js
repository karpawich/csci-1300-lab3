// Make a GET request to the fruityvice api to retrieve some fruit data
const apiRequest = async () => {
  const BASE_URL = 'https://www.fruityvice.com/api/'

  // This endpoint (https://www.fruityvice.com/doc/index.html#api-GET-getAll) returns a list of all the fruits and their info, feel free to play around with different endpoints!
  const resourcePath = 'fruit/all'

  // Making a fetch request to an API endpoint
  // Note: a fetch request is an asynchronous operation, and `await` tells the program to wait until the request has been completed before continuing
  const endpoint = BASE_URL + resourcePath;
  const response = await fetch(buildProxyEndpoint(endpoint), {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
    }
  });

  // console.log(response);

  // Return the response in JSON format
  return response.json();
}

function createFruitElement(name) {
  const newHeader = document.createElement("h1")
  newHeader.innerHTML = name
  return newHeader
}

const updatePage = async () => {
  const gallery = document.getElementById('cs1300-gallery');

  // Make API request and get an array of fruit objects
  let fruitsArray = await apiRequest();
  fruitsArray = fruitsArray
    .filter(f => f.nutritions.sugar > 15)
    .map(f => f.name)

  for (let i = 0; i < fruitsArray.length; i += 1) {
    const fruitName = fruitsArray[i]
    const newFruitElement = createFruitElement(fruitName)
    gallery.appendChild(newFruitElement)
  }
}

/**
 * To access information in this API, we need to send our requests through a proxy due to CORS restrictions.
 * This will be used as our proxy to avoid CORS issues.
 */
// do not touch - stencil code to add the proxy to avoid CORS
const PROXY_URL = 'https://cs1300-cors-anywhere.herokuapp.com/'
const buildProxyEndpoint = (endpoint) => `${PROXY_URL}${endpoint}`;
