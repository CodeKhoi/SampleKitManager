function populateTable() {
	$.get('/inventory', function(data) {
	  for (var i = 0; i < data.length; i++) {
	    $('#kitName').append(data[i].samplekit + '<br/>' + '<hr>');
	    $('#kitQTY').append(data[i].quantity + '<br/>' + '<hr>');

	    if(data[i].quantity < 25) {
	    	alert('LOW INVENTORY, time to reorder.');
	    }
	  }
	});
}
populateTable();


