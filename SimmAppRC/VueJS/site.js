//---------------------------------------------------------------------------------------------------------------------
// site.js
//---------------------------------------------------------------------------------------------------------------------

var ajax_url_basis = "Default.aspx/";
var isDebug = true;

//---------------------------------------------------------------------------------------------------------------------

function add_token(xhr)
{
	xhr.setRequestHeader("XSRF-TOKEN", $('input:hidden[name="__RequestVerificationToken"]').val())
}

//---------------------------------------------------------------------------------------------------------------------

function log_console(message)
{
	console.log("------------------------------------------------")
	console.log(message)
	console.log("------------------------------------------------")
}

//---------------------------------------------------------------------------------------------------------------------

function set_html_page(url, case_id, student_data_id, attribution_id)
{
	log_console("set_html_page :: POST: SetHtmlPage");

	$.ajax({
		type: 'POST',
		url: ajax_url_basis + "SetHtmlPage",
		data: JSON.stringify(
			{
				url: url,
				case_id: case_id,
				student_data_id: student_data_id
			}),
		beforeSend: function (xhr) { add_token(xhr) },
		contentType: 'application/json; charset=utf-8;',

		success: function ()
		{
			console.log("SUCCESS: set_html_page :: " + url)

			location.reload()
		},

		error: function ()
		{
			console.log("ERROR: set_html_page")
		}
	});
}

//---------------------------------------------------------------------------------------------------------------------

function reset_admin_role(user_id)
{
	log_console("reset_admin_role :: POST: UserManager_ModifyRole");

	$.ajax({
		type: 'POST',
		url: ajax_url_basis + "UserManager_ModifyRole",
		data: JSON.stringify(
			{
				user_id: user_id,
				role_id: 100000
			}),
		beforeSend: function (xhr) { add_token(xhr) },
		contentType: 'application/json; charset=utf-8;',

		success: function (data)
		{
			location.reload()
		}
	});


	
}

//---------------------------------------------------------------------------------------------------------------------

