var indexpage, catpage, searchpage, authorpostspage, where;
var urlParamsSearch;
   var urlParams, urlParamsAuth, viewed = false;
var ajaxInProgress = false;
 var hasDownload = false;
$("#panel-left").on("click", function () {
   $("#panel-left").panel("close");
  });   

/*

function initPushwoosh()
{
	var pushNotification = window.plugins.pushNotification;

	//set push notifications handler
	document.addEventListener('push-notification', function(event) {
		var title = event.notification.title;
		var userData = event.notification.userdata;
	                            
		if(typeof(userData) != "undefined") {
			console.warn('user data: ' + JSON.stringify(userData));
		}
									
		alert(title);
   	});

	//initialize Pushwoosh with projectid: "GOOGLE_PROJECT_NUMBER", pw_appid : "PUSHWOOSH_APP_ID". This will trigger all pending push notifications on start.
	pushNotification.onDeviceReady({ projectid: "314280086613", pw_appid : "9DF21-CADBE" });

	//register for pushes
	pushNotification.registerDevice(
		function(status) {
			var pushToken = status;
			console.warn('push token: ' + pushToken);
		},
		function(status) {
			console.warn(JSON.stringify(['failed to register ', status]));
		}
	);
}

document.addEventListener('push-notification', function(event) {
	var title = event.notification.title;
	var userData = event.notification.userdata;

	console.warn('user data: ' + JSON.stringify(userData));
	alert(title);
});

*/

function loading() {
    $.mobile.loading('show', {
        theme: "b",
        text: "",
        textonly: false,
      textVisible: true
    });
   // $("body").find("*").attr("disabled", "disabled");
    /*$("body").find("a").click(function (e) {
        e.preventDefault();
    });*/
}


function changeCat(changeTo){
    
    $(':mobile-pagecontainer').pagecontainer('change', changeTo, {
        transition: 'fade',
        reload    : true,
        changeHash: false,
      allowSamePageTransition: true
    });
}

function changePage(changeTo, pageTransition, reloadR){
     if (typeof(pageTransition)==='undefined') pageTransition = 'none';
     if (typeof(pageTransition)==='undefined')  reloadR = false;
    $(':mobile-pagecontainer').pagecontainer('change',changeTo, {
                          transition: pageTransition,
     //   showLoadMsg             : true,
       //changeHash: true,
                        // reverse: false,
                          //changeHash: true,
        reload:reloadR
      //  reloadPage:reloadR
        
                         // reload:false
                        });
   // console.log(reloadR);
}


function doneLoading() {
    $.mobile.loading('hide');
  //  $("body").find("*").removeAttr("disabled");
//    $("body").find("a").unbind("click");
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
    /*if (page <=1) { 
         window.plugins.toast.showLongBottom('You\'re already on the first page.', function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
     //   showMessage('You\'re already on the first page.', 1000);
    } else{
        loading();
        setTimeout(function () {
            if (arg == null || arg == undefined) { app.get(where, --page); }
            else { app.get(where, --page, arg);}
        }, 2000);
    }*/
}


this.next = function (where, arg) {
      /*  loading();
        setTimeout(function () {
            if (arg == null || arg == undefined) { app.get(where, ++page); }
            else { app.get(where, ++page, arg);}
        }, 2000);*/
    }
 

function handleError(xhr, textStatus, errorThrown) {
if (errorThrown == 'abort') return false;
//console.log(xhr);
  //  console.log(textStatus);
    //console.log(errorThrown);
    /*var errorMessage = setInterval(function () {
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
    }, 3000);*/
    
        window.plugins.toast.showLongBottom('Error: ' + errorThrown + " Please try again later.", function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
    
}