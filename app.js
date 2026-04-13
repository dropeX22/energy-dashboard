async function getDataFromAPI() {
  const response = await fetch("http://127.0.0.1:5000/energy");
  return await response.json();
}
async function fakeAPI() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        value: Math.floor(Math.random() * 30) + 10
      });
    }, 500); // simula retraso de red
  });
}

function getAverage(arr) {
  const sum = arr.reduce((a, b) => a + b, 0);
  return sum / arr.length;
}

const ctx = document.getElementById('energyChart').getContext('2d');

let data = [10, 20, 15, 30, 25, 40];
let labels = ["1pm", "2pm", "3pm", "4pm", "5pm", "6pm"];

const chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: labels,
    datasets: [{
      label: 'Consumo (kWh)',
      data: data,
      borderColor: 'lime',
      borderWidth: 2
    }]
  }
});

const avgCtx = document.getElementById('avgChart').getContext('2d');

const avgChart = new Chart(avgCtx, {
  type: 'bar',
  data: {
    labels: ['Promedio'],
    datasets: [{
      label: 'Consumo promedio',
      data: [getAverage(data)],
      borderWidth: 2
    }]
  }
});

let running = true;

document.getElementById("toggleBtn").addEventListener("click", () => {
  running = !running;
  document.getElementById("toggleBtn").textContent = running ? "Pausar" : "Reanudar";
});

setInterval(async () => {

  if (!running) return;

  const apiData = await getDataFromAPI();

  if (apiData.length === 0) return;

  const newValue = apiData[apiData.length - 1].value;

  data.push(newValue);
  labels.push(new Date().toLocaleTimeString().slice(0,5));

  if (data.length > 10) {
    data.shift();
    labels.shift();
  }

  const alertBox = document.getElementById("alert");

  if (newValue > 30) {
    alertBox.textContent = "⚠️ Consumo alto detectado!";
  } else {
    alertBox.textContent = "";
  }

  avgChart.data.datasets[0].data = [getAverage(data)];
  avgChart.update();

  chart.update();

}, 2000);