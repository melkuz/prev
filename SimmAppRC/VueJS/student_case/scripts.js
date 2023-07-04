//---------------------------------------------------------------------------------------------------------------------
// scripts.js - student case
//---------------------------------------------------------------------------------------------------------------------

function suffleArray(data_to_shuffle)
{

	if (data_to_shuffle.length > 0) { // Verify if at least one row

		var all_pos = []

		for (i = 0; i < data_to_shuffle.length; i++) {
			all_pos.push(i)
		}

		all_pos = shuffle(all_pos)

		var data_with_new_order = []

		for (i = 0; i < data_to_shuffle.length; i++) {
			data_with_new_order.push(data_to_shuffle[all_pos[i]])
		}

		console.log("data_to_shuffle : ")
		console.log(data_to_shuffle)
		console.log("data_with_new_order : ")
		console.log(data_with_new_order)
	}
	else {
		data_with_new_order = data_to_shuffle;
	}

	return data_with_new_order
}

function shuffle(array)
{
	console.log("shuffle >>>>>>>>")
 
	let currentIndex = array.length, randomIndex;

	// While there remain elements to shuffle.
	while (currentIndex != 0)
	{
		// Pick a remaining element.
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
	}

	return array;
}

//
// CKEditor integration
//

Vue.use(CKEditor);

//
// VM
//

