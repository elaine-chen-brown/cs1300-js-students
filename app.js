var corsApiUrl = "https://cors-anywhere.herokuapp.com/";
// TODO: REPLACE YOUR TOKEN
var apiToken = "?token=qzac80d-uIHJCpNTCXvMZp5elzUD5tEpWAHj6ioEoDc";

// CORS stands for "cross origin resource sharing" -- you'll be making http requests in order
// DON'T CHANGE THIS: fetches the data from the API endpoint
const doCORSRequest = (options) => {
  var x = new XMLHttpRequest();
  x.open("GET", corsApiUrl + options.url);
  x.send(options.data);
  return x;
};

// Example promise that executes the GET request above and waits for it to finish before resolving
const corsPromise = () =>
  new Promise((resolve, reject) => {
    const request = doCORSRequest({
      url: "https://trefle.io/api/v1/plants" + apiToken,
    });
    resolve(request);
  });

// parse data and render HTML
const getData = (response) => {
  const plantData = JSON.parse(response).data;
  /*console.log(plantData);
  console.log(plantData[0]);
  console.log(plantData[0].common_name);*/
  var x;
  for (plant of plantData) {
    addToDom(plant);
  }
}

const filterByYear = (year) =>{
  year > 1753;
}

// 
const addToDom = (plant) => {
  const wrapperDiv = document.createElement("div");

  // create header element
  const plant_name = document.createElement("h3");
  plant_name.innerText = plant.common_name;

  // create image element
  const image_url = plant.image_url;
  const plant_img = document.createElement("img");
  plant_img.setAttribute("src", image_url);

  // add elements to div
  wrapperDiv.appendChild(plant_name);
  wrapperDiv.appendChild(plant_img);

  document.getElementById("plants").appendChild(wrapperDiv);
}

// 
const displayContent = () => {
corsPromise().then(
  (request) =>
    (request.onload = request.onerror = function () {
    getData(request.response);
    }));
}
