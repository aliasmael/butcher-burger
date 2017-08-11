// Apply accordion
$(document).ready(function(){
    $('.ui.accordion').accordion();

    $( ".action-buttons .red" ).click(function(e) {
        e.preventDefault();
        e.stopPropagation();
    });

    $( ".action-buttons .orange" ).click(function(e) {
        e.preventDefault();
        e.stopPropagation();
    });
});