//---------------------------------------------------------------------------------------------------------------------
// scripts.js - case manager
//---------------------------------------------------------------------------------------------------------------------

function show_new_case_menu()
{
	$('.new_case_button').hide();
	$('.new_case_menu').show()
}

// CKEditor integration
Vue.use(CKEditor);


var vm = new Vue({ // case manager

	el: "#main",

	vuetify: new Vuetify({
		lang: {
			current: 'fr',
		},
	}),

	components: {
	},

	data: {

		case_id: -1,
		student_data_id: -1,
		attribution_id: -1,
		user: { user_id: 1, cip: "blaf1904", role_id: 1 },

		// Initialization
		search: '',
		page: 1,
		pageCount: 0,
		itemsPerPage: 10,
		sel_pos: 0,
		headers: [
			{ text: 'Nom du cas',			value: 'case_properties.case_name' },
			{ text: 'Nom du patient',		value: 'case_properties.patient_name' },
			{ text: 'Contexte clinique',	value: 'case_properties.clinical_context' },
			{ text: 'Spécialité',			value: 'case_properties.discipline' },
			{ text: 'Créatice ou créateur', value: 'case_properties.creator' },
			{ text: 'Statut',				value: 'case_properties.approved_text' },
		],
		new_case_properties: {
			case_name: "",
			patient_name: "",
			discipline: { discipline_name: null, id: null },
		},

		// Data
		user_status: 10000,
		cases: [],
		disciplines: [],
	},


	methods: Object.assign({}, ajax_commands, {

		handleClick(value)
		{
			//alert(value)
			// 
			console.log("handleClick :: case id = " + value);

			// Access to URL
			// window.location.href = "./admin_case3.html";  // this reloads						

			// Get case position
			for (i = 0; i < this.cases.length; i++)
			{
				if (this.cases[i].case_id == value)
				{
					this.sel_pos = i;
				}
			}

			// Show menu
			$("#case_table").hide();
			$("#case_options").show();

		},

		toggle_options()
		{

			$("#case_table").show();
			$("#case_options").hide();

		},

		toggle_approve()
		{

			// Statut actuel = Déjà approuvé
			if (this.cases[this.sel_pos].case_properties.approved)
			{
				if (confirm("Voulez-vous créer une nouvelle version de ce cas?"))
				{
					this.cases[this.sel_pos].case_properties.approved = false;
					this.cases[this.sel_pos].case_properties.approved = "Brouillon";
					this.create_new_case_version(); // Server
				}
				else if (this.cases[this.sel_pos].student_data_count == 0)
				{
					if (confirm("Voulez-vous retirer l'approbation de ce cas?"))
					{
						this.cases[this.sel_pos].case_properties.approved = false; // Interface
						this.cases[this.sel_pos].case_properties.approved = "Brouillon";
						this.change_case_approve_status(this.cases[this.sel_pos].case_id, this.cases[this.sel_pos].case_properties, this.cases[this.sel_pos].case_properties.approved); // Server
					}
				}
			}
			// Statut actuel = Non approuvé
			else if (this.cases[this.sel_pos].case_properties.approved == false)
			{
				if (confirm("Voulez-vous vraiment approuver ce cas?"))
				{
					this.cases[this.sel_pos].case_properties.approved = true; // Interface
					this.cases[this.sel_pos].case_properties.approved = "Publié";
					this.change_case_approve_status(this.cases[this.sel_pos].case_id, this.cases[this.sel_pos].case_properties, this.cases[this.sel_pos].case_properties.approved); // Server
				}
			}

		},

		access_case_editor()
		{
			case_id = this.cases[this.sel_pos].case_id;
			set_html_page("VueJs/admin_case/index.html", case_id, this.student_data_id, this.attribution_id)
		},

		access_case_preview()
		{
			case_id = this.cases[this.sel_pos].case_id;
			set_html_page("VueJs/student_case/index.html", case_id, this.student_data_id, 0)
		},

		access_student_menu()
		{
			set_html_page("VueJs/student_menu/index.html", 0, this.student_data_id, this.attribution_id)
		},

		access_user_manager()
		{
			set_html_page("VueJs/user_manager/index.html", 0, 0, 0)
		},

	}),

	beforeMount()
	{
		this.get_user()

		// Get all cases
		this.get_all_cases(this);

		// Get disciplines
		this.get_disciplines(this);

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
