(function(){

	var settings = {
		channel: 'Channel-x1izfsa8x',
		publish_key: 'pub-c-7581ef06-2ca4-4472-834c-74b43e7d85df',
		subscribe_key: 'sub-c-eba3f01a-27a0-11e7-bc52-02ee2ddab7fe'
	};

	var pubnub = PUBNUB(settings);

	var airesalon1 = document.getElementById('airesalon1');
	var airesalon2 = document.getElementById('airesalon2');
	var airesalon3 = document.getElementById('airesalon3');
	var fireplace = document.getElementById('fireplace');

	pubnub.subscribe({
		channel: settings.channel,
		callback: function(m) {
			if(m.temperature) {
				document.querySelector('[data-temperature]').dataset.temperature = m.temperature;
			}
			if(m.humidity) {
				document.querySelector('[data-humidity]').dataset.humidity = m.humidity;
			}
		}
	})


	function publishUpdate(data) {
		pubnub.publish({
			channel: settings.channel, 
			message: data
		});
	}

	// UI EVENTS

	airesalon1.addEventListener('change', function(e){
		publishUpdate({item: 'airesalon1', open: this.checked});
	}, false);

	lightLiving.addEventListener('change', function(e){
		publishUpdate({item: 'airesalon2', brightness: this.value});
	}, false);

	lightPorch.addEventListener('change', function(e){
		publishUpdate({item: 'airesalon3', brightness: this.value});
	}, false);

	fireplace.addEventListener('change', function(e){
		publishUpdate({item: 'fireplace', brightness: +this.value});
	}, false);
})();
