        $(document).delegate("div.hwrapper", "pageinit", function(event){
    $(".iscroll-wrapper", this).bind({
        iscroll_onpulldown: function(event, data){
            //react to a pull-down as necessary here
            console.log("tesT");
            //then call this to reset the pull-to-refresh controls:
            data.iscrollview.refresh();
        }
    });
});
      
   /*  console.log($.mobile.activePage.attr('id'));
      if ($.mobile.activePage.attr('id') == 'category-page') { app.get("category", 1, urlParams["cat"]); }
      else if ($.mobile.activePage.attr('id') == 'home-page'){ app.get("blog", 1); }
   
     
  data.iscrollview.refresh();    // Refresh the iscrollview
  }*/

  /*  function onPullDown (event, data) {
            console.log($.mobile.activePage.attr('id'));
         loading();
      
      setTimeout(function fakeRetrieveDataTimeout() {
        gotPullDownData(event, data);
      },
      500);
    }*/

    // Called when the user completes the pull-up gesture.
/*    function onPullUp (event, data) {
      setTimeout(function fakeRetrieveDataTimeout() {
        gotPullUpData(event, data);
      },
      500);
    }*/

   
