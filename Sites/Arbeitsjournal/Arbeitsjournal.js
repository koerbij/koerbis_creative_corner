//Finds every element on the page with the class accordion (your button) and stores them in a list called acc.
var acc = document.getElementsByClassName("accordion");
//var i; creates a variable named i, which is used as the loop counter.
var i;

//Loops through that list, so the code below is applied to each accordion button. Right now you have one, but if you add more later they all work automatically.
for (i = 0; i < acc.length; i++) {
    //Tells the browser: "when this button is clicked, run the code inside."
    acc [i] .addEventListener("click", function() {
        //this is the button that was clicked. This adds the class active if it's missing, and removes it if it's there. In your CSS, .active gives the button the lighter purple color, so the button stays highlighted while its panel is open.
        this.classList.toggle("active");

        //Finds the element directly after the button in your HTML, which is your <div class="panel">.
        var panel = this.nextElementSibling;
        //If the panel is visible, hide it. Otherwise, show it. Your CSS starts the panel as display: none, so the first click shows it, the second hides it, and so on.
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
}