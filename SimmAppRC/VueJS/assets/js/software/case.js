
// Templating function
function templating(data,json_obj){
    keys = Object.keys(json_obj);
    for (i = 0; i<keys.length; i++){
        data = data.replace(`{{${keys[i]}}}`,json_obj[keys[i]]);
    }
    return data
}

// Change part
function change_part(){

    $("#next_step_button").hide()
    confirm_answers();

    // Increment parts
    part_id++;
    student_results["current_part"]++;

    change_on_flag();

}

// Show secondary button
function show_secondary_button(){
    $("#button_princ").hide();
    $("#button_sec").show();
}

function show_primary_button(){
    $("#button_princ").show();
    $("#button_sec").hide();
}

// Generate new page when 
function change_on_flag(){
    if(flag == false) {

        window.setTimeout(change_on_flag(), 1000); /* this checks the flag every 1000 milliseconds*/

    } else {

        // Insert next template
        $.get( `templates/part${part_id}.html?r=<?php echo rand(100000000000000,999999999999999); ?>`, function( data ) {

            // Add next part
            data = templating(data,case_information); 
            if(part_id == 0){
                title = "Briefing"
            }
            else{
                title = "Étape " + part_id
            }

            // Add new part to main window
            $( "#main_contents" ).append("<span style='width:100%;' class='case_part gi' id='part"+part_id+"'><h2 class='pt-4 pt-3'>"+title+"</h2>"+data+"</span>").promise().done(function (data){
                change_visible_part(part_id);
                $(".cke_top").css("height","0px");
                $(".cke_top").css("display","none");
            });

            // Add navigation link
            $(".nav-link").removeClass("active");
            $("#nav-menu").append(`<a class="nav-link nee active" id="link${part_id}" onclick="change_visible_part(${part_id})" >${step_names[part_id]}</a>`);
            
            // Side menu scroll to botttom
            $(".sb-sidenav-menu").animate({ scrollTop: $(".sb-sidenav-menu").height()+200 }, 0);

            // Send progression data
            student_results["apprentissages"] = CKEDITOR.instances["editor1"].getData();
            $.post("request.php",{progression_case_answers:JSON.stringify(student_results)},function(data){
                console.log(data);
            });

        });
        flag = false;

    }
}

// Part scrolling
function change_visible_part( part_sel_id, c=true ){

    if(c){
        history.pushState({part_sel_id}, null, "step"+part_sel_id);
    }
    $("html, body").animate({ scrollTop: 0 }, 0);

    // Change active link
    $(".nav-link").removeClass("active");
    $("#link"+part_sel_id).addClass("active");

    // Change visible path
    $(".case_part").hide(0, function(data){
        $("#part"+part_sel_id).show(0, function(data){
            $("html, body").animate({ scrollTop: 0 }, 0);
        });
    });

    // Show-Hide next step button
    if( (part_id == part_sel_id) && (part_id < nb_total_parts) ){
        $("#next_step_button").show();
    }
    else if(part_id == nb_total_parts){
        not_finished = false;
        $("#next_step_button").hide();
        $("#end_button").show();
    }
    else{
        $("#next_step_button").hide();
    }

}


// Hypothèse évolution CRÉATION LISTE
var can_add = true;
function create_hypothesis_list(div_id,previous=false){
    // Insert HTML code into the div
    part1 = `<p style='color:black'>Inscrivez vos hypothèses par ordre d'importance. Vous pouvez déplacer les éléments une fois ceux-ci inscrits.</p>
                <div class="items" id="all_items"></div>
                <span id='addition_control'>
                <div>
                    <input id="new_element_input" placeholder="Inscrivez un nouvel élément à ajouter dans la liste" autocomplete="off"></input>
                </div>
                <button type="button" onclick="enter_press();" id="button_add" type="button" class="btn btn-secondary btn-next ">Ajouter</button></span>`;
    $("#"+div_id).html(part1).promise().done( function(data){
        // Set current list
        if(previous){
            numOfItems = 0;
            all_answers = student_results["hypotheses_evolution"].slice(-1)[0].split(';');
            for (i = 0; i < all_answers.length-1; i++){
                add_item(all_answers[i]);
            }
        }
    } );
}

var html_list_hypothese = ""

// Hypothèse évolution SAUVEGARDER
function save_hypothesis(div_id,flagchange=false){
    student_results["hypotheses_evolution"].push( list_get_data() );
    all_answers = student_results["hypotheses_evolution"].slice(-1)[0].split(';');

    html_data = "<ul class='list-group'>";
    for (i = 0; i < all_answers.length-1; i++){
        html_data += `<li class="list-group-item">${all_answers[i]}</li>`;
    }
    html_data += "</ul>";
    html_list_hypothese = $("#"+div_id).html();
    $("#"+div_id).html(html_data);
    $("#"+div_id).css("padding","0");
    if (flagchange){
        flag = true;
    }
}


function replace_list(div_id){
    $("#"+div_id).html(html_list_hypothese).promise().done(function(data){
        $.getScript( "assets/js/software/listdrag.js" );
    });
}

var flag = true;
change_on_flag();

var listcontents = new Array();

// ALERT WHEN CHANGING PAGE
var not_finished = true;
$(window).bind('beforeunload', function(){
    if (not_finished){
    return 'Are you sure you want to leave?';
}
});

// BACK-FORWARD BEHAVIORS
window.onpopstate = function(e){
    if(e.state){
        console.log(e.state);
        change_visible_part(e.state["part_sel_id"],false);
    }
};