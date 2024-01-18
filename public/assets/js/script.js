let escolherMeta = document.querySelector('#escolherMeta');
let valorMeta = document.querySelector('#valorMeta');
let valorAtual = document.querySelector('#valorAtual');
let prazoMeta = document.querySelector('#prazoMeta');

console.log(valorMeta.innerText);
console.log(valorAtual.innerText);
console.log(prazoMeta.innerText);

escolherMeta.addEventListener('change', (e) => {
  console.log(escolherMeta.value)
  window.location.href = escolherMeta.value;
})

function porcentagemMeta() {

  if (valorAtual.innerText == 'R$ 0,00') valorAtual.innerText = 1200;
  let resultado = (valorAtual.innerText * 100) / valorMeta.innerText;
  return resultado.toFixed(0);
}

let options = {
  series: [porcentagemMeta()],
  chart: {
    height: 400,
    background: 'transparent',
    type: 'radialBar',
  },
  theme: {
    mode: 'dark',
    palette: 'palette1',
    monochrome: {
      enabled: false,
      color: '#255aee',
      shadeTo: 'light',
      shadeIntensity: 0.65
    },
  },
  colors: ['#18dd70'],
  markers: {
    colors: ['#18dd70']
  },
  dataLabels: {
    style: {
      colors: ['#ffffff']
    }
  },
  plotOptions: {
    radialBar: {
      hollow: {
        size: '70%',
      }
    },
  },
  labels: ['Progresso'],
};

var chart = new ApexCharts(document.querySelector("#progress-chart"), options);
chart.render();

