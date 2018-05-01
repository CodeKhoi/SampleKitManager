function deleteOptionItem() {
	$.get('/inventory', function(data) {
	  for (var i = 0; i < data.length; i++) {
	    var optionSection = $('<option></option>');
	    optionSection.append(data[i].samplekit);
	    $('#deleteSelection').append(optionSection);
	  }
	});
}

deleteOptionItem();

function changeOption() {
	var optionSelected = $('#deleteSelection');
	optionSelected.on('change', handleOptionSelected);
}

changeOption();

function handleOptionSelected(data) {
    var newItemSelected = $(this).val();
    $.get('/inventory/' + newItemSelected, function(data) {
    	console.log(data)    	
		$('#deleteInv').val(data._id);
    });	

}