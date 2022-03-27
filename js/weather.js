document.addEventListener('DOMContentLoaded',function(){

		// API
		const KEY = '0f8ef01f456eaf35384c35ae1d843f67';
		const APIKEY = 'a85201568a273c4d5d605d5476e26c5f'; //dante.cifuentes@gmail.com
		const COUNTRY = 'Guatemala';
		var METRIC = get_metric() || 'metric';
		var SIMBOL = get_simbol() || '°C';

		/**
			Set current date
		*/
		(document.getElementById('date')).innerHTML = formatDate(new Date());

		/**
			Set wheter Celsius or Fahrenheit
		*/
		(document.getElementById('metric')).value = METRIC;
		(document.getElementById('metric')).addEventListener('change',function(){
			set_metric(this.value);
			location.reload();
		});

		function set_metric(value = 'metric'){
			localStorage.setItem('metric',value);
		}

		function get_metric(){
			return localStorage.getItem('metric');
		}

		function get_simbol(){
			var m = localStorage.getItem('metric');
			if(m == 'metric') return '°C';
			if(m == 'imperial') return '°F';
			return '°C';
		}

		function getLocation() {
		  if (navigator.geolocation) {
		    navigator.geolocation.getCurrentPosition(get_forecast);
		  } else {}
		}

		
		/**
			Set Forecast
		*/
		async function get_forecast(position){

			const response = await fetch(
				//`https://api.openweathermap.org/data/2.5/forecast?q=${COUNTRY}&appid=${KEY}&lat=${position.coords.latitude}&lon=${position.coords.longitude}&cnt=5&units=${METRIC}`
				`https://api.openweathermap.org/data/2.5/forecast?&appid=${APIKEY}&lat=${position.coords.latitude}&lon=${position.coords.longitude}&cnt=5&units=${METRIC}`
			);

			const data = await response.json();

			if(data){
				var html = '';
				var days = 1;

				for(var d in data.list){
					
					html += '<div class="forecast">';
						html += get_html(data.list[d].weather[0].description);

						html += `
							<div id="content_seconday">
								<h3 class="light font_size">${formatDate(addDays(new Date(),days))}</h3>
								<h3 class="light font_size">${data.list[d].weather[0].description}</h3>
								<div style="margin:10px 0px;">
									<hr>
								</div>

								<div class="content_flex flex_align_around">
									<h3 class="bold font_size" id="t_min">${parseInt(data.list[d].main.temp_min)}${SIMBOL}</h3>
									<h3 class="bold font_size">/</h3>
									<h3 class="bold font_size" id="t_max">${parseInt(data.list[d].main.temp_max)}${SIMBOL}</h3>
								</div>
							</div>
						`;

					html += `</div>`;

					days++;
				}

				(document.getElementById('content_forecast')).innerHTML = html;
			}
		}

		function addDays(date, days) {
		  const copy = new Date(Number(date))
		  copy.setDate(date.getDate() + days)
		  return copy
		}

		function get_html(x){
			switch(x){
				case 'clear sky':
					return `
						<div class="content_sunny">
							<div class="icon sunny">				
								  <div class="sun">
								    <div class="rays"></div>
								  </div>
							</div>
						</div>
					`;
				break;

				case 'few clouds':
					return `
						<div class="content_sunny">
							<div class="icon sunny">				
								  <div class="sun">
								    <div class="rays"></div>
								  </div>
							</div>
						</div>
					`;
				break;

				case 'scattered clouds':
					return `
						<div class="content_cloudy">
							<div class="icon cloudy">
							  <div class="cloud"></div>
							  <div class="cloud"></div>
							</div>
						</div>
					`;
				break;

				case 'broken clouds':
				case 'overcast clouds':
					return `
						<div class="content_cloudy">
							<div class="icon cloudy">
							  <div class="cloud"></div>
							  <div class="cloud"></div>
							</div>
						</div>
					`;
				break;

				case 'light rain':
				case 'shower rain':
					return `
						<div class="content_rainy">
							<div class="icon rainy">
							  <div class="cloud"></div>
							  <div class="rain"></div>
							</div>
						</div>
					`;	
				break;

				case 'rain':
					return `
						<div class="content_rainy">
							<div class="icon rainy">
							  <div class="cloud"></div>
							  <div class="rain"></div>
							</div>
						</div>
					`;
				break;

				case 'thunderstorm':
					return `
						<div class="content_thunder">
							<div class="icon thunder-storm">
							  <div class="cloud"></div>
							  <div class="lightning">
							    <div class="bolt"></div>
							    <div class="bolt"></div>
							  </div>
							</div>
						</div>
					`;
				break;

				case 'light snow':
				case 'snow':
					return `
						<div class="content_flurries">
							<div class="icon flurries">
							  <div class="cloud"></div>
							  <div class="snow">
							    <div class="flake"></div>
							    <div class="flake"></div>
							  </div>
							</div>
						</div>
					`;
				break;

				case 'mist':
					return `
						<div class="content_cloudy">
							<div class="icon cloudy">
							  <div class="cloud"></div>
							  <div class="cloud"></div>
							</div>
						</div>
					`;
				break;
				
				default:
					return `
						<div class="content_cloudy">
							<div class="icon cloudy">
							  <div class="cloud"></div>
							  <div class="cloud"></div>
							</div>
						</div>
					`;
				break;
			}
		}

		function formatDate(date){

		    var monthNames = [
		        "Jan",
				"Feb",
				"Mar",
				"Apr",
				"May",				
				"Jun",
				"Jul",
				"Aug",
				"Sep",
				"Oct",
				"Nov",
				"Dec"
		    ];

		    var day = date.getDate();
		    var monthIndex = date.getMonth();
		    var year = date.getFullYear();

		    var ddate = day + ' ' + monthNames[monthIndex] + ' ' + year;
		    return (isNaN(day) || ddate == 'Invalid Date' ? date : ddate);
		}

		/**
			Set Wheater icon
		*/
		function setCondition(c){

				var condition = c;

				switch(c){
					case 'clear sky':
						(document.getElementById('content_sunny')).style.display = 'block';
					break;

					case 'few clouds':
						(document.getElementById('content_sunny')).style.display = 'block';
					break;

					case 'scattered clouds':
						(document.getElementById('content_cloudy')).style.display = 'block';
					break;

					case 'broken clouds':
					case 'overcast clouds':
						(document.getElementById('content_cloudy')).style.display = 'block';
					break;

					case 'light rain':
					case 'shower rain':
						(document.getElementById('content_rainy')).style.display = 'block';
					break;

					case 'rain':
						condition = c;
						(document.getElementById('content_rainy')).style.display = 'block';
					break;

					case 'thunderstorm':
						(document.getElementById('content_thunder')).style.display = 'block';
					break;

					case 'snow':
						(document.getElementById('content_flurries')).style.display = 'block';
					break;

					case 'mist':
						(document.getElementById('content_cloudy')).style.display = 'block';
					break;
					
					default:
						(document.getElementById('content_cloudy')).style.display = 'block';
					break;
				}

				(document.getElementById('condition')).innerHTML = condition;
			}

			function setDay(value){
				var day = "";

				switch(value){
					case 1:
						day = 'Monday';
					break;

					case 2:
						day = "Thuesday";
					break;

					case 3:
						day = "Wenessday";
					break;

					case 4:
						day = 'Thursday';
					break;

					case 5:
						day = 'Friday';
					break;

					case 6:
						day = 'Saturday';
					break;

					case 7:
					case 0:
						day = 'Sunday';
					break;
				}

				(document.getElementById('day')).innerHTML = day;
			}
			
			/**
				Get Current weather
			*/
			async function getWeather(){

				const response = await fetch(
					`https://api.openweathermap.org/data/2.5/weather?q=${COUNTRY}&appid=${APIKEY}&units=${METRIC}`
					);

				const data = await response.json();
				
				return data;
			}

			function set_storage_data(c){
				localStorage.setItem('params',JSON.stringify(c));
				return true;
			}

			function get_storage_data(){
				return JSON.parse(localStorage.getItem('params'),true);
			}

			function getTime(){
				// return (new Date()).getTime();
				var time = new Date();
				return {
					time:time.getTime(),
					day:time.getDay()
				}
			}

			async function update_weather(){
				var data = {};
				var t = await getTime();

				data.time = t.time;
				data.day = t.day;
				data.weather = await getWeather();

				await set_storage_data(data);
				return data;
			}

			async function core(){
				var data = get_storage_data();
				await update_weather();
				render();
			}

			

			function setTemps(data){
				(document.getElementById('t_min')).innerHTML = parseInt(data.temp_min)+SIMBOL;
				(document.getElementById('t_max')).innerHTML = parseInt(data.temp_max)+SIMBOL;
			}

			function render(){
				var data = get_storage_data();			
				setCondition(data.weather.weather[0].description);
				
				(document.getElementById('pression')).innerHTML = data.weather.main.pressure;
				(document.getElementById('humidity')).innerHTML = data.weather.main.humidity;
				//(document.getElementById('temp')).innerHTML = data.weather.main.temp;
				(document.getElementById('wind')).innerHTML = data.weather.wind.deg;
				(document.getElementById('pp')).innerHTML = data.weather.main.feels_like;
				
				setDay(data.day);
				setTemps(data.weather.main);
			}

			core();
			getLocation();

});