
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership. The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var title, searchFound, url, request, authRequest, pageRequest, id, singlePostClickLocation;
var homeArray=[], categoryArray=[], searchArray=[], authorpostsArray=[], array;
var beginAtIndex=0, beginAtAuthor=0, beginAtCategory=0, beginAtSearch=0, beginWhere;
this.share = function (name, uri) {
    if (typeof name === 'undefined' || typeof uri === 'undefined') {
        window.plugins.socialsharing.share(title, null, null, url);
    }
    else {
        title = name;
        url = uri;
    }
    return;
};




/*Handlebars.registerHelper("xif", function (expression, options) {
    return Handlebars.helpers["x"].apply(this, [expression, options]) ? options.fn(this) : options.inverse(this);
  });
Handlebars.registerHelper("x", function (expression, options) {
  var fn = function(){}, result;

  // in a try block in case the expression have invalid javascript
  try {
    // create a new function using Function.apply, notice the capital F in Function
    fn = Function.apply(
      this,
      [
        'window', // or add more '_this, window, a, b' you can add more params if you have references for them when you call fn(window, a, b, c);
        'return ' + expression + ';' // edit that if you know what you're doing
      ]
    );
  } catch (e) {
    console.warn('[warning] {{x ' + expression + '}} is invalid javascript', e);
  }

  // then let's execute this new function, and pass it window, like we promised
  // so you can actually use window in your expression
  // i.e expression ==> 'window.config.userLimit + 10 - 5 + 2 - user.count' //
  // or whatever
  try {
    // if you have created the function with more params
    // that would like fn(window, a, b, c)
    result = fn.bind(this)(window);
  } catch (e) {
    console.warn('[warning] {{x ' + expression + '}} runtime error', e);
  }
  // return the output of that result, or undefined if some error occured
  return result;
});*/

