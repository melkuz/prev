

// Initialize empty array for questions
var all_questions = new Array();



// Text area ==========

function text_answer(div_id,initial_text=""){
    CKEDITOR.replace( div_id, {
        height : "auto",
        extraPlugins: 'autogrow,editorplaceholder,toolbar',
        removePlugins: 'resize,elementspath',
        autoGrow_onStartup: true,
        autoGrow_minHeight: 100,
        toolbar: [],
        editorplaceholder: 'Veuillez écrire votre réponse ici.',
        contentsCss: "body {font-size: 105%; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;}",
        toolbarStartupExpanded : false,
    } );
    all_questions.push( [div_id,"textarea"] );

    // Insert text
    if( initial_text.length > 0 ){
        CKEDITOR.instances[div_id].setData(initial_text);
    }
}


// Single answer ==========

function single_answer(div_id, choices, current_choice=null){
    html_contents = '<div class="list-group"><p>Sélectionnez une réponse:</p>';
    for(i=0;i<choices.length;i++){
        added_class = ""
        if(current_choice == i){
            added_class = "selact"
        }
        html_contents += `<a  id="choice-${div_id}-${i}" class="list-group-item list-group-item-action choice-single ${added_class} choice-${div_id}">${choices[i]}</a>`
    }
    html_contents += '</div>'
    $(`#${div_id}`).html(html_contents);
    all_questions.push([div_id,"single",choices.length]);
}


// Multi answer ==========

function multi_answer(div_id, choices, current_choice=Array()){
    html_contents = '<div class="list-group"><p>Sélectionnez une ou plusieurs réponses:</p>';
    for(i=0;i<choices.length;i++){
        added_class = ""
        if(current_choice.includes(i)){
            added_class = "selact"
        }
        html_contents += `<a  id="choice-${div_id}-${i}" class="list-group-item list-group-item-action choice-multi ${added_class} choice-${div_id}">${choices[i]}</a>`
    }
    html_contents += '</div>'
    $(`#${div_id}`).html(html_contents);
    all_questions.push([div_id,"multi",choices.length]);
}


// Collect answers from all questions ==========

function collect_answers(){
    
    all_answers = new Object();

    // For each question
    for(i=0;i<all_questions.length;i++){

        question_info = all_questions[i];

        // Is single or multi answers
        if( (question_info[1]=="single")|(question_info[1]=="multi") ){

            // Initialize answer variable
            if( question_info[1]=="single" ){
                answer = null;
            }
            else if( question_info[1]=="multi" ){
                answer = "";
            }

            // Verify each div
            for(divnb=0;divnb<question_info[2];divnb++){

                // If button is selected
                if( $(`#choice-${question_info[0]}-${divnb}`).hasClass("selact") ){

                    if( question_info[1]=="single" ){
                        answer = divnb;
                    }
                    else if(question_info[1]=="multi"){
                        answer += divnb + ";";
                    }

                }

            }

        }

        // If text area
        else if( question_info[1] == "textarea" ){
            answer = CKEDITOR.instances[question_info[0]].getData();
        }

        all_answers[question_info[0]] = answer 

    }


    // Drag list
    if ($("#all_items").length > 0) {
        all_answers["draglist"] = list_get_data();
    }


    return all_answers

}
