var page, catpage, where;
var urlParamsSearch;
   var urlParams, urlParamsAuth, viewed = false;

$("#panel-left").on("click", function () {
   $("#panel-left").panel("close");
  });   

function loading() {
    $.mobile.loading('show', {
        theme: "b",
        text: "",
        textonly: false,
        textVisible: true
    });
    $("body").find("*").attr("disabled", "disabled");
    $("body").find("a").click(function (e) {
        e.preventDefault();
    });
}


function changeCat(changeTo){
    
    $(':mobile-pagecontainer').pagecontainer('change', changeTo, {
        transition: 'flow',
        reload    : true,
        changeHash: false,
      allowSamePageTransition: true
    });
}

function changePage(changeTo, pageTransition, reloadR){
     if (typeof(pageTransition)==='undefined') pageTransition = 'flow';
     if (typeof(pageTransition)==='undefined')  reloadR = false;
    $(':mobile-pagecontainer').pagecontainer('change',changeTo, {
                          transition: pageTransition,
        showLoadMsg             : true,
       // changeHash: true,
                        // reverse: false,
                          //changeHash: true,
        reload:reloadR
        
                         // reload:false
                        });
}


function doneLoading() {
    $.mobile.loading('hide');
    $("body").find("*").removeAttr("disabled");
    $("body").find("a").unbind("click");
}


function showMessage(msg, time) {
    $.mobile.loading('show', {
        theme: "b",
        text: msg,
        textonly: true,
        textVisible: true
    });

    setTimeout(function () {
        $.mobile.loading('hide');
    }, time);
}
    


function prev(where, arg) {
    if (page <=1) { showMessage('You\'re already on the first page.', 1000);
    } else{
        loading();
        setTimeout(function () {
            if (arg == null || arg == undefined) { app.get(where, --page); }
            else { app.get(where, --page, arg);}
        }, 2000);
    }
}


this.next = function (where, arg) {
        loading();
        setTimeout(function () {
            if (arg == null || arg == undefined) { app.get(where, ++page); }
            else { app.get(where, ++page, arg);}
        }, 2000);
    }
 

function handleError(xhr, textStatus, errorThrown) {
console.log(xhr);
    console.log(textStatus);
    console.log(errorThrown);
    var errorMessage = setInterval(function () {
        $.mobile.loading('show', {
            theme: "b",
            text: 'Error' + ": " + errorThrown + " Please try again later.",
            textonly: true,
            textVisible: true
        });
        clearInterval(errorMessage);
    }, 1);
    var clearErrorMessage = setInterval(function () {
        $.mobile.loading('hide');
        clearInterval(clearErrorMessage);
       // window.history.back()
    }, 3000);
}