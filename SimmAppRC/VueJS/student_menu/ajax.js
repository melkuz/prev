//---------------------------------------------------------------------------------------------------------------------
// ajax.js - student menu
//---------------------------------------------------------------------------------------------------------------------

var ajax_commands = {

	get_all_cases(vue)
	{
		log_console("1 - get_all_cases :: POST: StudentMenu_ListCases");

		var obj = this;


		// AJAX REQUEST 1
		// Retourne les informations
		//
		// data : JSON str

		$.ajax({
			type: 'POST',
			url: ajax_url_basis + "StudentMenu_GetUserInfo",
			data: JSON.stringify(
				{
				}),
			beforeSend: function (xhr) { add_token(xhr) },
			contentType: 'application/json; charset=utf-8;',
			success: function (data) {
				console.log("/---------------- USER INFO ----------------/")
				UserInfo = data.d;
				if (UserInfo.length == 0) { // Redefine UserInfo
					UserInfo = {
						"statut_etude": "Médecin",
						"annee_debut_formation": "",
						"annee_debut_externat": "",
						"annee_fin_residence": "",
						"specialite": "",
						"aspects_a_pratiquer": "",
					}
					obj.user_info = UserInfo;
					obj.show_initial_menu = true;
				}
				else {
					UserInfo = JSON.parse(UserInfo);
					obj.user_info = UserInfo;
					obj.user_info_completed = true;
				}
			}
		});


		// AJAX REQUEST 2
		// Retourne la liste des cas (si administrateur, tous les cas, si éditeur, seulement les cas associés à l'utilisateur)
		// Doit retourner les colonnes id, properties et available de la table case
		//
		// Receive
		// data : JSON str
		//  
		// Afficher les cas non complétés en premier pour ensuite les afficher les cas complétés

		$.ajax({
			type: 'POST',
			url: ajax_url_basis + "StudentMenu_ListCases",
			data: JSON.stringify(
			{
			}),
			beforeSend: function (xhr) { add_token(xhr) },
			contentType: 'application/json; charset=utf-8;',

			success: function (data)
			{
				console.log("1 - SUCCESS: get_all_cases")

				var c = JSON.parse(data.d);
				var x = []

				for (var i = 0; i < c.length; i++)
				{
					if (c[i].case_properties.approved == true || c[i].case_version > 1)
					{
						// Create completed string 
						if (c[i].completed == 0) {
							c[i]["completed_str"] = "✕"
						}
						else {
							c[i]["completed_str"] = "✓"
						}

						// Create begin string
						if (c[i].started == 0) {
							c[i]["started_str"] = "✕"
						}
						else {
							c[i]["started_str"] = "✓"
						}

						// Insert empty string to clinical context if not existing 
						if (c[i].case_properties.hasOwnProperty('clinical_context') == false) {
							c[i].case_properties["clinical_context"] = ""
						}

						x.push(c[i])
					}
				}

				vue.cases = x

				console.log(vue.cases)
			},

			error: function (data)
			{
				console.log("1 - ERROR: get_all_cases")

				obj.cases = [
					{ case_id: 5, completed: 0, attribution_id: 123, "case_properties": { patient_name: "Claudio", discipline: "Nono" }	},
					{ case_id: 10, completed: 1, attribution_id: 456, "case_properties": { patient_name: "Pepitte", discipline: "Nono" } }
				]
			}
		});
	},	

	//---------------------------------------------------------------------------------------------------------------------


	// Regarde tous les essais de l'étudiant.
	// Si l'étudiant n'a pas fini son dernier essai, il donc impérativement le continuer.
	// Si l'étudiant a fini tous ses essais, il peut retourner voir ses réponses. Il peut aussi commencer un nouvel essai
	// 
	get_properties_and_completion(vue)
	{
		log_console("2 - get_properties_and_completion :: POST: StudentMenu_GetPropertiesCompletion");

		var obj = this

		$.ajax({
			type: 'POST',
			url: ajax_url_basis + "StudentMenu_GetPropertiesCompletion",
			data: JSON.stringify(
			{
					case_id: obj.selected_case.case_id
			}),
			beforeSend: function (xhr) { add_token(xhr) },
			contentType: 'application/json; charset=utf-8;',

			success: function (data)
			{
				console.log("2 - SUCCESS: get_properties_and_completion")

				obj.selected_case_properties = JSON.parse(data.d.case_properties);
				obj.selected_case_completions = JSON.parse(data.d.case_completions);

				console.log("selected_case_properties")
				console.log(obj.selected_case_properties)
				console.log("selected_case_completions")
				console.log(obj.selected_case_completions)
			},

			error: function (data)
			{
				console.log("2 - ERROR: get_properties_and_completion")

				obj.selected_case_properties = { "case_name": "Cas #3", "patient_name": "Dereon Chandler", "discipline_id": 0, "discipline": "Rhumatologie", "creator": "Kassandra Zhang", "approved": true, "briefing": "<p>[test]</p>\n", "image": "data:image/png;base64,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" }
				
				// Ordre descendant (le plus récent est le premier) 
				obj.selected_case_completions = [ 
															{trial_id:10,last_date:"2022-10-01",completed:1},
														 	{trial_id:9,last_date:"2022-09-22",completed:1} 
														]
				//obj.selected_case_completions = [];
			},

			complete: function ()
			{
				console.log("1 - COMPLETE: get_properties_and_completion");

				// CALLBACK
				obj.handleClick_callback();
			}
		});
	},

	//---------------------------------------------------------------------------------------------------------------------

	// 
	new_trial(vue) // student_menu
	{
		log_console("3 - new_trial :: POST: StudentMenu_NewTrial");

		var obj = this

		// Hide current page
		$("body").hide()

		$.ajax({
			type: 'POST',
			url: ajax_url_basis + "StudentMenu_NewTrial",
			data: JSON.stringify(
			{
				case_id: obj.selected_case.case_id
			}),
			beforeSend: function (xhr) { add_token(xhr) },
			contentType: 'application/json; charset=utf-8;',

			success: function (trial_id)
			{
				console.log("3 - SUCCESS: new_trial")

				// Change page to trial ID
				trial_id = 510;

				set_html_page("VueJs/student_case/index.html", obj.selected_case.case_id, obj.student_data_id, 123456789)
			},

			error: function ()
			{
				console.log("3 - ERROR: new_trial")

				// Change page to trial ID
				trial_id = 510;
			}
		});
	},

	//---------------------------------------------------------------------------------------------------------------------

	continue_trial(vue)
	{
		log_console("4 - continue_trial :: POST: StudentMenu_ContinueTrial");

		var obj = this;
		obj.selected_case.case_id = obj.selected_case_completions[obj.selected_case_completions.length - 1].trial_case_id

		console.log("selected_case.case_id = " + obj.selected_case.case_id)

		//  Hide current page
		$("body").hide()

		$.ajax({
			type: 'POST',
			url: ajax_url_basis + "StudentMenu_ContinueTrial",
			data: JSON.stringify(
			{
				case_id: obj.selected_case.case_id
			}),
			beforeSend: function (xhr) { add_token(xhr) },
			contentType: 'application/json; charset=utf-8;',

			success: function (trial_id)
			{
				console.log("3 - SUCCESS: continue_trial")

				set_html_page("VueJs/student_case/index.html", obj.selected_case.case_id, obj.student_data_id, 123456789)
			},

			error: function ()
			{
				console.log("3 - ERROR: continue_trial")

				// Change page to trial ID
				trial_id = 510;
			}
		});
	},

	//---------------------------------------------------------------------------------------------------------------------

	send_user_info(vue)
	{
		log_console("5 - send_user_info :: POST: StudentMenu_SetUserInfo");

		var obj = this;

		console.log("JSON_stringify");
		console.log(this)
		console.log(JSON.stringify(this.user_info));

		$.ajax({
			type: 'POST',
			url: ajax_url_basis + "StudentMenu_SetUserInfo",
			data: JSON.stringify(
				{
					user_info: JSON.stringify(this.user_info)
				}
			),
			beforeSend: function (xhr) { add_token(xhr) },
			contentType: 'application/json; charset=utf-8;',

			success: function (datar) {
				console.log("5 - SUCCESS: send_user_info")
				console.log(datar)
				obj.user_info_completed = true;
				obj.show_initial_menu = false;
				obj.page_initial_menu = 0;
			},
			error: function () {
				console.log("5 - ERROR: send_user_info")
			}
		});
	}

}

//---------------------------------------------------------------------------------------------------------------------
