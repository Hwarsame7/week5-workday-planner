$(document).ready(function () {
  const clock = document.getElementById("clock");

  clock.innerHTML = moment().format("dddd, Do MMMM  YYYY, h:mm:ss a");

  function currentTime() {
    const current = moment().hours();
    const tableRows = $("tbody tr");
