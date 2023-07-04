//---------------------------------------------------------------------------------------------------------------------
// ajax.js - admin case
//---------------------------------------------------------------------------------------------------------------------

var isUpdating = false

//---------------------------------------------------------------------------------------------------------------------

var ajax_commands = {

	case_get_properties_and_steps()
	{
		log_console("1 - case_get_properties_and_steps :: POST: GetCaseContent");

		var obj = this

		// AJAX
		// Demande au serveur des information d'un cas.
		//
		// Send
		// case_id: int
		//
		// Receive
		// case_properties_and_contents: JSON str
		//									[properties]: contenu de la colonne properties de la table case
		//									[end_properties]: contenu de la colonne end_properties de la table case
		//									[steps_list]: liste contenant les étapes du cas dans l'ordre
		//													 Chaque élément de cette liste est un dictionnaire:
		//														[id]: int, ID de l'étape
		//														[properties]: dicitonnary
		//																		[name]: str (colonne title de la table step)
		//																		[show_answer]: bool (colonne show_answer de la table step)
		//																		[type]: int (colonne type de la table step)

		$.ajax({
			type: 'POST',
			url: ajax_url_basis + "GetCaseContent",
			data: JSON.stringify(
			{
			}),
			beforeSend: function (xhr) { add_token(xhr) },
			contentType: 'application/json; charset=utf-8;',

			success: function (data)
			{
				console.log("1 - SUCCESS: case_get_properties_and_steps")

				isUpdating = true

				////// Extract information
				obj.case_id = data.d.case_id;
				//obj.attribution_id = data.d.case_attribution_id;
				obj.steps_list = JSON.parse(data.d.steps_list);

				// Case properties
				case_properties = JSON.parse(data.d.case_properties);
				if (typeof case_properties.briefing === 'string' || case_properties.briefing instanceof String) {
					// Initialize with three blocks
					case_properties.briefing = [{ "title": "Introduction", "html": "" }, { "title": "Objectifs", "html": "" }, { "title": "Consignes", "html": "" }];
				}

				// Clinical context (add if not existing)
				if (case_properties.hasOwnProperty("clinical_context") == false) {
					case_properties["clinical_context"] = ""
				}

				obj.case_properties = case_properties;
				obj.case_end_properties = JSON.parse(data.d.case_end_properties);
			},
			error: function ()
			{
				console.log("1 - ERROR: case_get_properties_and_steps")

				isUpdating = true

				obj.steps_list = []
				obj.case_properties = {}
				obj.case_end_properties = {}
			},
			complete: function()
			{
				console.log("1 - COMPLETE: case_get_properties_and_steps")

				isUpdating = true

				if (obj.steps_list.length > 0)
				{
					// Initialize step contents
					obj.step_index = 0
					obj.step_get_selected()
				}
				else 
				{
					setTimeout(function ()
					{
						isUpdating = false

					}, 1)
				}

				console.log("1 - steps_list: ")
				console.log(obj.steps_list)
				console.log("1 - step_index: " + obj.step_index + ", step_id: " + obj.step_selected.step_id)
			}
		});
	},

	//---------------------------------------------------------------------------------------------------------------------

	step_get_selected()
	{
		log_console("2 - step_get_selected :: POST: GetStepContent");

		var obj = this

		// AJAX
		// Demande au serveur le contenu d'une étape
		//
		// Send
		// case_id: int
		// step_id, int
		//
		// Receive
		// block: JSON str
		//			[information]: JSON str (contenu de la colonne information de la table step)
		//			[answer]: JSON str (contenu de la colonne answer de la table step)
		//			[retro]: JSON str (contenu de la colonne retro de la table step)

		$.ajax({
			type: 'POST',
			url: ajax_url_basis + "GetStepContent",
			data: JSON.stringify(
			{
				case_id: obj.case_id,
				step_id: obj.steps_list[obj.step_index].step_id
			}),
			beforeSend: function (xhr) { add_token(xhr) },
			contentType: 'application/json; charset=utf-8;',

			success: function (data)
			{
				console.log("2 - SUCCESS: step_get_selected")

				isUpdating = true

				////// Extract information
				obj.step_selected = {}
				obj.step_selected.case_id = data.d.case_id
				obj.step_selected.step_id = data.d.step_id
				obj.step_selected.step_properties = obj.steps_list[obj.step_index].step_properties
				obj.step_selected.step_informations_list = JSON.parse(data.d.step_informations_list)
				obj.step_selected.step_answers_list = JSON.parse(data.d.step_answers_list)
				obj.step_selected.step_retros_list = JSON.parse(data.d.step_retros_list)
			},
			error: function ()
			{
				console.log("2 - ERROR: step_get_selected");

				isUpdating = true

				obj.step_selected = {
					step_informations_list: [],
					step_answers_list: [],
					step_retros_list: []
				};
			},
			complete: function ()
			{
				console.log("2 - COMPLETE: step_get_selected");

				setTimeout(function ()
				{
					isUpdating = false

				}, 1)

				console.log("2 - step_selected: ")
				console.log(obj.step_selected)
				console.log("2 - step_index: " + obj.step_index + ", step_id: " + obj.step_selected.step_id)

				console.log("2 - step_type: ")
				console.log(obj.steps_list[obj.step_index].step_properties.step_type)
			}
		});
	},

	//---------------------------------------------------------------------------------------------------------------------

	step_update_content()
	{
		var obj = this

		log_console("3 - step_update_content :: POST: SetStepInfo");

		// AJAX
		// Met à jour une étape
		//
		// Send
		// case_id: int
		// step_id: int
		// properties: JSON str (colonne properties de la table step)
		// information: JSON str (colonne information de la table step)
		// answer: JSON str (colonne answer de la table step)
		// retro: JSON str (colonne retro de la table step)

		$.ajax({
			type: 'POST',
			url: ajax_url_basis + "SetStepInfo",
			data: JSON.stringify(
			{
				case_id: obj.case_id,
				step_id: obj.step_selected.step_id,
				step_properties: JSON.stringify(obj.step_selected.step_properties),
				step_informations_list: JSON.stringify(obj.step_selected.step_informations_list),
				step_answers_list: JSON.stringify(obj.step_selected.step_answers_list),
				step_retros_list: JSON.stringify(obj.step_selected.step_retros_list)
			}),
			beforeSend: function (xhr) { add_token(xhr) },
			contentType: 'application/json; charset=utf-8;',

			success: function ()
			{
				console.log("3 - SUCCESS: step_update_content")
			},
			error: function ()
			{
				console.log("3 - ERROR: step_update_content")
			},
			complete: function ()
			{
				console.log("3 - CONPLETE: step_update_content")
				obj.save_verification1 = true
			}
		});
	},

	//---------------------------------------------------------------------------------------------------------------------

	step_new()
	{
		log_console("4 - step_new :: POST: NewStep");

		var obj = this

		// AJAX
		// Création d'une nouvelle étape. Demande au serveur une nouvelle étape associée au cas actuel.

		// Send
		// case_id: int
		// step_id,properties,information,answer,retro: null
		//
		// Receive
		// new_id_and_step_properties: JSON str
		//								[id]: int
		//								[properties]: JSON str

		$.ajax({
			type: 'POST',
			url: ajax_url_basis + "NewStep",
			data: JSON.stringify(
			{
				case_id: obj.case_id,
				list_length: obj.steps_list.length
			}),
			contentType: 'application/json; charset=utf-8;',
			beforeSend: function (xhr) { add_token(xhr) },

			success: function (step_item)
			{
				console.log("4 - SUCCESS: step_new")

				isUpdating = true

				var item = JSON.parse(step_item.d)

				////// Add to steps_list
				obj.steps_list.push(item)
				obj.step_index = obj.steps_list.length - 1

				console.log("4 - step_list: ")
				console.log(obj.steps_list)
				console.log("4 - step_index: " + obj.step_index)

				////// Set step selected
				obj.step_selected = {}
				obj.step_selected.case_id = item.case_id
				obj.step_selected.step_id = item.step_id
				obj.step_selected.step_properties = item.step_properties
				obj.step_selected.step_informations_list = []
				obj.step_selected.step_answers_list = []
				obj.step_selected.step_retros_list = []
				obj.step_selected.step_properties.step_name = "" // Modify name

				////// Add Hypothèses évolutives par défaut
				obj.add_answer();

				console.log("4 - step_selected: ")
				console.log(obj.step_selected)
			},
			error: function ()
			{
				console.log("4 - ERROR: step_new")
			},
			complete: function ()
			{
				console.log("4 - COMPLETE: step_new")

				setTimeout(function ()
				{
					isUpdating = false
				}, 1)
			}
		});
	},

	//---------------------------------------------------------------------------------------------------------------------

	case_update_properties()
	{
		log_console("5 - case_update_properties :: POST: SetCase");

		var obj = this

		// AJAX
		// Met à jour les informations du cas
		//
		// Send
		// case_id: int
		// case_properties: str (colonne properties de la table case)
		// case_end_properties: str (colonne end_properties de la table case)

		$.ajax({
			type: 'POST',
			url: ajax_url_basis + "SetCase",
			data: JSON.stringify(
			{
				case_id: obj.case_id,
				case_properties: JSON.stringify(obj.case_properties),
				case_end_properties: JSON.stringify(obj.case_end_properties)
			}),
			beforeSend: function (xhr) { add_token(xhr) },
			contentType: 'application/json; charset=utf-8;',

			success: function (data)
			{
				console.log("5 - SUCCESS: case_update_properties")
			},
			error: function ()
			{
				console.log("5 - ERROR: case_update_properties")
			},
			complete: function ()
			{
				console.log("5 - CONPLETE: case_update_properties")
				obj.save_verification3 = true
			}
		}
		);

	},

	//---------------------------------------------------------------------------------------------------------------------

	delete_step_content(case_id, step_id)
	{
		log_console("6 - delete_step_content :: POST: DeleteStep")

		console.log("6 - case_id = " + case_id);
		console.log("6 - step_id = " + step_id);

		$.ajax({
			type: 'POST',
			url: ajax_url_basis + "DeleteStep",
			data: JSON.stringify(
			{
				case_id: case_id,
				step_id: step_id
			}),
			beforeSend: function (xhr) { add_token(xhr) },
			contentType: 'application/json; charset=utf-8;',

			success: function ()
			{
				console.log("6 - SUCCESS: delete_step_content")
			},
			error: function ()
			{
				console.log("6 - ERROR: delete_step_content")
			}

		});
	},

	//---------------------------------------------------------------------------------------------------------------------

	step_order_update() // AG - à faire
	{
		log_console("7 - step_order_update :: POST: SetStepOrder");

		var obj = this

		// Includes step deleting (peut-être à supprimer)
		new_orders = {};

		// Initialize orders to 0
		//for (i = 0; i < obj.all_step_ids; i++)
		for (i = 0; i < obj.steps_list.length; i++)
		{
			new_orders[i] = obj.steps_list[i].step_id;
		}

		console.log(new_orders);

		// new_orders = {1: 1, 201: 2, 734: 0}

		// AJAX
		// Met à l'ordre des étapes
		// 
		// Send
		// case_id: int
		// new_orders: Dictionnaire, chaque clé correspond à l'ID de l'étape et le contenu correspond à la nouvelle position de l'étape
		// 				Par exemple: {1: 2, 201: 1, 734: 0}
		//							Ici, le Step ID 1 est à la position 2, le Step ID est à la position 1 et le Step ID 734 est à la position 0.

		$.ajax({
			type: 'POST',
			url: ajax_url_basis + "SetStepOrder/",
			data: JSON.stringify(
			{
				case_id: obj.case_id,
				new_orders: JSON.stringify(new_orders)
			}),
			beforeSend: function (xhr) { add_token(xhr) },
			contentType: 'application/json; charset=utf-8;',

			success: function ()
			{
				console.log("7 - SUCCESS: step_order_update")
			},
			error: function ()
			{
				console.log("7 - ERROR: step_order_update")
			}
		}
		);
	},

	//---------------------------------------------------------------------------------------------------------------------

	steps_list_update_content()
	{
		log_console("8 - steps_list_update_content :: POST: ???");
		this.save_verification2 = true;
	},

	//---------------------------------------------------------------------------------------------------------------------

	manage_access(user_id, action)
	{
		// Ajax <---- [8]
		//$.post("./manage_access", {
		//	case_id: obj.case_id,
		//	user_id: user_id,
		//	action: action
		//});
	},
}

//---------------------------------------------------------------------------------------------------------------------
