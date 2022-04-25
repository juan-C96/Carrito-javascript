$(function(){
    $(".accordion-titulo").click(function(e){

        e.preventDefault();

        var contenido=$(this).next(".accordion-content");

        if(contenido.css("display")=="none"){ //abrir
            contenido.slideDown(250);
            $(this).addClass("open");
        }
        else{ //cerrar
            contenido.slideUp(250);
            $(this).removeClass("open");
        }

    });
});

var acc = document.getElementsByClassName("accordion-titulo");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
}
