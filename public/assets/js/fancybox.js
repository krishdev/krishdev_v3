$(document).ready(function(){
        // Get the modal
    setTimeout(function(){
        var modal = $('#myModal');

        // Get the button that opens the modal
        var btn = $(".gallery-item");

        // Get the <span> element that closes the modal
        var span = $(".fn-close");

        // When the user clicks the button, open the modal 
        $('body').on('click', ".gallery-item" ,function(e) {
            e.preventDefault();
            var $element = $(e.currentTarget);
            
            var src = $(e.target).attr("src");
            $(".modal-body img").attr("src",src);
            $(".modal-body img").attr("data-image",$element.attr("data-image"))
           setTimeout(function(){
            $(".modal-content").width($(".modal-body img").width());
           },100);
            modal.show();
        });
        $(".fn-prev").on("click",function(e){
            var $element = $(e.target).closest(".modal-body").find("figure img");
            var imgCount = $(".gallery-item").length,
                thisImage = $element.attr("data-image");
                if(thisImage == 1){
                    $element.attr("src", $(".gallery-item[data-image='" + imgCount + "'] img").attr("src"));
                    $element.attr("data-image", imgCount);
                }else{
                    $element.attr("src", $(".gallery-item[data-image='" + ( parseInt(thisImage) - 1 ) + "'] img").attr("src"));
                    $element.attr("data-image", parseInt(thisImage) - 1);
                }
                

        });
        $(".fn-next").on("click",function(e){
            var $element = $(e.target).closest(".modal-body").find("figure img");
            var imgCount = $(".gallery-item").length,
                thisImage = $element.attr("data-image");
                if(imgCount == thisImage){
                    $element.attr("src", $(".gallery-item[data-image='" + 1 + "'] img").attr("src"));
                    $element.attr("data-image", 1);
                }else{
                    $element.attr("src", $(".gallery-item[data-image='" + ( parseInt(thisImage) + 1 ) + "'] img").attr("src"));
                    $element.attr("data-image", parseInt(thisImage) + 1 );
                }
                

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