var vm = new Vue({ // student_case

	el: "#main",

	//
	// Data
	//

	data: {

		case_id: -2,
		user_id: -2,
		role_id: -2,
		student_data_id: -2,
		attribution_id: -2,
		case_completed: false,

		// General data to be loaded on initialization
		case_properties: {},
		case_end_properties: {},
		steps_list: [],

		// General data to be loaded at each step
		step_selected: {
			"case_id": 0,
			"step_id": 0,
			step_properties: {},
			step_informations_list: [],
			step_answers_list: [],
			step_retros_list: []
		},

		// Student related data (to be reloaded at initialization)
		student_data: {},
		//student_data_list: [[{ "elements_list": [] }]],
		student_data_list: [],
		show_answer_list: [],
		current_step_index: -1,
		nb_completed_steps: -1,
		answers_current_steps: false,
		new_hypothesis: "",
		last_hypothesis_list: [],
		perso_notes: "",
		end_data: { learning: "" },

		// Other data (do not save)
		tab_retro: -1,
		see_next_button: false,
		see_next_button_end: false,
	},


	directives: {

	},

	//
	// Methods
	//

	methods: Object.assign({}, ajax_commands, {

		delete_student_data() {
			this.ajax_delete_student_data()
		},

		force_refresh(message) {
			this.$forceUpdate()
			console.log("force refresh: [" + message + "]")
		},

		//
		// Fonction ajoutant une hypothèse évolutive lorsque l'utilisateur appuie sur "Entrée" dans la boîte de texte
		//
		onEnter: function (i) {
			console.log("onEnter ------------------------------- i = " + i)

			element_to_add = this.new_hypothesis;

			if (element_to_add.length > 0) {
				// Add element to the list
				this.student_data_list[this.student_data_list.length - 1][i].elements_list.push({ 0: element_to_add });

				// Remove entry
				this.new_hypothesis = ""
			}
		},

		//
		// Fonction ajoutant un élément dans la liste
		//
		onEnterList: function (i,list_nb)
		{
			console.log("onEnterList --------------------------- i = " + i)

			element_to_add = $("#list_add_elem_" + i).val()

			// Verify if in list
			var obj = $("#list_" + list_nb).find('option[value="' + element_to_add + '"]');
			console.log("OBJ")
			console.log(obj)

			if (element_to_add.length > 0) {
				if ((obj != null) && (obj.length > 0)) {

					// Add element to the list
					this.student_data_list[this.student_data_list.length - 1][i].elements_list.push({ 0: element_to_add });

					// Reset input
					$("#list_add_elem_" + i).val("");

				}
				else {
					alert("Veuillez sélectionner parmi la liste proposée.")
				}
			}

		},

		//
		// Fonction supprimant une hypothèse évolutive
		//
		delete_element: function (i, j)
		{
			this.student_data_list[this.student_data_list.length - 1][i].elements_list.splice(j, 1);
		},

		//
		// Fonction permettant de sélectionner/désélectionner des éléments dans une question de type choix de réponse
		//
		select_element: function (i, j)
		{
			console.log("select_element -------------------------------")

			// Extract question type
			question_type = this.step_selected.step_answers_list[i].type
			// 1101: Liste préétablie avec un élément à sélectionner
			// 1102: Liste préétablie avec un OU PLUSIEURS éléments à sélectionner

			// Extract selected string
			selected_element_str = this.step_selected.step_answers_list[i].elements_list[j][0];

			// If only one element to select, create a list with only the element selected
			if (question_type == 1101)
			{
				this.student_data_list[this.student_data_list.length - 1][i].elements_list = [selected_element_str]
			}
			// Check if the element is in the list
			else if (this.student_data_list[this.student_data_list.length - 1][i].elements_list.includes(selected_element_str))
			{
				// If in, remove elements_list
				const index = this.student_data_list[this.student_data_list.length - 1][i].elements_list.indexOf(selected_element_str);
				console.log(index);
				if (index > -1)
				{ // only splice array when item is found
					this.student_data_list[this.student_data_list.length - 1][i].elements_list.splice(index, 1); // 2nd parameter means remove one item only
				}
			}
			// Add element into the list
			else
			{
				this.student_data_list[this.student_data_list.length - 1][i].elements_list.push(selected_element_str)
			}
		},

		//
		// Fonction permettant de changer l'étape affichée à l'utilisateur
		//
		change_step: function (step_nb)
		{
			console.log("change_step")

			this.see_next_button = false;

			// Change step number
			this.current_step_index = step_nb;

			// Scroll to top
			window.scrollTo(0, 0);

			// Case end
			if (this.current_step_index >= this.steps_list.length)
			{
				// If there is no data 
				if (Object.keys(this.case_end_properties).length === 0)
				{
					console.log("Loading end properties");
					// Call AJAX
					this.ajax_receive_case_end();
				}

				if (!this.case_completed && this.nb_completed_steps == this.steps_list.length + 2)
				{
					this.case_completed = true

					console.log("+++++++++++++++++ student_data_save :: " + "change_step:case_completed")
					this.student_data_save()
				}
			}

			// Normal step
			if (this.steps_list.length > 0 && this.current_step_index < this.steps_list.length)
			{

				// Call AJAX
				if (this.current_step_index < 0) 
				{
					this.current_step_index = 0
				}
				console.log("change_step :: current_step_index >>>>>>>> " + this.current_step_index)

				this.ajax_receive_step_info()
			}

			this.force_refresh("");

			// Check if we can see button
			this.check_see_next_button();

		},

		//
		// Next step callback function
		//
		next_step_callback: function ()
		{
			console.log("3b - NEXT STEP -- CALLBACK")

			//// Insert retro data 
			if (((this.current_step_index + 1) < this.student_data_list.length) || (this.nb_completed_steps > this.steps_list.length) || this.answers_current_steps || ((this.nb_completed_steps == (this.current_step_index + 1)) && ((this.current_step_index + 1) == this.steps_list.length)))
			{
				console.log("Inserting retroaction")
				this.confirm_answer();
			}
			else
			{
				//this.step_selected.step_retros_list = [];
			}

			// Create new student data if required
			if (this.current_step_index == this.student_data_list.length)
			{
				console.log("3b - creating new array of type = " + this.steps_list[this.current_step_index].step_properties.step_type)

				var new_answer_array = []

				// Add element into show answer list
				this.show_answer_list.push(false);
				console.log(this.show_answer_list)

				if (this.steps_list[this.current_step_index].step_properties.step_type == 1)
				{ // Standard page

					this.see_next_button = false;

					console.log("3b - this.step_selected.step_answers_list = ")
					console.log(this.step_selected.step_answers_list)
					
					for (ii = 0; ii < this.step_selected.step_answers_list.length; ii++)
					{
						block = this.step_selected.step_answers_list[ii];
						console.log(block);
						type = block.type;
						console.log(type);

						console.log("3b - block type = " + type)

						if (type == 1)
						{ // Hypothèses évolutives
							console.log("3b - Hypothèses évolutives");
							console.log(this.last_hypothesis_list);
							new_answer_array.push({ elements_list: [...this.last_hypothesis_list] }) // Get previous list
						}
						else if (type == 1001)
						{ // 1001 Element ordering
							console.log("3b - 1001 Element ordering");
							nb_elements = block.elements_list.length;

							// To do --> random
							new_answer_array.push({ elements_list: suffleArray(block.elements_list) }) // Insert complete list
						}
						else if ((type >= 1100) && (type <= 1199))
						{ // Element selection
							console.log("3b - type >= 1100 && type <= 1199");
							new_answer_array.push({ elements_list: [] }) // Insert empty list
						}
						else if (type == 1500)
						{ // List (elements to add)
							new_answer_array.push({ elements_list: [] }) // Insert empty list
						}
						else if ((type == 10011) || (type == 10001))
						{ // Texts to write
							console.log("3b - type == 10011 || type == 10001");
							new_answer_array.push({ text: "" })
						}
					}

					console.log("3b - new_answer_array")
					console.log(new_answer_array)

					this.force_refresh();
				}

				else if (this.steps_list[this.current_step_index].step_properties.step_type == 10001)
				{ // Grille de raisonnement structuré
					console.log("3b - Grille de raisonnement structuré");

					this.see_next_button = false;
					elements_array = []

					for (i = 0; i < this.last_hypothesis_list.length; i++)
					{
						elements_array.push({ name: this.last_hypothesis_list[i][0], support: "", encontre: "", absent: "" });
					}

					new_answer_array = { elements_list: elements_array }
				}

				console.log("3b - next_step_callback :: new_answer_array:");
				console.log(new_answer_array);

				this.student_data_list.push(new_answer_array);
				console.log("3b - next_step_callback :: student_data_list:");
				console.log(this.student_data_list);

				// Save data
				console.log("+++++++++++++++++ student_data_save :: " + "next_step_callback")
				this.student_data_save()
			}
		},

		//
		// Fonction permettant de sauvegarder les hypothèses dans les hypothèses évolutives
		//
		save_hypothesis: function ()
		{
			console.log("save_hypothesis -------------------------------")

			for (i = 0; i < this.step_selected.step_answers_list.length; i++)
			{
				console.log(this.step_selected.step_answers_list[i].type)
				if (this.step_selected.step_answers_list[i].type == 1)
				{
					console.log("passing last")
					this.last_hypothesis_list = [...this.student_data_list[this.student_data_list.length - 1][i].elements_list];
				}
			}
		},

		//
		// Fonction permettant de passer à une nouvelle étape
		//
		next_step: function (event)
		{
			console.log("next step *********************************");

			// Save last hypothesis list (if not saved)
			// If normal step (type=1 ; on ne sauvegarde pas quand c'est la grille de raisonnement structuré)
			if (this.steps_list.length > 0 && this.current_step_index < this.steps_list.length)
			{
				if ((this.current_step_index >= 0) && (this.steps_list[this.current_step_index].step_properties.step_type == 1))
				{
					if ((this.current_step_index == (this.student_data_list.length - 1)) && (this.steps_list[this.current_step_index].step_properties.show_answer == false))
					{
						this.save_hypothesis();
					}
				}
			}

			// Change values
			this.answers_current_steps = false;
			this.nb_completed_steps += 1;

			// Load new contents
			console.log("next step :: current_step_index = " + this.current_step_index + 1)

			this.change_step(this.current_step_index + 1);

			console.log(">>>>>>>>>>>>>>>>>>>> next step :: back")
		},

		//
		// Fonction appelée lorsque les réponses sont confirmées par le bouton de confirmation, ainsi qu'au moment où une étape précédente est rechargée
		//
		confirm_answer: function (see_answer_request=true)
		{
			console.log("confirm_answer -------------------------------")

			// Save last hypothesis list
			if (this.current_step_index == (this.student_data_list.length - 1))
			{
				this.show_answer_list[this.current_step_index] = see_answer_request; // Save answer request
				this.save_hypothesis();
				if (see_answer_request) {
					this.answers_current_steps = true;
				}
				else {
					this.next_step();
				}
			}

			if (!this.case_completed)
			{
				// Save data
				console.log("+++++++++++++++++ student_data_save :: " + "confirm_answer")
				this.student_data_save();
			}


			// Check if there are at least one answer available to show
			count = 0
			for (i = 0; i < this.step_selected.step_retros_list.length; i++) {
				if ((this.step_selected.step_retros_list[i].html.length > 0) || (this.step_selected.step_retros_list[i].short_answer.length > 0) || (this.step_selected.step_retros_list[i].elements_list.length > 0)) {
					count = count + 1;
				}
			}
			

		},

		show_answers_previous_step: function (event)
		{
			console.log(this.show_answer_list)
			this.show_answer_list[this.current_step_index] = true;
			this.force_refresh("");
		},

		check_see_next_button: function (event)
		{

			//if (this.steps_list.length > 0 && this.nb_completed_steps == this.current_step_index && this.nb_completed_steps < this.steps_list.length)
			if (this.nb_completed_steps == this.current_step_index && this.nb_completed_steps < this.steps_list.length) {
				this.see_next_button = true;

				// Standard page (type 1)
				if (this.steps_list[this.current_step_index].step_properties.step_type == 1) {
					// La boucle FOR vérifie si chaque question a été répondue
					for (i = 0; i < this.step_selected.step_answers_list.length; i++) {
						type = this.step_selected.step_answers_list[i].type;

						// For each block, check if there is at least one answer
						if (type == 1) { // Hypothèses évolutives
							if (this.student_data_list[this.current_step_index][i].elements_list.length < 3) // At least 3 arguments
							{
								this.see_next_button = false;
							}
						}
						else if (((type >= 1100) && (type <= 1199)) || (type == 1500)) { // Éléments à sélectionner (un ou plusieurs) ; Liste à créer
							if (this.student_data_list[this.current_step_index][i].elements_list.length < 1) // At least 1 argument
							{
								this.see_next_button = false;
							}
						}
						else if ((type >= 10000) && (type <= 19999)) { // Texts to write
							if (this.student_data_list[this.current_step_index][i].text.length == 0) // At least 1 character
							{
								this.see_next_button = false;
							}
						}
					}
				}


				// Grille de raisonnement structuré (type 10001)
				else if (this.steps_list[this.current_step_index].step_properties.step_type == 10001) {

					this.see_next_button = true;

					for (i = 0; i < this.student_data_list[this.current_step_index].elements_list.length; i++) {

						comp = this.student_data_list[this.current_step_index].elements_list[i];

						if (comp.support.length == 0) {
							this.see_next_button = false;
						}
						else if (comp.encontre.length == 0) {
							this.see_next_button = false;
						}
						else if (comp.absent.length == 0) {
							this.see_next_button = false;
						}
					}
				}
			}
			console.log("see_next_button = " + this.see_next_button)

		},

		//
		// SAVE/LOAD ==================================================================================================
		//

		//
		// Sauvegarder les données
		//
		student_data_save: function ( confirmation_box = false )
		{
			if (!isSaving)
			{
				data_to_send = {
					student_data_list: this.student_data_list,
					current_step_index: this.current_step_index,
					nb_completed_steps: this.nb_completed_steps,
					answers_current_steps: this.answers_current_steps,
					new_hypothesis: this.new_hypothesis,
					last_hypothesis_list: this.last_hypothesis_list,
					perso_notes: this.perso_notes,
					end_data: this.end_data,
					answers_current_steps: this.answers_current_steps,
					show_answer_list: this.show_answer_list,
				},

				console.log("X - student_data_save :: Data to send to server")
				console.log(JSON.stringify(data_to_send));

				// AJAX REQUEST [3]
				// Envoi des données des étudiants
				this.ajax_send_student_data(data_to_send, this.case_completed, confirmation_box);
			}
		},

		//
		// Student data loading callback (appelé quand les données de l'étudiant sont obtenues du serveur)
		//
		student_data_list_callback: function (data)
		{
			if (data.length > 0)
			{ // No action if no data

				data = JSON.parse(data);
				log_console("2b - student_data_list_callback")

				// Insert data into vue
				keys = Object.keys(data);

				for (i = 0; i < keys.length; i++)
				{
					this[keys[i]] = data[keys[i]];
				}

				console.log("2b - student_data_list_callback :: keys")
				console.log(keys);

				console.log("2b - student_data_list_callback :: nb_completed_steps: " + this.nb_completed_steps)
				console.log("2b - student_data_list_callback :: current_step_index: " + this.current_step_index)

				// Load current step
				if (this.nb_completed_steps >= 0)
				{
					this.change_step(this.current_step_index);
				}
			}
		},

		access_cases_list()
		{
			set_html_page("VueJs/case_manager/index.html", 0, this.student_data_id, 0);
		},

		access_student_menu()
		{
			set_html_page("VueJs/student_menu/index.html", 0, this.student_data_id, this.attribution_id);
		},

		access_case_editor() {
			set_html_page("VueJs/admin_case/index.html", this.case_id, 0, 0);
		},

	}),

	//
	// Watches
	//

	watch: {

		// Vérificateur de réponses aux questions
		student_data_list: {
			handler: function (newValue)
			{

				console.log(">>>>>>>>>>>>>>>>>> 1. watch student_data_list :: newValue:")
				console.log(newValue)

				this.check_see_next_button();

			},
			deep: true
		},

		end_data: {

			handler: function (newValue)
			{
				if (!isUpdating)
				{
					console.log(">>>>>>>>>>>>>>>>>> 2. watch end_data :: newValue:")
					console.log(newValue)

					this.see_next_button_end = true;

					if (this.end_data.learning.length == 0)
					{
						this.see_next_button_end = false;
					}
				}
			},
			deep: true

		},
	},

	//
	// Created
	//

	created()
	{
		$("#main").show();
	},

	//
	// BeforeMount
	//

	beforeMount()
	{
		console.log("BeforeMount");

		// Call Ajax
		//this.ajax_mount_case();
	},

	//
	// Mounted
	//

	mounted()
	{
		console.log("Mounted");

		// Call Ajax
		this.ajax_mount_case();
	},

});




// Back -- Forward blocking
(function (global) {

	if (typeof (global) === "undefined") {
		throw new Error("window is undefined");
	}

	var _hash = "!";
	var noBackPlease = function () {
		global.location.href += "#";

		// Making sure we have the fruit available for juice (^__^)
		global.setTimeout(function () {
			global.location.href += "!";
		}, 50);
	};

	global.onhashchange = function () {
		if (global.location.hash !== _hash) {
			global.location.hash = _hash;
		}
	};

	global.onload = function () {
		noBackPlease();

		// Disables backspace on page except on input fields and textarea..
		document.body.onkeydown = function (e) {
			var elm = e.target.nodeName.toLowerCase();
			if (e.which === 8 && (elm !== 'input' && elm !== 'textarea')) {
				e.preventDefault();
			}
			// Stopping the event bubbling up the DOM tree...
			e.stopPropagation();
		};
	}
})(window);
