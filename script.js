$(document).ready(function () {
  const clock = document.getElementById("clock");

  clock.innerHTML = moment().format("dddd, Do MMMM  YYYY, h:mm:ss a");

  function currentTime() {
    const current = moment().hours();
    const tableRows = $("tbody tr");
    tableRows.each(function () {
      const hour = parseInt($(this).children(".timeblock").attr("id"));

      // get value from LS for hour
      const task = localStorage.getItem(hour);

      if (task) {
        const input = $($($(this).children("td")[0]).children("input")[0]);
        input.val(task);
      }

      if (hour === current) {
        $(this).attr("class", "present textbox");
      } else if (current > hour) {
        $(this).attr("class", "past textbox");
      } else {
        $(this).attr("class", "future textbox");
      }
    });
  }
