$(document).ready(() => {
  const text = $("#inside-circle-text");
  const circle = $(".circle");
  breathein();
  function breathein() {
    text.text("Breathe In!");
    circle.removeClass("hold breathe-out").addClass("breathe-in");
    setTimeout(hold, 4000);
  }

  function hold() {
    text.text("Hold!");
    circle.removeClass("breathe-in breathe-out").addClass("hold");
    setTimeout(breatheout, 2000);
  }

  function breatheout() {
    text.text("Breathe Out!");
    circle.removeClass("breathe-in hold").addClass("breathe-out");
    setTimeout(breathein, 4000);
  }
});
