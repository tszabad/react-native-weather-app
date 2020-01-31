export default getweather = async (currentCity) => {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        currentCity +
        "&appid=2bf63b97329b9fab7d24bf66e160db11"
    )
       .then(response => {
            return response.json();
          })
      .then(json => {
              const temperature = json.weather.temp;
              return temperature;
            
      })
      .catch(error => {
        console.error(error);
      });
      
  }
  