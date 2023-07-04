//---------------------------------------------------------------------------------------------------------------------
// ajax.js - user manager
//---------------------------------------------------------------------------------------------------------------------

var ajax_commands = {

	get_all_users(vue)
	{
		log_console("1 - get_all_users :: POST: UserManager_ListUsers");

		var obj = this;

		// AJAX REQUEST
		// Retourne la liste des utilisateurs
		//
		// Receive
		// data : JSON str

		$.ajax({
			type: 'POST',
			url: ajax_url_basis + "UserManager_ListUsers",
			data:
			{
			},
			beforeSend: function (xhr) { add_token(xhr) },
			contentType: 'application/json; charset=utf-8;',

			success: function (data)
			{
				console.log("1 - SUCCESS: get_all_users")

				obj.users = data.d;

				console.log("users")
				console.log(obj.users)
			},

			error: function (data)
			{
				console.log("1 - ERROR: get_all_users")

				obj.users = [
					{ 	id:1, cip:"blaf1904", role:1   },
					{ 	id:2, cip:"abcd1234", role:1000   },
					{ 	id:3, cip:"efgh5678", role:100000 },
				]
			}
		});
	},	


	//---------------------------------------------------------------------------------------------------------------------

	ajax_modify_user_role(vue)
	{
		log_console("2 - get_all_users :: POST: UserManager_ModifyRole :: role_id = " + this.selected_user.role_id);

		var obj = this;

		// AJAX REQUEST
		// Retourne la liste des utilisateurs
		//
		// Receive
		// data : JSON str

		$.ajax({
			type: 'POST',
			url: ajax_url_basis + "UserManager_ModifyRole",
			data: JSON.stringify(
			{
			    user_id: obj.selected_user.user_id,
				role_id: obj.selected_user.role_id
			}),
			beforeSend: function (xhr) { add_token(xhr) },
			contentType: 'application/json; charset=utf-8;',

			success: function (data)
			{
				console.log("2 - SUCCESS: modify_user_role")

				//obj.get_all_users()

				location.reload()
			},
			error: function (data)
			{
				console.log("2 - ERROR: modify_user_role")
			}
		});
	},	

}

//---------------------------------------------------------------------------------------------------------------------
