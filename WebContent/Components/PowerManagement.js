$(document).ready(function() {
	$("#alertSuccess").hide();
	$("#alertError").hide();
});

// SAVE ============================================
$(document).on("click", "#btnSave", function(event) {
	// Clear alerts---------------------
	$("#alertSuccess").text("");
	$("#alertSuccess").hide();
	$("#alertError").text("");
	$("#alertError").hide();

	// Form validation-------------------
	var status = validateProjectForm();
	if (status != true) {
		$("#alertError").text(status);
		$("#alertError").show();
		return;
	}

	// If valid------------------------
	var type = ($("#hidProjectIDSave").val() == "") ? "POST" : "PUT";

	$.ajax({
		url : "PowerManagementAPI",
		type : type,
		data : $("#formPowerManagement").serialize(),
		dataType : "text",
		complete : function(response, status) {
			onProjectSaveComplete(response.responseText, status);
		}
	});
});

function onProjectSaveComplete(response, status) {
	if (status == "success") {
		var resultSet = JSON.parse(response);

		if (resultSet.status.trim() == "success") {
			$("#alertSuccess").text("Successfully saved.");
			$("#alertSuccess").show();

			$("#divProjectGrid").html(resultSet.data);
		} else if (resultSet.status.trim() == "error") {
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}

	} else if (status == "error") {
		$("#alertError").text("Error while saving.");
		$("#alertError").show();
	} else {
		$("#alertError").text("Unknown error while saving..");
		$("#alertError").show();
	}

	$("#hidProjectIDSave").val("");
	$("#formPowerManagement")[0].reset();
}

// UPDATE==========================================
$(document).on(
		"click",
		".btnUpdate",
		function(event) {
			$("#hidProjectIDSave").val(
					$(this).closest("tr").find('#hidProjectIDUpdate').val());
			
			$("#pname").val($(this).closest("tr").find('td:eq(0)').text());
			$("#pdistrict").val($(this).closest("tr").find('td:eq(1)').text());
			$("#pzipCode").val($(this).closest("tr").find('td:eq(2)').text());
			$("#punits").val($(this).closest("tr").find('td:eq(3)').text());
			$("#ptotal").val($(this).closest("tr").find('td:eq(4)').text());
			
		});

// REMOVE===========================================
$(document).on("click", ".btnRemove", function(event) {
	$.ajax({
		url : "PowerManagementAPI",
		type : "DELETE",
		data : "id=" + $(this).data("powid"),
		dataType : "text",
		complete : function(response, status) {
			onProjectDeleteComplete(response.responseText, status);
		}
	});
});

function onProjectDeleteComplete(response, status) {
	if (status == "success") {
		var resultSet = JSON.parse(response);

		if (resultSet.status.trim() == "success") {

			$("#alertSuccess").text("Successfully deleted.");
			$("#alertSuccess").show();

			$("#divProjectGrid").html(resultSet.data);

		} else if (resultSet.status.trim() == "error") {
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}

	} else if (status == "error") {
		$("#alertError").text("Error while deleting.");
		$("#alertError").show();
	} else {
		$("#alertError").text("Unknown error while deleting..");
		$("#alertError").show();
	}
}

// CLIENT-MODEL=========================================================================
function validateProjectForm() {
	
	if ($("#pname").val().trim() == "") {
		return "Insert name:";
	}

	
	if ($("#pdistrict").val().trim() == "") {
		return "Insert District Name:";
	}
	
	if ($("#pzipCode").val().trim() == "") {
		return "Insert Zip Code:";
	}
	
	
	
	
	var tmpunits = $("#punits").val().trim();
	 if (!$.isNumeric(tmpunits)) 
	 {
		 return "Insert Units.";
	 }

	
	 var tmptotal = $("#ptotal").val().trim();
	 if (!$.isNumeric(tmptotal)) 
	 {
		 return "Insert Total.";
	 }
	 
	 


	return true;
}