Handlebars.registerHelper('ifCond', function(v1, v2, options) {
  if(v1 === v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

Handlebars.registerHelper('share', share);
Handlebars.registerHelper('strip-scripts', function (context) {
    var html = context;
    // context variable is the HTML you will pass into the helper
    // Strip the script tags from the html, and return it as a Handlebars.SafeString
    return new Handlebars.SafeString(html);
});
Handlebars.registerHelper("prettifyDate", function (timestamp) {
    return new Date(timestamp).toDateString()
});
//Handlebars.registerHelper("share", function(title, url) {
//  phoneNumber = phoneNumber.toString();
//  return "(" + phoneNumber.substr(0,3) + ") " + 
//    phoneNumber.substr(3,3) + "-" + 
//    phoneNumber.substr(6,4);
//});

Handlebars.registerHelper("debug", function (optionalValue) {
    console.log("Current Context");
    console.log("====================");
    console.log(this);
    if (optionalValue) {
        console.log("Value");
        console.log("====================");
        console.log(optionalValue);
    }
});

function initPushwoosh() {
var pushNotification = window.plugins.pushNotification;
if(device.platform == "Android")
{
registerPushwooshAndroid();
}/*
if(device.platform == "iPhone" || device.platform == "iOS")
{
registerPushwooshIOS();
}*/
}

var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        // document.addEventListener("deviceready", initPushwoosh, true);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        initPushwoosh();
        var attachFastClick = Origami.fastclick;
        attachFastClick(document.body);
        app.receivedEvent('deviceready');
        // navigator.splashscreen.show();

        // if (!window.plugins.socialsharing) {alert('sorry not initialized');}
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        console.log('Received Event: ' + id);
    },
    commentSubmit: function (name, email, comment, id_of_post) {
        id_of_post = id;
       console.log("Func: " + id_of_post);
        $.ajax({
            url: 'http://www.dwitnews.com/api/respond/submit_comment/?post_id=' + id_of_post + '&name=' + name + '&email=' + encodeURIComponent(email) + '&content=' + comment,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                var successMessage = data.status;
                if (0 == successMessage.localeCompare("pending") || 0 == successMessage.localeCompare("ok")) {
                    /*var intervalSuccess = setInterval(function () {
                        $.mobile.loading('show', {
                            theme: "b",
                            text: "Your comment has been submitted. The author may still need to approve it before it appears.",
                            textonly: true,
                            textVisible: true
                        });
                        clearInterval(intervalSuccess);
                    }, 1);*/
                    doneLoading();
                    $('#popupComment').popup('close');
                    window.plugins.toast.show('Your comment has been submitted. The author may still need to approve it before it appears.', 'long', 'center', function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
                    $("form").trigger('reset');
                     
                }

                else {
                    
                    doneLoading();
                 //   console.log("Done w/ Error");
                    /*var intervalError = setInterval(function () {
                        $.mobile.loading('show', {
                            theme: "b",
                            text: "Error: " + data.error,
                            textonly: true,
                            textVisible: true
                        });
                        clearInterval(intervalError);
                    }, 1);*/
                 window.plugins.toast.showLongBottom('Error: ' + data.error, function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
                    
                }
                
                //    doneLoading();
                document.getElementById('submit').disabled = false;
/*               doneLoading();
                var doneCommentMessage = setInterval(function () {
                    $.mobile.loading('hide');
                    clearInterval(doneCommentMessage);
                }, 2500);*/

                // var interval3 = setInterval(function(){ window.location.href='single.html';clearInterval(interval3);}, 3000);
            },

            error: function (xhr, textStatus, errorThrown) {
                // Handle error
              //  doneLoading();
                if (errorThrown == 'Conflict') {
                    errorThrown = 'A similar comment has already been submitted.';
                }
                handleError(xhr, textStatus, errorThrown);
                $("form").trigger('reset');
                $('#popupComment').popup('close');
            }

        });
    },


    authors: function () {
        var dfd = $.Deferred();
     authRequest =   $.ajax({
            url: 'http://dwitnews.com/api/get_author_index',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                var source = $("#author-template").html();
                var template = Handlebars.compile(source);
                var authorData = template(data);
                $(".wrapperb .iscroll-content").append("<ul data-role='listview' data-inset='true' id='authorslist' data-dismissible='false' data-filter='true' data-filter-placeholder='Search for an author...'> </ul>");
                $(".wrapperb").trigger("create");
               
                $("#authorslist").html(authorData);
                
                        $(".wrapperb").iscrollview("resizeWrapper");
                        $(".wrapperb").iscrollview("refresh");
                $("#authorslist").listview("refresh");
            //     $(".wrapper").listview().listview("refresh");
                    //$('.wrapper').listview('refresh');
            //    doneLoading();
                dfd.resolve(data);

            },
            error: function (xhr, textStatus, errorThrown) {
               // doneLoading();
                handleError(xhr, textStatus, errorThrown);
            }
        });
    },

    single: function () {
        console.log('single');
        var postDataLocation;
    //  alert("WHERE: " + singlePostClickLocation);
         if ($.mobile.activePage[0].id == 'home-page'){
                  postDataLocation = 'indexPostData';
         }
                  else if ($.mobile.activePage[0].id == 'category-page'){
                           postDataLocation = 'categoryPostData';
                  }
                    else if($.mobile.activePage[0].id == 'search-page'){
                            postDataLocation = 'searchPostData';
                    }
                        else if ($.mobile.activePage[0].id == 'authorposts-page'){
                                postDataLocation = 'authorPostData';
                        }
   //     singlePostClickLocation
     /*   if (singlePostClickLocation == 'home-page'){
                  postDataLocation = 'indexPostData';
         }
                  else if (singlePostClickLocation == 'category-page'){
                           postDataLocation = 'categoryPostData';
                  }
                    else if(singlePostClickLocation == 'search-page'){
                            postDataLocation = 'searchPostData';
                    }
                        else if (singlePostClickLocation == 'authorposts-page'){
                                postDataLocation = 'authorPostData';
                        }*/
        
         else {
                    parent.history.back();
                    return;
         }
          //     alert(postDataLocation + "single");
    //    console.log(postDataLocation + "single");
        
        var postDataStorage = localStorage.getItem(postDataLocation);
    //     alert(postDataStorage + "get item succeeded");
   //      console.log(postDataStorage + "get item succeeded");
        var source = $("#single-template").html();
        var template = Handlebars.compile(source);
        var postData = template(JSON.parse(postDataStorage));
      //  $(".singlewrapper").html("")
       // console.log(postDataStorage);
       id = JSON.parse(postDataStorage);
       id = id.id;
        $(".singlewrapper").html(postData);
                $('.singlewrapper').trigger("create");
          $("[data-iscroll]").iscrollview(); // First create iscrollview
$("[data-iscroll]").iscrollview("refresh"); // now refresh the iscrollview
  
     
      //          $(".singlewrapper").iscrollview();
        //$(".singlewrapper").iscrollview('refresh'); 
       // $(".singlewrapper").iscrollview("resizeWrapper");
        // $(".singlewrapper").iscrollview("refresh");
      //  $(".singlewrapper").iscrollview("resizeWrapper");
        //                $(".singlewrapper").iscrollview("refresh");
            /*   
                $(".wrapperb").trigger("create");
               
                $("#authorslist").html(authorData);
                
                        $(".wrapperb").iscrollview("resizeWrapper");
                        $(".wrapperb").iscrollview("refresh");
                $("#authorslist").listview("refresh");*/
        
        
             //   $("#authorslist").html(authorData);
                
                      //  $(".singlewrapper").iscrollview("resizeWrapper");
                   //     $(".singlewrapper").iscrollview("refresh");
         //       $("#authorslist").listview("refresh");
        
        
       // $('#single-data').html(postData);
        //$('#single-data').trigger('create');
         /* $(".singlewrapper").iscrollview("resizeWrapper");
        $(".singlewrapper").iscrollview("refresh");*/

    },
      page: function (slug) { 
     pageRequest =   $.ajax({
            url: 'http://dwitnews.com/?json=get_page&slug=' + slug,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                var source = $("#page-template").html();
                var template = Handlebars.compile(source);
                var pageData = template(data);
                   $('.page .iscroll-content').append(pageData);
        $('.page').trigger('create');
            //  $('#page-data').iscrollview();
                $('.page').iscrollview("refresh");
              //  $('#page-data').iscrollview("refresh");
               //   $('.pwrapper').iscrollview("resizeWrapper");
                  //
                 // $( wrap).iscrollview("resizeWrapper");
              //  doneLoading();

            },
            error: function (xhr, textStatus, errorThrown) {
             //   doneLoading();
                handleError(xhr, textStatus, errorThrown);
            }
        });
    },  
       get: function (type, pagecount, arg) {
        function getPosts() {
            var jsonRequest;
            var count = 13; var wrap ;
         var listview = $.mobile.activePage.attr('id') + "-posts";
            var dfd = $.Deferred();
              var templatesource = "#blog-template";
            var jsonURL = "http://www.dwitnews.com/?json=";
            if (type == 'category') {
                jsonRequest = "get_category_posts";
                jsonURL += jsonRequest;
                jsonURL += '&slug=' + arg + '&page=' + pagecount + '&count=' + count;
                wrap = ".cwrapper";
              templatesource = "#cat-template";
                beginWhere = 'beginAtCategory';
                array = 'categoryArray';
                
            }
            else if (type == 'search') {
                jsonRequest = "get_search_results";
                jsonURL += jsonRequest;
                jsonURL += '&search=' + arg + '&page=' + pagecount + '&count=' + count;
                templatesource = "#search-template";
                wrap = ".swrapper";
                 beginWhere = 'beginAtSearch';
                  array = 'searchArray';
            }
            else if (type == 'blog') {
                jsonRequest = "get_recent_posts";
                jsonURL += jsonRequest;
                jsonURL += '&page=' + pagecount + '&count=' + count;
          //   $.mobile.activePage.attr('id') + "-posts";
           wrap = ".wrapper";
                beginWhere = 'beginAtIndex';
                  array = 'homeArray';
            }
            else { // type == 'author'
                jsonRequest = "get_author_posts";
                jsonURL += jsonRequest;
                jsonURL += '&slug=' + arg + '&page=' + pagecount + '&count=' + count;
                 templatesource = "#authorposts-template";
                wrap = ".awrapper";
                beginWhere = 'beginAtAuthor';
                  array = 'authorpostsArray';
            }
       
  /*          var dfd = $.Deferred();
             jQuery.mobile.pageContainer.pagecontainer('change', window.location.href, {
    allowSamePageTransition: true,
    transition: 'none',
    reload: true 
    // 'reload' parameter not working yet: //github.com/jquery/jquery-mobile/issues/7406
  });*/
          //  "<ul class='touch' data-role='listview' data-inset='true' id='" + listview + "' data-dismissible='false'> </ul>");
   request =         $.ajax({
                url: jsonURL,
                type: 'GET',
                dataType: 'json',
                success: function (data) {
                    if (data.count != '0') {
                    if (type=='search') searchFound = true;
                    var source = $(templatesource).html();
                    var template = Handlebars.compile(source);
                    var resultData = template(data);
                          // $("#category-page").trigger('pagecreate');
                    //    $(wrap + " .iscroll-content").html();
                 //       $(wrap + " .iscroll-content").append("");
                         if (!document.getElementById(listview)){
                    $(wrap + " .scrollwrap").html("<ul data-role='listview' onclick='' id='" + listview + "'> </ul>");
                    
                         }
$(wrap).trigger("create");
                  //  $('#all-posts').listview('refresh');
                       // console.log("Page: " + page);
                        if (pagecount==1) {  $('#' + listview).html(resultData); }
                        else{
                    $('#' + listview).append(resultData);
                        }
                    $('#' + listview).listview('refresh');
                 //   $( wrap).iscrollview("resizeWrapper");
                  $(wrap).iscrollview("refresh");
                  if (pagecount==1)   $(wrap).iscrollview("scrollTo", 0, 0, 0, false);
               //         alert(resultData);
                  //      console.log(resultData);
                    var sizeOfList =  $("#" + $.mobile.activePage.attr('id') + "-posts li").size();
                   for (i=window[beginWhere], j=0;i<sizeOfList;i++, j++){
                             // for (j=0;j<data.posts.length;j++)
                                    window[array][i] = data.posts[j];
                            }
                        
                    window[beginWhere] = i;
                       // console.log(request.state());
                       // pageContainerElement.page({ domCache: true });
                         doneLoading(); 
                    dfd.resolve(data);
                       //   if (type=='search')
                       
                    }
                    else {
                    // if (type=='search') 
                     //   doneLoading();
                    //    console.log("Nothing beyond.");
                        if ((type=='search' && searchFound==true) || type!='search'){
                            window.plugins.toast.showShortBottom('No more results.');
                      //  showMessage('There is nothing beyond this that matches your query.', 3000);
                       
                 /*           if ($.mobile.activePage[0].id == 'home-page'){
                                indexpage = 1;
                }
                  else if ($.mobile.activePage[0].id == 'category-page'){
                           catpage=1;
                  }
                    else if($.mobile.activePage[0].id == 'search-page'){
                            searchpage = 1;
                    }
                        else if ($.mobile.activePage[0].id== 'authorposts-page'){
                                authorpostspage = 1;
                        }
                 */
                            
                            /*app.get(type, page, arg);*/
                        }
                        else {
                            
                        console.log("Not found.");
                            searchFound = false;
                        window.plugins.toast.showShortBottom('Not found. Please search with a different keyword again.');
                         //   showMessage('Not found. Please search with a different keyword again.', 1500); 
                            setTimeout(function(){ $.mobile.activePage.find('#popupSearch').popup('open'); }, 1500);   
                    } 
                    }
                    
                },
                error: function (xhr, textStatus, errorThrown) {
                  //  doneLoading();
                    handleError(xhr, textStatus, errorThrown);
                }
            });
            return dfd.promise();
        };
        getPosts().then(function (data) {
            var post;
          
        //     alert( "on click");
            //   localStorage.removeItem("postData");
           // $('#' + $.mobile.activePage.attr('id') + '-posts').on('tap', 'li', function (e) {
             $(document).on('tap', "#" + $.mobile.activePage.attr('id') + "-posts" + " li", function (e) {
                        
             //    alert($.mobile.activePage[0].id + " starting");
           //      console.log($.mobile.activePage[0].id + " starting");
                if ($.mobile.activePage[0].id == 'home-page'){
                  post = 'indexPostData';
                }
                  else if ($.mobile.activePage[0].id == 'category-page'){
                           post = 'categoryPostData';
                  }
                    else if($.mobile.activePage[0].id == 'search-page'){
                            post = 'searchPostData';
                    }
                        else if ($.mobile.activePage[0].id== 'authorposts-page'){
                                post = 'authorPostData';
                        }
                 
              
               
  //  alert(post + " storage location");
                
                     
                    var splittedID = $.mobile.activePage.attr('id').split('-');
                array = splittedID[0] + 'Array';
                // console.log("Splitted: " + array);
                //   console.log("Array size: " + window[array].length);
               //  console.log("Begin at: " + beginWhere);
                 
               /*  for (i=0;i<array.length;i++){
                     console.log(array[i]);
                 }*/
              //  console.log($(this).prevAll('li').size());
             //   localStorage.setItem(post, JSON.stringify(data.posts[$(this).index()]));
                   localStorage.setItem(post, JSON.stringify(window[array][$(this).prevAll('li').size()]));
                  // $( "#category-page" ).page( 'option', 'domCache', true );
 
              //  if ($.mobile.activePage.attr('id') == 'category-page') viewed = true;
            });
            
                     
        });
           
    }
    
};

/*

func: function (type, jsonURL){
    if (type!='search') { return 1; }
    else {
           $.ajax({
                url: jsonURL,
                type: 'GET',
                dataType: 'json',
                success: function (data) {
                    if (data.count != '0') {
                        return 1;
                   // dfd.resolve(data);
                    }
                    else {
                        return 0;
                    } 
                },
                error: function (xhr, textStatus, errorThrown) {
                    doneLoading();
                    handleError(xhr, textStatus, errorThrown);
                }
            });
        
    }*/
    

