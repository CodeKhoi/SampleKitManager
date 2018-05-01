function getOptionItem() {
	$.get('/inventory', function(data) {
	  for (var i = 0; i < data.length; i++) {
	    var optionSection = $('<option></option>');
	    optionSection.append(data[i].samplekit);
	    $('#itemSelection').append(optionSection);
	  }
	});
}

getOptionItem();

function changeItem() {
	var optionSelected = $('#itemSelection');
	optionSelected.on('change', handleItemSelected);
}

changeItem();

function handleItemSelected(data) {
	$('#updateContent').empty();	
    var newItemSelected = $(this).val();
    $.get("/inventory/" + newItemSelected, function(data) {
    	console.log(data)    	
		$('#updateContent').append('<h2> Sample Kit: ' + data.samplekit + '</h2>');
		$('#updateContent').append('<h2> Inventory remaining: ' + data.quantity + '</h2>');
		$('#updateInv').val(data._id);
		$('#updateKit').val(data.samplekit);
    });	

}

