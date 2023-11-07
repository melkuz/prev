//---------------------------------------------------------------------------------------------------------------------
// scripts.js - student menu
//---------------------------------------------------------------------------------------------------------------------

function show_new_case_menu()
{
	$('.new_case_button').hide();
	$('.new_case_menu').show()
}

// CKEditor integration
Vue.use(CKEditor);



var vm = new Vue({

	el: "#main",
	
	vuetify: new Vuetify({ // student menu
		lang: {
			current: 'fr',
		},
	}),

	components: {
	},

	data: {

		case_id: -3,
		student_data_id: -3,
		attribution_id: -3,

		// Table initialization
		search: '',
		page: 1,
		pageCount: 0,
		itemsPerPage: 10,
		sel_pos: 0,
		headers: [
			{ text: 'Nom du patient',			value: 'case_properties.patient_name' },
			{ text: "Contexte clinique",		value: 'case_properties.clinical_context' },
			{ text: 'Spécialité',				value: 'case_properties.discipline' },
			{ text: 'Complété',					value: 'completed_str' },
		],
		cases: [],

		// User information
		user_info: {},
		user_info_completed: false,
		show_initial_menu: false,
		page_initial_menu: 0,

		// Selected case
		selected_case:{
							patient_name:null, 
							discipline:null, 
							completed:null, 
							attribution_id:null, 
							case_id:null
			     	  },
		selected_case_properties:{
							approved:null,
							briefing:null,
							case_name:null,
							creator:null,
							discipline:null,
							discipline_id:null,
							image:null,
							patient_name:null
		},
		selected_case_completions:[ ]

		
	},


	methods: Object.assign({}, ajax_commands, {

		handleClick(value)
		{
			console.log("attribution_id = " + value.attribution_id);

			// Copy selected value
			this.selected_case = value;
			
			// Show menu
			$("#case_table").hide();

			// Get case properties
			this.get_properties_and_completion()

		},

		handleClick_callback(value){

			$("#selected_case_menu").show();
		
		},

		select_trial(value)
		{
			log_console("select_trial")

			this.selected_case.case_id = this.selected_case_completions[value].trial_case_id
			trial_id = this.selected_case_completions[value].trial_id
			attribution_id = this.selected_case.attribution_id

			student_data_id = this.selected_case_completions[value].student_data_id

			console.log("trial_id = " + trial_id);
			//console.log(attribution_id);
			console.log("student_data_id = " + student_data_id);

			// Change window location to trial and attribution
			set_html_page("VueJs/student_case/index.html", this.selected_case.case_id, student_data_id, 0)
		}

	}),


	beforeMount()
	{

		// Get all cases
		this.get_all_cases(this);

		// Change table language to French
		this.$vuetify.lang.current = 'fr';

	}


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
