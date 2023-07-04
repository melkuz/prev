//---------------------------------------------------------------------------------------------------------------------
// scripts.js - admin case
//---------------------------------------------------------------------------------------------------------------------



// Take an image URL, downscale it to the given width, and return a new image URL.
function downscaleImage(dataUrl, newWidth) {
	"use strict";
	var image, oldWidth, oldHeight, newHeight, canvas, ctx, newDataUrl;

	// Create a temporary image so that we can compute the height of the downscaled image.
	image = new Image();
	image.src = dataUrl;
	oldWidth = image.width;
	oldHeight = image.height;
	newHeight = Math.floor(oldHeight / oldWidth * newWidth)

	// Create a temporary canvas to draw the downscaled image on.
	canvas = document.createElement("canvas");
	canvas.width = newWidth;
	canvas.height = newHeight;

	// Draw the downscaled image on the canvas and return the new data URL.
	ctx = canvas.getContext("2d");
	ctx.drawImage(image, 0, 0, newWidth, newHeight);
	newDataUrl = canvas.toDataURL("image/jpeg", 0.8);
	return newDataUrl;
}





//
// Load CIM10 data
//

$(function ()
{
	$("#cim10codes").load("data/cim10.html", function ()
	{
		console.log("CIM10 loaded")
	});
});

//
// CKEditor integration
//

Vue.use(CKEditor);

//
// VM
//

