var socket = io();
var changed = false;
var ylabels = [];
var xlabels = [];

var ctx1 = document.getElementById("myChart1").getContext("2d");
var myChart1 = new Chart(ctx1, {
  type: "line",
  data: {
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    datasets: [
      {
        label: "Temperature",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        borderColor: "RGB(209, 75, 127)",
        backgroundColor: "RGB(209, 75, 127)",
      },
      {
        label: "Humidity",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        borderColor: "RGB(79, 114, 219)",
        backgroundColor: "RGB(79, 114, 219)",
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});
var ctx2 = document.getElementById("myChart2").getContext("2d");
var myChart2 = new Chart(ctx2, {
  type: "bar",
  data: {
    labels: ["Recent Updates"],
    datasets: [
      {
        label: "Temperature",
        data: [0],
        borderColor: "RGB(209, 75, 127)",
        backgroundColor: "RGB(209, 75, 127)",
      },
      {
        label: "Humidity",
        data: [0],
        borderColor: "RGB(79, 114, 219)",
        backgroundColor: "RGB(79, 114, 219)",
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

socket.on("changed", function (labels1, labels2) {
  console.log("----------------");

  var i;
  for (i = 0; i < 10; i++) {
    myChart1.data.datasets[0].data[i] = labels1[i];
    myChart1.data.datasets[1].data[i] = labels2[i];
  }
  myChart2.data.datasets[0].data[0] = labels1[9];
  myChart2.data.datasets[1].data[0] = labels2[9];
  console.log("Updating the chart.");
  myChart1.update();
  myChart2.update();
  console.log("Updating the chart finish.");
});

$.ajaxSetup({ timeout: 1000 });
btn = document.querySelector('input[name="butname"]');
// txt = document.querySelector("p");
btn.addEventListener("click", led1);
var val1 = "OFF";
function led1() {
  // var val1;
  console.log(btn.value);
  if (btn.value === "LED-1" && val1 === "OFF") {
    val1 = "ON";
    // val
  } else if (btn.value === "LED-1" && val1 === "ON") {
    val1 = "OFF";
  }
  console.log(val1);

  TextVar = form.inputbox.value;
  console.log(TextVar);
  ArduinoVar = "http://" + TextVar + ":8766/";
  console.log(ArduinoVar);
  $.get(ArduinoVar, { led: val1 });
  {
    Connection: close;
  }
}
