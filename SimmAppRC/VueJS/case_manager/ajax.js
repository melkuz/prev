//---------------------------------------------------------------------------------------------------------------------
// ajax.js - case manager
//---------------------------------------------------------------------------------------------------------------------

var ajax_commands = {

	get_user()
	{
		log_console("get_user :: POST: CaseManager_GetUser");

		var obj = this;

		// AJAX REQUEST
		// Retourne la liste des utilisateurs
		//
		// Receive
		// data : JSON str

		$.ajax({
			type: 'POST',
			url: ajax_url_basis + "CaseManager_GetUser",
			data:
			{
			},
			beforeSend: function (xhr) { add_token(xhr) },
			contentType: 'application/json; charset=utf-8;',

			success: function (data)
			{
				obj.user = data.d;

				//alert(obj.user.role_id)

				console.log("user")
				console.log(obj.user)
				console.log(obj.user.role_id)

				//if (obj.user.role_id == 100000)
				//{
				//	$("#manager_button").css("display", "inline-bloc")
				//}
			},

			error: function (data)
			{
				obj.user = { user_id: 1, cip: "blaf1904", role_id: 1 }
			}
		});
	},

	//---------------------------------------------------------------------------------------------------------------------

	get_disciplines(vue)
	{
		log_console("get_disciplines :: POST: GetDisciplines");

		$.ajax({
			type: 'POST',
			url: ajax_url_basis + "GetDisciplines",
			data:
			{
			},
			beforeSend: function (xhr) { add_token(xhr) },
			contentType: 'application/json; charset=utf-8;',

			success: function (data)
			{
				console.log("SUCCESS: get_disciplines")

				vue.disciplines = data.d;
			},

			error: function (data)
			{
				console.log("ERROR: get_disciplines " + data)
			}
		});
	},

	//---------------------------------------------------------------------------------------------------------------------

	get_all_cases(vue)
	{
		log_console("get_all_cases :: POST: ListCases");

		var obj = this;

		// AJAX REQUEST
		// Retourne la liste des cas (si administrateur, tous les cas, si éditeur, seulement les cas associés à l'utilisateur)
		// Doit retourner les colonnes id, properties et available de la table case
		//
		// Receive
		// data : JSON str 

		$.ajax({
			type: 'POST',
			url: ajax_url_basis + "ListCases",
			data:
			{
			},
			beforeSend: function (xhr) { add_token(xhr) },
			contentType: 'application/json; charset=utf-8;',

			success: function (data)
			{
				console.log("SUCCESS: get_all_cases")

				vue.cases = JSON.parse(data.d);

				// For each case
				for (case_row = 0; case_row < vue.cases.length; case_row++) {

					// Replace approve status show
					if (vue.cases[case_row].case_properties.approved) {
						vue.cases[case_row].case_properties["approved_text"] = "Publié"
					}
					else {
						vue.cases[case_row].case_properties["approved_text"] = "Brouillon"
					}

					// Insert empty string to clinical context if not existing 
					if (vue.cases[case_row].case_properties.hasOwnProperty('clinical_context') == false) {
						vue.cases[case_row].case_properties["clinical_context"] = ""
					}
				}

				console.log("cases:")
				console.log(vue.cases)
			},

			error: function (data)
			{
				console.log("ERROR: get_all_cases " + data)
			}
		});
	},

	//---------------------------------------------------------------------------------------------------------------------

	change_case_approve_status(case_id, case_properties, case_approved)
	{
		log_console("change_case_approve_status :: POST: ApproveCase");

		// Called from toggle_approve in script.js

		// AJAX REQUEST
		// Envoie au serveur le statut d'approbation (colonne available de la table case)
		//
		// Send
		// case_id: int
		// available: int (0 or 1)

		console.log("case_properties:")
		console.log(case_properties)

		$.ajax({
			type: 'POST',
			url: ajax_url_basis + "ApproveCase",
			data: JSON.stringify(
				{
					case_id: case_id,
					case_approved: case_approved,
					case_properties_str: JSON.stringify(case_properties)
				}),
			beforeSend: function (xhr) { add_token(xhr) },
			contentType: 'application/json; charset=utf-8;',

			success: function ()
			{
				console.log("SUCCESS: change_case_approve_status")
			},

			error: function ()
			{
				console.log("ERROR: change_case_approve_status")
			}
		});
	},

	//---------------------------------------------------------------------------------------------------------------------

	copy_case()
	{
		if (!confirm("Voulez-vous vraiment créer une copie de ce cas?")) { return }

		log_console("copy_case :: POST: CopyCase");

		var obj = this

		// Called directly from UI

		// AJAX REQUEST
		// Demande au serveur de copier un cas
		//
		// Send
		// case_id: int
		//
		// Receive
		// new_case_id: int

		var case_id = obj.cases[obj.sel_pos].case_id
		var case_properties = obj.cases[obj.sel_pos].case_properties
		var case_approved = obj.cases[obj.sel_pos].case_properties.approved

		$.ajax({
			type: 'POST',
			url: ajax_url_basis + "CopyCase",
			data: JSON.stringify(
				{
					case_id: case_id,
					case_approved: case_approved,
					case_properties: case_properties
				}),
			beforeSend: function (xhr) { add_token(xhr) },
			contentType: 'application/json; charset=utf-8;',

			success: function (new_case_id)
			{
				alert("Cas copié !")

				log_console("SUCCESS: copy_case :: id = " + new_case_id.d)

				set_html_page("VueJs/admin_case/index.html", new_case_id.d, obj.student_data_id, 0)
			},

			error: function ()
			{
				console.log("ERROR: copy_case")
			}
		});

	},

	//---------------------------------------------------------------------------------------------------------------------

	new_case()
	{
		log_console("new_case :: POST: NewCase");

		var obj = this

		// Called directly from UI

		// Get input data
		var case_name = obj.new_case_properties.case_name.trim();
		var patient_name = obj.new_case_properties.patient_name.trim();
		var discipline_name = ""
		var discipline_id = 0

		if (obj.new_case_properties.discipline != null)
		{
			discipline_name = obj.new_case_properties.discipline.discipline_name == null ? "" : obj.new_case_properties.discipline.discipline_name.trim();
			discipline_id = obj.new_case_properties.discipline.id;
		}
		console.log("")
		console.log("case_name       = " + case_name)
		console.log("patient_name    = " + patient_name)
		console.log("discipline_name = " + discipline_name)
		console.log("discipline_id   = " + discipline_id)

		if (case_name == "") return
		if (patient_name == "") return
		if (discipline_name == "") return

		obj.new_case_properties.discipline = obj.new_case_properties.discipline.discipline_name;

		// AJAX REQUEST
		// Demande au serveur de créer un cas
		//
		// Send
		// case_name: str (nom du nouveau cas)
		// patient_name: str (nom du nouveau patient)
		// discipline: str (champs de discipline du nouveau cas)
		//
		// Receive
		// new_case_id: int

		$.ajax({
			type: 'POST',
			url: ajax_url_basis + "NewCase",
			data: JSON.stringify(
				{
					case_properties: obj.new_case_properties
				}),
			beforeSend: function (xhr) { add_token(xhr) },
			contentType: 'application/json; charset=utf-8;',

			success: function (new_case_id)
			{
				console.log("SUCCESS: new_case :: id = " + new_case_id.d)

				set_html_page("VueJs/admin_case/index.html", new_case_id.d, obj.student_data_id, 0)
			},

			error: function ()
			{
				console.log("ERROR: new_case")
			}
		});

	},

	//---------------------------------------------------------------------------------------------------------------------

	create_new_case_version()
	{
		var obj = this

		// Demande au serveur de créer une nouvelle version d'un cas

		var case_id = obj.cases[obj.sel_pos].case_id
		var case_properties = obj.cases[obj.sel_pos].case_properties

		$.ajax({
			type: 'POST',
			url: ajax_url_basis + "AdminCase_CreateCaseVersion",
			data: JSON.stringify(
				{
					case_id: case_id,
					case_properties: case_properties
				}),
			beforeSend: function (xhr) { add_token(xhr) },
			contentType: 'application/json; charset=utf-8;',

			success: function (new_case_id)
			{
				alert("Nouvelle version créée !")

				log_console("SUCCESS: create_new_case_version :: id = " + new_case_id.d)

				set_html_page("VueJs/admin_case/index.html", new_case_id.d, obj.student_data_id, 0)
			},

			error: function ()
			{
				console.log("ERROR: create_new_case_version")
			}
		});

	},

}

//---------------------------------------------------------------------------------------------------------------------