var vm = new Vue({

	el: "#main",

	//
	// Data
	//

	data: {

		// Initialized in AJAX case_get_properties_and_steps
		case_id: null,
		student_data_id: null,
		step_selected: null,
		steps_list: [],
		case_properties: { title: "" },
		case_end_properties: { "retroactions_list": [] },

		//all_step_ids: null,

		step_selected: {
			step_informations_list: [],
			step_answers_list: [],
			step_retros_list: []
		},


		// Step related initialization
		step_index: 0,
		answer_index: 0,
		information_index: 0,
		retroaction_index: 0,
		briefing_index: 0,

		selected_admini_user: null,
		option0: 0,
		option1: 0,

		hover: false,
		hover2: false,
		hover3: false,

		hover_info: "",
		hover_info2: "",

		save_verification1: true,
		save_verification2: true,
		save_verification3: true
	},

	//
	// Methods
	//

	methods: Object.assign({}, ajax_commands, {

		//
		// GENERAL PARAMETERS =============================================================
		//

		force_step_update(message) 
		{
			//////this.step_update_content();
			this.force_refresh(message)
		},

		force_refresh(message)
		{
			this.$forceUpdate()
			console.log("force refresh: [" + message + "]")
		},

		change_approve(event)
		{
			// Inverse 
			this.case_properties.approved = !this.case_properties.approved;

			// Call ajax command
			this.change_approve_status()
		},

		add_admin_user(event)
		{
			// Check if choice is null
			if (this.selected_admini_user !== null)
			{
				if (this.case_access.includes(parseInt(this.selected_admini_user)) == false)
				{
					this.case_access.push(parseInt(this.selected_admini_user));
					this.manage_access(this.selected_admini_user, "add");
				}
			}
		},

		delete_admin_user(user_id)
		{
			user_id = parseInt(user_id) // Make sur it is INT

			// Ger position
			pos = this.case_access.indexOf(user_id);
			console.log(pos);

			// Remove user form array
			this.case_access.splice(pos, 1);

			this.manage_access(user_id, "delete");
		},

		//
		// BRIEFING =====================================
		//
		add_briefing(event)
		{
			this.case_properties.briefing.push({"title":"","html":""})
		},

		click_briefing(event)
		{
			this.briefing_index = parseInt(event.target.attributes["name"].textContent);
			console.log("briefing_index: " + this.briefing_index);
		},

		delete_briefing(event)
		{
			if (confirm("Voulez-vous vraiment supprimer ce bloc?")) {
				this.case_properties.briefing.splice(this.briefing_index, 1);
				if (this.briefing_index > 0) {
					this.briefing_index = this.briefing_index - 1;
				}
				this.hover3 = false;
			}
		},

		//
		// RETROACTION ==================================
		//

		add_retroaction(event)
		{
			var t = "Rétroaction #" + (this.case_end_properties.retroactions_list.length + 1)

			// Add element
			this.case_end_properties.retroactions_list.push({ title: t, contents: "" });

			// Change to just added
			this.retroaction_index = this.case_end_properties.retroactions_list.length - 1;
		},

		delete_retroaction(event)
		{
			if (confirm("Voulez-vous vraiment supprimer cette rétroaction?"))
			{
				index = this.retroaction_index;
				this.case_end_properties.retroactions_list.splice(index, 1);

				// Change index
				if (index > 0)
				{
					this.retroaction_index = this.retroaction_index - 1;
				}

				this.hover2 = false;
				this.force_refresh();

			}
		},

		//
		// SECTIONS =====================================
		//

		add_step(event)
		{
			this.option1 = 0
			this.save_all(false);

			// AJAX GET NEW STEP
			this.step_new();
		},

		click_fct(event)
		{
			//this.option1 = 0
			this.save_all(false);
			this.step_index = parseInt(event.target.attributes["name"].textContent); // Get step ID

			// Initialize selection
			this.information_index = 0;
			this.answer_index = 0;

			// AJAX-SERVER NEEDED
			console.log("STEP SELECTED = " + this.step_index);

			this.step_get_selected();
		},

		delete_step(event)
		{
			if (confirm("Voulez-vous vraiment supprimer cette étape?"))
			{
				this.option1 = 0
				this.delete_step_content(this.steps_list[this.step_index].case_id, this.steps_list[this.step_index].step_id)

				this.steps_list.splice(this.step_index, 1);

				if (this.step_index > 0)
				{
					this.step_index = this.step_index - 1;
				}

				this.hover2 = false;

				this.step_get_selected();
			}
		},

		//
		// INFORMATION BLOCKS ==================================
		//

		click_information(event)
		{
			this.information_index = parseInt(event.target.attributes["name"].textContent);
			console.log("information_index: " + this.information_index);
		},

		add_information(event)
		{
			this.step_selected.step_informations_list.push(
				{
					title: "",
					html: "",
					type: 1000,
					subtype: 1,
					table: [{}]
				}
			)

			console.log("add_information: ici 1");
			// Force update and refresh
			this.force_step_update("add_information") 
		},

		delete_information(event)
		{
			if (confirm("Voulez-vous vraiment supprimer ce bloc?"))
			{
				this.step_selected['step_informations_list'].splice(this.information_index, 1);
				if (this.information_index > 0)
				{
					this.information_index = this.information_index - 1;
				}
				this.hover3 = false;
				this.force_refresh();
			}
		},

		//
		// IMAGE HANDLER -------------------------------------------------------------------------------
		//

		previewFiles: function (event)
		{
			const selectedImage = event.target.files[0];
			const reader = new FileReader();
			gthis = this
			reader.onload = (e) =>
			{
				gthis.step_selected['step_informations_list'][gthis.information_index]['image'] = downscaleImage(e.target.result);
				this.force_step_update("previewFiles")
			};
			reader.readAsDataURL(selectedImage);
		},

		previewFiles_patient: function (event)
		{
			const selectedImage = event.target.files[0];
			const reader = new FileReader();
			gthis = this
			reader.onload = (e) =>
			{
				console.log("--- IMAGE LOAD ---")
				imgSrc = e.target.result;
				console.log(imgSrc)
				gthis.case_properties.image = downscaleImage(e.target.result, 500);

				this.force_step_update("previewFiles_patient") 
			};
			reader.readAsDataURL(selectedImage);
		},

		//
		// TABLES --------------------------------------------------------------------------------------
		//

		deleteRow: function (index)
		{
			this.step_selected['step_informations_list'][this.information_index]['table'].splice(index, 1);

			this.force_step_update("deleteRow")
		},

		changeRow: function (i1, change)
		{
			i2 = i1 + change;
			if ((i2 >= 0) && (i2 < this.step_selected['step_informations_list'][this.information_index]['table'].length))
			{

				let listtemp = this.step_selected['step_informations_list'][this.information_index]['table'];
				let temp = listtemp[i1];

				// Swap
				listtemp[i1] = listtemp[i2];
				listtemp[i2] = temp;
				this.step_selected['step_informations_list'][this.information_index]['table'] = []; // Force refresh
				this.step_selected['step_informations_list'][this.information_index]['table'] = listtemp;
			}

			this.force_step_update("changeRow")
		},

		addRow: function ()
		{
			this.step_selected['step_informations_list'][this.information_index]["table"].push({})

			this.force_step_update("addRow")
		},

		//
		// ANSWER BLOCKS =======================================
		//

		click_answer: function (event)
		{
			this.answer_index = parseInt(event.target.attributes["name"].textContent);
			console.log(this.answer_index);
		},

		add_answer: function (event)
		{
			this.step_selected.step_answers_list.push(
				{
					title: "",
					type: 1,
					html: "",
					elements_list: [],
					list: 0,
				}
			);
			this.step_selected.step_retros_list.push(
				{
					html: "",
					short_answer: "",
					elements_list: []
				}
			);

			// Force update and refresh
			this.force_step_update("add_answer")
		},

		delete_answer: function (event)
		{
			if (confirm("Voulez-vous vraiment supprimer ce bloc?"))
			{
				this.step_selected['step_answers_list'].splice(this.answer_index, 1);
				this.step_selected['step_retros_list'].splice(this.answer_index, 1);
				if (this.answer_index > 0)
				{
					this.answer_index = this.answer_index - 1;
				}
				this.hover3 = false;
				this.force_refresh();
			}
		},

		//
		// TABLES --------------------------------------------------------------------------------------
		//

		deleteRowA: function (index)
		{
			this.step_selected['step_answers_list'][this.answer_index]['elements_list'].splice(index, 1);
			this.step_selected['step_retros_list'][this.answer_index]['elements_list'].splice(index, 1);

			this.force_step_update("deleteRowA")
		},

		changeRowA: function (i1, change)
		{
			i2 = i1 + change;

			if ((i2 >= 0) && (i2 < this.step_selected['step_answers_list'][this.answer_index]['elements_list'].length))
			{
				// Swap step_answers_list
				let listtempA = this.step_selected['step_answers_list'][this.answer_index]['elements_list'];
				console.log(listtempA)
				let tempA = listtempA[i1];
				listtempA[i1] = listtempA[i2];
				listtempA[i2] = tempA;
				this.step_selected['step_answers_list'][this.answer_index]['elements_list'] = []; // Force refresh
				this.step_selected['step_answers_list'][this.answer_index]['elements_list'] = listtempA;
				console.log(listtempA)

				// Swap retro
				let listtempR = this.step_selected['step_retros_list'][this.answer_index]['elements_list'];
				let tempR = listtempR[i1];
				listtempR[i1] = listtempR[i2];
				listtempR[i2] = tempR;
				this.step_selected['step_retros_list'][this.answer_index]['elements_list'] = []; // Force refresh
				this.step_selected['step_retros_list'][this.answer_index]['elements_list'] = listtempR;
			}

			this.force_step_update("changeRowA")
		},

		addRowA: function ()
		{
			this.step_selected['step_answers_list'][this.answer_index]["elements_list"].push({ 0: "" });

			console.log(this.step_selected['step_answers_list'][this.answer_index]["elements_list"]);

			this.step_selected['step_retros_list'][this.answer_index]["elements_list"].push({ 0: false });

			this.force_step_update("addRowA")
		},

		ChangeAnswerA: function (index)
		{
			let temp = this.step_selected['step_retros_list'][this.answer_index]["elements_list"]

			// If only one to select
			if (this.step_selected['step_answers_list'][this.answer_index]["type"] == 1101)
			{
				// Set all other values to false
				temp.forEach((element, i) =>
				{
					temp[i][0] = false;
				});
				// Set selected value to true
				temp[index][0] = true;
			}
			// If one or many values to select
			else if (this.step_selected['step_answers_list'][this.answer_index]["type"] == 1102)
			{
				// Change selected value
				temp[index][0] = temp[index][0] == false;
			}

			// Change array
			this.step_selected['step_retros_list'][this.answer_index]['elements_list'] = []; // Force refresh
			this.step_selected['step_retros_list'][this.answer_index]['elements_list'] = temp;

			this.force_step_update("ChangeAnswerA")
		},

		verifyRetro: function (index)
		{

			let temp = this.step_selected['step_retros_list'][this.answer_index]["elements_list"]

			// If only one to select
			if (this.step_selected['step_answers_list'][this.answer_index]["type"] == 1101)
			{

				// Get true positions
				positions = []
				temp.forEach((element, i) =>
				{
					if (element[0])
					{
						positions.push(i)
					}
				});

				// Set all elements_list to false
				if (positions.length > 1)
				{
					temp.forEach((element, i) =>
					{
						temp[i][0] = false;
					});
					temp[positions[0]][0] = true; // Keep first True
				}

				// 
				if ((positions.length == 0) && (temp.length > 0))
				{
					temp[0][0] = false;
				}

			}

			// Change array
			this.step_selected['step_retros_list'][this.answer_index]['elements_list'] = []; // Force refresh
			this.step_selected['step_retros_list'][this.answer_index]['elements_list'] = temp;

			this.force_step_update("verifyRetro") 
		},

		save_all: function (alert_activated, preview=false)
		{
			log_console("save_verification 1, 2, 3 = " + this.save_verification1 + ", " + this.save_verification2 + ", " + this.save_verification3)

			if (this.save_verification1 && this.save_verification2 && this.save_verification3)
			{ 
				if (this.steps_list.length > 0)
				{
					this.save_verification1 = false;
					this.step_update_content();
				}
				
				//this.save_verification2 = false;
				//this.steps_list_update_content();

				this.save_verification3 = false;
				this.case_update_properties();

				if (alert_activated)
				{
					alert("Sauvegardé")
				}

				if (preview)
				{
					need_confirm = false;
					case_id = this.case_id;
					set_html_page("VueJs/student_case/index.html", case_id, 0, 0)
				}

			}
		}

	}),

	//
	// Watches
	//

	//////watch: {

	//////	steps_list: {
	//////		handler: function (val)
	//////		{
	//////			if (!isUpdating)
	//////			{
	//////				console.log(">>>>>>>>>>>>>>>>>> 1. Steps list changed :: case_id=" + this.case_id + ", step_index=" + this.step_index + " ... " + isUpdating)
	//////				this.steps_list_update_content();
	//////			}
	//////		},
	//////		deep: true
	//////	},

	//////	step_selected:
	//////	{
	//////		handler: function (val)
	//////		{
	//////			if (!isUpdating)
	//////			{
	//////				console.log(">>>>>>>>>>>>>>>>>> 2. Step selected changed :: case_id=" + this.case_id + ", step_index=" + this.step_index + " ... " + isUpdating)
	//////				this.step_update_content();
	//////			}
	//////		},
	//////		deep: true
	//////	},

	//////	case_properties: {
	//////		handler: function (val)
	//////		{
	//////			if (!isUpdating)
	//////			{
	//////				console.log(">>>>>>>>>>>>>>>>>> 3. Case properties changed :: case_id=" + this.case_id + " ... " + isUpdating)
	//////				this.case_update_properties();
	//////			}
	//////		},
	//////		deep: true
	//////	},

	//////	case_end_properties: {
	//////		handler: function (val)
	//////		{
	//////			if (!isUpdating)
	//////			{
	//////				console.log(">>>>>>>>>>>>>>>>>> 4. Case end_properties changed :: case_id=" + this.case_id + " ... " + isUpdating)
	//////				this.case_update_properties();
	//////			}
	//////		},
	//////		deep: true
	//////	},

	//////},

	//
	// Created
	//

	created()
	{
		log_console("1. created")

		$("#main").show();

		obj = this;

		setInterval(function ()
		{
			obj.save_all(false);
		},
		30000);

	},

	//
	// BeforeMount
	//

	beforeMount()
	{
		log_console("3. beforeMount")

		this.case_get_properties_and_steps();
	},

	//
	// Mounted
	//

	mounted()
	{
		log_console("4. mounted")
	},

});


var need_confirm = true;

 /// Quit confirmation
function myConfirmation() {
	if (need_confirm) {
		vm.save_all(false);
		return "Voulez-vous vraiment quitter l'éditeur de cas?";
	}
}

window.onbeforeunload = myConfirmation;




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
