document.getElementById("Location").addEventListener("input", search);
const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

(async function () {
  let response = await fetch("https://ipinfo.io/json?token=0ff70b98801cd9");
  let data = await response.json();

  displayData(data.city);
})();
async function search(x = null) {
  var locationInput = document.getElementById("Location").value;
  displayData(locationInput);
}

function dayTime(x) {
  let day = weekday[x.getDay()];

  return day;
}

function monthName(x) {
  let monthNumber = month[x.getMonth()];
  return monthNumber;
}

async function displayData(x) {
  let locationInput = x;
  let localDay1;
  let locaMonth1;
  let localDay2;
  let localDay3;
  let windDirection;
  let response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=509d3a3f046f46019d6125645230708&q=${locationInput}&days=3`
  );
  var data = await response.json();

  const { day1 } = data.forecast.forecastday[0];
  const { day2 } = data.forecast.forecastday[1];
  const { day3 } = data.forecast.forecastday[2];

  localDay1 = dayTime(new Date(data.forecast.forecastday[0].date));

  locaMonth1 = monthName(new Date(data.forecast.forecastday[0].date));
  localDay2 = dayTime(new Date(data.forecast.forecastday[1].date));
  localDay3 = dayTime(new Date(data.forecast.forecastday[2].date));

  //   windDirection = getWindDirection(data.current.wind_dir);
  document.getElementById("cards-row").innerHTML = `
        <div class="col-md-4">
            <div class="card">
              <div class="card-header card1-header">
                <p class="d-inline">${localDay1}</p>
                <p class="d-inline f-p">${locaMonth1}</p>
              </div>
              <div class="card-body card1-body">
                <div class="div">
                  <p>${data.location.name}</p>
                  <div class="row">
                    <div class="col-md-8">
                      <h2 class="display-1 fw-bold">${data.current.temp_c}&deg;C</h2>
                    </div>
                    <div class="col-md-4"><img src="${data.current.condition.icon}" class "w-100"></div>
                  </div>
                  <p class="highlighted-p">${data.current.condition.text}</p>
                  <ul class="d-flex">
                    <li class="me-4">
                      <i class="fa-solid fa-umbrella me-2"></i>20%
                    </li>
                    <li class="me-4">
                      <i class="fa-solid fa-wind me-2"></i>${data.current.wind_kph}km/h
                    </li>
                    <li class="me-4">
                      <i class="fa-regular fa-compass me-2"></i>East
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4 text-center">
            <div class="card">
              <div class="card-header card2-header">${localDay2}</div>
              <div class="card-body card2">
                <div class="caption2 py-2">
                  <img src="${data.forecast.forecastday[1].day.condition.icon}" class"w-100">
                  <p class="fs-3 fw-bold">${data.forecast.forecastday[1].day.maxtemp_c}&deg;C</p>
                  <p class="mt-0">${data.forecast.forecastday[1].day.mintemp_c}&deg;</p>
                  <p class="highlighted-p">${data.forecast.forecastday[1].day.condition.text}</p>
                </div>
              </div>
            </div>
        </div>
        <div class="col-md-4 text-center">
        <div class="card">
          <div class="card-header card2-header">${localDay3}</div>
          <div class="card-body card2">
            <div class="caption2 py-2">
              <img src="${data.forecast.forecastday[2].day.condition.icon}" class"w-100">
              <p class="fs-3 fw-bold">${data.forecast.forecastday[2].day.maxtemp_c}&deg;C</p>
              <p class="mt-0">${data.forecast.forecastday[2].day.mintemp_c}&deg;</p>
              <p class="highlighted-p">${data.forecast.forecastday[2].day.condition.text}</p>
            </div>
          </div>
        </div>
    </div>
  
  `;
}
