

$.fn.enterKey = function (fnc) {
    return this.each(function () {
        $(this).keypress(function (ev) {
            var keycode = (ev.keyCode ? ev.keyCode : ev.which);
            if (keycode == '13') {
                fnc.call(this, ev);
            }
        })
    })
}

function enter_press(){
    if(can_add){
        input_val = $("#new_element_input").val();
        input_val = input_val.replaceAll(";","/").replaceAll('"',"''"); 
        if(input_val.length>0){
            can_add = false;
            add_item(input_val);
            $("#new_element_input").val("")
        }
    }
}

$("#new_element_input").enterKey(function () {
    enter_press();
});

function delete_item(item_nb){
    numOfItems--;
    $( "#item"+item_nb ).removeClass("item");
    $( "#item"+item_nb ).remove();
    document.querySelector('.items').style.height = (numOfItems * 40) + (numOfItems * 10) + 'px';
    positionItemsInOrder();
}



var pos = {x: null, y: null}; //Mouse coordinates
var diff = {x: null, y: null}; //So that mouse can drag item on the correct spot
var mouseDown = false; //Needs to be true for logic in 'mouseMove' event listener to be activated
var selectedItem = null; //Allows clicked on item to be tracked in 'mouseMove' event listener
var resetTransition = false; //Cooldown to prevent position errors
var transitionTime = 0; //In milliseconds
var itemsEle = document.querySelector('.items');

var numOfItems = document.querySelectorAll('.items .item').length;
//var total_number = document.querySelectorAll('.items .item').length;
//Set fixed height of items container
document.querySelector('.items').style.height = (numOfItems * 40) + (numOfItems * 10) + 'px';

function positionItems(insertIndex = null){
    let itemsList = document.querySelectorAll('.items .item'); 
    itemsList = Array.prototype.slice.call(itemsList); 
    itemsList = itemsList.filter(item => item.getAttribute('selected') !== 'yes');
    let indexCounter = 0;
    itemsList.forEach(function(item){
        if(insertIndex === indexCounter + 1){
            indexCounter++;
        }
        item.style.top = (40 * indexCounter) + (indexCounter * 10) + 'px';
        item.setAttribute('order', indexCounter + 1);
        indexCounter++;
    });
}
positionItems();

function positionItemsInOrder(){
    let itemsList = document.querySelectorAll('.items .item'); itemsList = Array.prototype.slice.call(itemsList); 
    itemsList = itemsList.sort(function(a, b){
        return Number(a.getAttribute('order')) > Number(b.getAttribute('order')) ? 1 : -1;
    });
    itemsList.forEach(function(item, index){
        if(item.getAttribute('selected') === 'yes'){
            item.removeAttribute('selected');
            item.style.left = '0';
            setTimeout(function(){
                item.style.zIndex = '0';
            }, transitionTime);
        };
        item.style.top = (40 * index) + (index * 10) + 'px';
        item.setAttribute('order', index + 1);
        item_id = item.id.slice(4);
        $("#ord_"+item_id).html(1+index);
    });
    resetTransition = true;
    //When transition is over
    setTimeout(function(){
        while(itemsEle.firstChild){
            itemsEle.removeChild(itemsEle.lastChild);
        };
        itemsList.forEach(function(item){
            itemsEle.append(item);
        });
        resetTransition = false;
        can_add = true;
    }, transitionTime);
}

function add_item(element_contents){
    numOfItems++;
    total_number++;
    document.querySelector('.items').style.height = (numOfItems * 40) + (numOfItems * 10) + 'px';
    listcontents.push(element_contents);
    $("#all_items").append(`<div class="item" order="${total_number}" id="item${total_number}"><span onclick="delete_item(${total_number})"><i class="fas fa-xmark fa-fw"></i></span>&nbsp;&nbsp;<span id="ord_${total_number}"></span>.&nbsp;<span style="font-size:0.8em;">${element_contents}</span></div>`).ready(function () {
        positionItemsInOrder();
        setitems();
    });
}

function add_item_no_delete(element_contents){
    numOfItems++;
    total_number++;
    document.querySelector('.items').style.height = (numOfItems * 40) + (numOfItems * 10) + 'px';
    listcontents.push(element_contents);
    $("#all_items").append(`<div class="item item_no_delete" order="${total_number}" id="item${total_number}">&nbsp;<span id="ord_${total_number}"></span>.&nbsp;<span style="font-size:0.8em;">${element_contents}</span></div>`).ready(function () {
        positionItemsInOrder();
        setitems();
    });
}

function setitems(){
    document.querySelectorAll('.items .item').forEach(function(item, index){
        item.addEventListener('mousedown', function(e){
            if(!pos.x || resetTransition) return;
            mouseDown = true, selectedItem = item;
            diff.y = pos.y - item.offsetTop, diff.x = pos.x - item.offsetLeft;
            let offsetY = pos.y - diff.y, offsetX = pos.x - diff.x;
            item.style.top = offsetY + 'px';
            item.style.left = offsetX  + 'px';
            item.style.zIndex = '1000';
            item.setAttribute('selected', 'yes');
        });
        item.addEventListener('mouseup', function(e){
            mouseDown = false;
            positionItemsInOrder();
        });
    });
}
setitems();

addEventListener('mousemove', function(e){
    pos.x = e.clientX - itemsEle.offsetLeft, pos.y = e.clientY - (itemsEle.offsetTop - window.scrollY); //ScrollY, so that a vertical scroll bar does not mess everything up
    if(!mouseDown) return;
    let offsetY = pos.y - diff.y, offsetX = pos.x - diff.x;
    selectedItem.style.top = offsetY + 'px';
    selectedItem.style.left = offsetX + 'px';
    // let itemsList = document.querySelectorAll('.items .item'); itemsList = Array.prototype.slice.call(itemsList); itemsList = itemsList.filter(item => item.getAttribute('selected') !== 'yes');
    let orderOfSelectedItem = Number(selectedItem.getAttribute('order'));
    //Test for new position
    if(orderOfSelectedItem !== 1){
        let beforeItem = document.querySelector(`.items .item[order*="${orderOfSelectedItem - 1}"]`);
        let beforeMiddle = pos.y < beforeItem.offsetTop + (beforeItem.clientHeight / 2);
        if(beforeMiddle){
            positionItems(orderOfSelectedItem - 1);
            selectedItem.setAttribute('order', orderOfSelectedItem - 1);
            return;
        }
    };
    if(orderOfSelectedItem !== document.querySelectorAll('.items .item').length){
        let afterItem = document.querySelector(`.items .item[order*="${orderOfSelectedItem + 1}"]`);
        let afterMiddle = pos.y > afterItem.offsetTop + (afterItem.clientHeight / 2);
        if(afterMiddle){
            positionItems(orderOfSelectedItem + 1);
            selectedItem.setAttribute('order', orderOfSelectedItem + 1);
            return;
        }
    };
});


function list_get_data(insertIndex = null){
    string_list = "";
    let itemsList = document.querySelectorAll('.items .item'); 
    itemsList = Array.prototype.slice.call(itemsList); 
    itemsList = itemsList.filter(item => item.getAttribute('selected') !== 'yes');
    let indexCounter = 0;
    itemsList.forEach(function(item){
        // Get div number
        item_id = parseInt( item.id.slice(4) );
        
        // Extract string
        console.log(listcontents[item_id-1])
        choice = listcontents[item_id-1].replace(";","/")

        // Concatenate string
        string_list += choice + ";"
    });

    return string_list
}


function initialize_list( list_answers=[] ){
    for (i=0;i<list_answers.length;i++){
        add_item(list_answers[i])
    }
}