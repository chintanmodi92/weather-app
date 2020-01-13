class Forecast{
    constructor(){
        this.key = 'Zby0pwrtE0akNsFDxFRFHAPlxDMrBRTl';
        this.weatherURI = 'https://dataservice.accuweather.com/currentconditions/v1/';
        this.cityURI = 'https://dataservice.accuweather.com/locations/v1/cities/search';
    }
    async updateCity(city){
        const cityDets = await this.getCity(city);
        const weather = await this.getWeather(cityDets.Key).catch(e=> e.message);

        return {cityDets,weather};
    }
    async getCity(city){
        const query = `?apikey=${this.key}&q=${city}`;
        const response = await fetch(this.cityURI + query).catch(e=> e.message);
        //console.log(response)
        const data = await response.json().catch(e=> e.message);
        if(!data) {
            return 'Enter correct city name'
        } else {
            return data[0];
        }
        console.log(data)
        
    }
    async getWeather(id){
        const query = `${id}?apikey=${this.key}`;
        const response = await fetch(this.weatherURI + query).catch(e=> e.message);
        const data = await response.json();

        return data[0];
    }
}