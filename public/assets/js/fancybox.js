$(document).ready(function(){
        // Get the modal
    setTimeout(function(){
        var modal = $('#myModal');

        // Get the button that opens the modal
        var btn = $(".gallery-item");

        // Get the <span> element that closes the modal
        var span = $(".fn-close");

        // When the user clicks the button, open the modal 
        btn.bind("click",function(e) {
            e.preventDefault();
            var src = $(e.target).attr("src");
            $(".modal-body img").attr("src",src);
           setTimeout(function(){
            $(".modal-content").width($(".modal-body img").width());
           },100);
            modal.show();
        });

        // When the user clicks on <span> (x), close the modal
        span.bind("click",function(e) {
            modal.hide();
        });

        // When the user clicks anywhere outside of the modal, close it
        $(window).bind("click",function(event) {
            if ($(event.target).attr("id") == modal.attr("id")) {
                modal.hide();
            }
        });
    },1000);
});