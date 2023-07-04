//---------------------------------------------------------------------------------------------------------------------
// ajax.js - student case
//---------------------------------------------------------------------------------------------------------------------

var isUpdating = false
var isSaving   = false

//---------------------------------------------------------------------------------------------------------------------

var ajax_commands = {

	// 1
	ajax_mount_case()
	{
		log_console("1 - ajax_mount_case :: POST: StudentCase_GetCaseContent");

		var obj = this

		// AJAX REQUEST
		// Récupère les propriétés des données
		//
		// Send 
		// attribution_id: int  (sûrement à enlever, car sera dans le state niveau serveur)
		//
		// Receive
		// properties: JSON str (colonne properties de la table case)

		$.ajax({
			type: 'POST',
			url: ajax_url_basis + 'StudentCase_GetCaseContent',
			beforeSend: function (xhr) { add_token(xhr) },
			contentType: 'application/json; charset=utf-8;',

			success: function (caseContent)
			{
				console.log("1 - SUCCESS: ajax_mount_case")

				isUpdating = true

				////// Extract information
				obj.case_id = caseContent.d.case_id;
				obj.user_id = caseContent.d.user_id;
				obj.role_id = caseContent.d.role_id;
				obj.attribution_id = caseContent.d.case_attribution_id;
				obj.case_properties = JSON.parse(caseContent.d.case_properties);
				obj.case_end_properties = JSON.parse(caseContent.d.case_end_properties);
				obj.steps_list = JSON.parse(caseContent.d.steps_list);

				console.log("1 - case_id: " + obj.case_id)
				console.log("1 - case_end_properties: ")
				console.log(obj.case_end_properties)
				console.log("1 - case_properties: ")
				console.log(obj.case_properties)
				console.log("1 - steps_list: ")
				console.log(obj.steps_list)
			},
			error: function ()
			{
				console.log("1 - ERROR: ajax_mount_case")
			},
			complete: function ()
			{
				console.log("1 - COMPLETE: ajax_mount_case :: user_id = " + obj.user_id);

				setTimeout(function ()
				{
					isUpdating = false
					obj.ajax_receive_student_data();

				}, 1)
			}
		});
	},

	//---------------------------------------------------------------------------------------------------------------------

	// 2
	ajax_receive_student_data()
	{
		log_console("2 - ajax_receive_student_data :: POST: StudentCase_GetStudentData :: case_id = " + this.case_id);

		var obj = this

		// AJAX REQUEST
		// Réception des données des étudiants
		//
		// Send
		// attribution_id: int (sûrement à enlever, car sera dans le state niveau serveur)
		//
		// Receive
		// data: JSON str

		$.ajax({
			type: 'POST',
			url: ajax_url_basis + 'StudentCase_GetStudentData',
			data: JSON.stringify(
				{
					student_data_id: obj.student_data_id
				}),
			beforeSend: function (xhr) { add_token(xhr) },
			contentType: 'application/json; charset=utf-8;',
			success: function (studentContent)
			{
				console.log("2 - SUCCESS: ajax_receive_student_data")

				isUpdating = true

				////// Extract information
				if (studentContent.d.length > 0)
				{
					var content = JSON.parse(studentContent.d)

					obj.student_data_id = content.student_data_id
					obj.case_completed = content.case_completed

					content = content.student_data

					if (obj.student_data_id > 0)
					{
						obj.student_data = content
						obj.student_data_list = content.student_data_list
						obj.current_step_index = content.current_step_index
						obj.nb_completed_steps = content.nb_completed_steps
						obj.answers_current_steps = content.answers_current_steps
						obj.new_hypothesis = content.new_hypothesis
						obj.last_hypothesis_list = content.last_hypothesis_list
						obj.perso_notes = content.perso_notes
						obj.end_data = content.end_data

						// Add show answer list if not existing (new component)
						if (content.show_answer_list == null) {
							obj.show_answer_list = [];
							for (i = 0; i < obj.nb_completed_steps; i++) {
								obj.show_answer_list.push(true)
							}
						}
						else {
							obj.show_answer_list = content.show_answer_list;
						}

					}

					console.log("2 - student_content:")
					console.log(content)
				}
				else 
				{
					console.log("2 - student_content: no content")
				}

				setTimeout(function ()
				{
					// CALLBACK (ne pas supprimer le callback)
					obj.student_data_list_callback(studentContent.d);

				}, 1)
			},
			error: function ()
			{
				console.log("2 - ERROR: ajax_receive_student_data")
			},
			complete: function ()
			{
				console.log("2 - COMPLETE: ajax_receive_student_data");

				setTimeout(function ()
				{
					isUpdating = false

				}, 1)
			}
		});
	},

	//---------------------------------------------------------------------------------------------------------------------

	// 3
	ajax_receive_step_info()
	{
		log_console("3 - ajax_receive_step_info :: POST: StudentCase_GetStepContent :: case_id = " + this.case_id + " :: step_id = " + this.steps_list[this.current_step_index].step_id)

		var obj = this

		console.log("3 - ajax_receive_step_info >> " + obj.steps_list.length + " STEPS")

		// AJAX REQUEST
		// Cette commande permet de récupérer les colonnes information et answer
		// Idéalement, vérifier côté serveur si l'utilisateur peut recevoir l'étape
		//
		// Send 
		// attribution_id: int  (sûrement à enlever, car sera dans le state niveau serveur)
		// step_id: int
		//
		// Receive
		// title: str (colonne title de la table step)
		// questions: JSON str (colonne questions de la table step)
		// answers: JSON str (colonne answers de la table step)

		$.ajax({
			type: 'POST',
			url: ajax_url_basis + 'StudentCase_GetStepContent',
			data: JSON.stringify(
				{
					case_id: obj.case_id,
					step_id: obj.steps_list[obj.current_step_index].step_id
				}),
			beforeSend: function (xhr) { add_token(xhr) },
			contentType: 'application/json; charset=utf-8;',

			success: function (stepContent)
			{
				console.log("3 - SUCCESS: ajax_receive_step_info")

				isUpdating = true

				////// Extract information
				obj.step_selected.case_id = stepContent.d.case_id
				obj.step_selected.step_id = stepContent.d.step_id
				obj.step_selected.step_properties = JSON.parse(stepContent.d.step_properties)
				obj.step_selected.step_informations_list = JSON.parse(stepContent.d.step_informations_list)
				obj.step_selected.step_answers_list = JSON.parse(stepContent.d.step_answers_list)
				obj.step_selected.step_retros_list = JSON.parse(stepContent.d.step_retros_list)

				console.log("3 - step_selected:")
				console.log(obj.step_selected)

				// CALLBACK (ne pas supprimer le callback)
				obj.next_step_callback();
			},
			error: function ()
			{
				console.log("3 - ERROR: ajax_receive_step_info")
			},
			complete: function ()
			{
				console.log("3 - COMPLETE: ajax_receive_step_info");

				setTimeout(function ()
				{
					isUpdating = false

				}, 1)
			}
		});
	},

	//---------------------------------------------------------------------------------------------------------------------

	// 4
	ajax_send_student_data(student_data, case_completed, confirmation_box=false )
	{
		log_console("4 - ajax_send_student_data :: POST: StudentCase_SendStudentData")
		console.log(student_data)

		var obj = this

		// AJAX REQUEST
		// Envoi des données des étudiants
		//
		// Send
		// attribution_id: int  (sûrement à enlever, car sera dans le state niveau serveur)
		// data: JSON str

		isSaving = true

		$.ajax({
			type: 'POST',
			url: ajax_url_basis + 'StudentCase_SendStudentData',
			data: JSON.stringify(
				{
					student_data_id: obj.student_data_id,
					case_id: obj.case_id,
					student_data: JSON.stringify(student_data),
					case_completed: case_completed
				}),
			beforeSend: function (xhr) { add_token(xhr) },
			contentType: 'application/json; charset=utf-8;',

			success: function (id)
			{
				obj.student_data_id = id.d

				console.log("4 - SUCCESS: ajax_send_student_data :: student_data_id = " + obj.student_data_id)

				// Show last save
				var currentdate = new Date(); 
				var currenttime = currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();

				$("#last_time_save").html(`Dernière sauvegarde à ${currenttime}`);
				setTimeout(() => {
					$("#last_time_save").html(``);
				}, 5000);

				if (confirmation_box) {
					alert("Enregistré avec succès")
				}
			},
			error: function ()
			{
				console.log("4 - ERROR: ajax_send_student_data")
			},
			complete: function ()
			{
				console.log("4 - COMPLETE: ajax_send_student_data");

				setTimeout(function ()
				{
					isSaving = false

				}, 1)
			}

		});
	},

	//---------------------------------------------------------------------------------------------------------------------

	// 5
	ajax_delete_student_data()
	{
		log_console("5 - ajax_delete_student_data :: POST: StudentCase_DeleteStudentData")

		var obj = this

		// AJAX REQUEST 

		$.ajax({
			type: 'POST',
			url: ajax_url_basis + 'StudentCase_DeleteStudentData',
			data: JSON.stringify(
				{
					student_data_id: obj.student_data_id,
				}),
			beforeSend: function (xhr) { add_token(xhr) },
			contentType: 'application/json; charset=utf-8;',

			success: function (result)
			{
				console.log("5 - SUCCESS: ajax_delete_student_data")

				location.reload()
			},
			error: function ()
			{
				console.log("5 - ERROR: ajax_delete_student_data")
			}
		});
	},

}

//---------------------------------------------------------------------------------------------------------------------

$(document).ready(function ()
{
	log_console("Document ready")

	if (isDebug)
	{
		console.log("In debug mode")
		$("#div_debug").css("display", "block")
	}

	$(window).keydown(function (event)
	{
		if (event.keyCode == 13)
		{
			event.preventDefault();
			return false;
		}
	});
});

//---------------------------------------------------------------------------------------------------------------------
