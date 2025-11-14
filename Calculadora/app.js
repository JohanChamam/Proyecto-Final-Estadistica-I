// para el factorial
function factorial(n) {
  if (n < 0) return NaN;
  if (n === 0 || n === 1) return 1;
  let f = 1;
  for (let i = 2; i <= n; i++) {
    f *= i;
  }
  return f;
}

// permutaciones
function calcularPermutaciones() {
  const n = parseInt(document.getElementById("perm-n").value);

  if (isNaN(n) || n < 0) {
    document.getElementById("perm-resultado").textContent =
      "Por favor ingresa un valor de n válido (entero mayor o igual a 0).";
    return;
  }

  const resultado = factorial(n);
  document.getElementById("perm-resultado").textContent =
    `P(${n}) = ${resultado.toLocaleString("es-GT")} formas posibles de ordenar ${n} elementos.`;
}

// permutacion con r
function calcularPermutacionesR() {
  const n = parseInt(document.getElementById("perm-r-n").value);
  const r = parseInt(document.getElementById("perm-r-r").value);

  if ([n, r].some(v => isNaN(v)) || n < 0 || r < 0) {
    document.getElementById("perm-r-resultado").textContent =
      "Ingresa valores enteros válidos para n y r (mayores o iguales a 0).";
    return;
  }

  if (r > n) {
    document.getElementById("perm-r-resultado").textContent =
      "r no puede ser mayor que n.";
    return;
  }

  const resultado = factorial(n) / factorial(n - r);
  document.getElementById("perm-r-resultado").textContent =
    `P(${n}, ${r}) = ${resultado.toLocaleString("es-GT")} permutaciones de ${r} elementos tomados de ${n}.`;
}

// combinacion
function calcularCombinaciones() {
  const n = parseInt(document.getElementById("comb-n").value);
  const r = parseInt(document.getElementById("comb-r").value);

  if ([n, r].some(v => isNaN(v)) || n < 0 || r < 0) {
    document.getElementById("comb-resultado").textContent =
      "Ingresa valores enteros válidos para n y r (mayores o iguales a 0).";
    return;
  }

  if (r > n) {
    document.getElementById("comb-resultado").textContent =
      "r no puede ser mayor que n.";
    return;
  }

  const resultado = factorial(n) / (factorial(r) * factorial(n - r));
  document.getElementById("comb-resultado").textContent =
    `C(${n}, ${r}) = ${resultado.toLocaleString("es-GT")} combinaciones posibles.`;
}

// probabilidad basica
function calcularProbabilidadBasica() {
  const fav = parseInt(document.getElementById("fav").value);
  const pos = parseInt(document.getElementById("pos").value);
  const salida = document.getElementById("prob-basica-resultado");

  if (isNaN(fav) || isNaN(pos) || fav < 0 || pos <= 0 || fav > pos) {
    salida.textContent = "Ingresa valores válidos: 0 ≤ favorables ≤ posibles, posibles > 0.";
    return;
  }

  const p = fav / pos;
  salida.textContent =
    `P(A) = ${p.toFixed(4)} (${(p * 100).toFixed(2)}%). ` +
    `Interpretación: la probabilidad de que ocurra A es de ${(p * 100).toFixed(2)}%.`;
}

// regla de la suma con eventos excluyentes
function calcularSumaExcluyentesCasos() {
  const favA = parseInt(document.getElementById("favA").value);
  const posA = parseInt(document.getElementById("posA").value);
  const favB = parseInt(document.getElementById("favB").value);
  const posB = parseInt(document.getElementById("posB").value);
  const salida = document.getElementById("suma-excl-resultado");

  // validaciones
  if (
    [favA, posA, favB, posB].some(v => isNaN(v)) ||
    favA < 0 || favB < 0 ||
    posA <= 0 || posB <= 0 ||
    favA > posA || favB > posB
  ) {
    salida.textContent =
      "Ingresa valores válidos: 0 ≤ casos favorables ≤ casos posibles y casos posibles > 0.";
    return;
  }

  // calculos
  const pA = favA / posA;
const pB = favB / posB;
const pUnion = pA + pB; 

let mensaje =
  `P(A) = ${pA.toFixed(4)} (${(pA * 100).toFixed(2)}%)<br>` +
  `P(B) = ${pB.toFixed(4)} (${(pB * 100).toFixed(2)}%)<br>` +
  `P(A o B) = P(A) + P(B) = ${pUnion.toFixed(4)} (${(pUnion * 100).toFixed(2)}%)<br><br>`;

// interpretación 
if (pUnion === 1) {
  mensaje += `Interpretación: los eventos A y B cubren todos los posibles resultados, ` +
              `por lo tanto, ocurrirá alguno de ellos el 100 % de las veces.`;
} else if (pUnion === 0) {
  mensaje += `Interpretación: ninguno de los eventos tiene posibilidad de ocurrir.`;
} else {
  mensaje += `Interpretación: hay una probabilidad del ${(pUnion * 100).toFixed(2)} % ` +
              `de que ocurra A o B.`;
}

// advertencia
if (pUnion > 1) {
  mensaje += `<br><br><strong>⚠ Aviso:</strong> para eventos excluyentes, ` +
             `P(A o B) no debería ser mayor que 1. Revisa los datos ingresados.`;
}

// resultado
salida.innerHTML = mensaje;
}

// no excluyentes
function calcularSumaNoExcluyentesCasos() {
  const N     = parseInt(document.getElementById("noexcl-N").value);
  const favA  = parseInt(document.getElementById("noexcl-favA").value);
  const favB  = parseInt(document.getElementById("noexcl-favB").value);
  const favAB = parseInt(document.getElementById("noexcl-favAB").value);
  const salida = document.getElementById("suma-noexcl-resultado");

  // validacion
  if ([N, favA, favB, favAB].some(v => isNaN(v))) {
    salida.textContent = "Ingresa valores numéricos válidos para todos los campos.";
    return;
  }

  if (N <= 0) {
    salida.textContent = "N (casos posibles) debe ser mayor que 0.";
    return;
  }

  if (favA < 0 || favB < 0 || favAB < 0 ||
      favA > N || favB > N || favAB > N) {
    salida.textContent = "Los casos favorables deben estar entre 0 y N.";
    return;
  }

  if (favAB > favA || favAB > favB) {
    salida.textContent =
      "La intersección A ∩ B no puede tener más casos que A o que B por separado.";
    return;
  }

  // calculo
  const pA  = favA  / N;
  const pB  = favB  / N;
  const pAB = favAB / N;
  const pUnion = pA + pB - pAB;

  let mensaje =
    `P(A) = ${pA.toFixed(4)} (${(pA * 100).toFixed(2)}%)<br>` +
    `P(B) = ${pB.toFixed(4)} (${(pB * 100).toFixed(2)}%)<br>` +
    `P(A ∩ B) = ${pAB.toFixed(4)} (${(pAB * 100).toFixed(2)}%)<br>` +
    `P(A o B) = P(A) + P(B) − P(A ∩ B) = ${pUnion.toFixed(4)} ` +
    `(${(pUnion * 100).toFixed(2)}%)<br><br>`;

  // interpretacion
  if (pUnion === 1) {
    mensaje += `Interpretación: con estos datos, siempre ocurrirá A o B (100 % de probabilidad).`;
  } else if (pUnion === 0) {
    mensaje += `Interpretación: con estos datos, nunca ocurre A ni B.`;
  } else {
    mensaje += `Interpretación: hay una probabilidad del ${(pUnion * 100).toFixed(2)} % ` +
               `de que ocurra A o B.`;
  }

  // cuadro de advertencia
  if (pUnion > 1) {
    mensaje += `<br><br><strong>⚠ Aviso:</strong> el valor de P(A o B) es mayor que 1. ` +
               `Revisa los datos ingresados; puede haber un conteo incorrecto.`;
  }

  salida.innerHTML = mensaje;
}

// regla del producto con eventos dependientes
function calcularProductoDependienteCasos() {
  const N      = parseInt(document.getElementById("dep-N").value);
  const favA   = parseInt(document.getElementById("dep-favA").value);
  const favAB  = parseInt(document.getElementById("dep-favAB").value);
  const salida = document.getElementById("prod-resultado");

  // validacion
  if ([N, favA, favAB].some(v => isNaN(v))) {
    salida.textContent = "Ingresa valores numéricos válidos para todos los campos.";
    return;
  }

  if (N <= 0) {
    salida.textContent = "N (casos posibles) debe ser mayor que 0.";
    return;
  }

  if (favA < 0 || favAB < 0 || favA > N || favAB > N) {
    salida.textContent = "Los casos favorables deben estar entre 0 y N.";
    return;
  }

  if (favAB > favA) {
    salida.textContent = "La intersección A ∩ B no puede tener más casos que A.";
    return;
  }

  // calculo 
  const pA   = favA  / N;
  const pAB  = favAB / N;
  const pB_dado_A = favAB / favA;      // probabilidad de b si ya paso a
  const pProd = pA * pB_dado_A;        // ab

  let mensaje =
    `P(A) = ${pA.toFixed(4)} (${(pA * 100).toFixed(2)}%)<br>` +
    `P(B | A) = ${pB_dado_A.toFixed(4)} (${(pB_dado_A * 100).toFixed(2)}%)<br>` +
    `P(A ∩ B) = ${pAB.toFixed(4)} (${(pAB * 100).toFixed(2)}%)<br>` +
    `P(A ∩ B) = P(A) · P(B | A) = ${pProd.toFixed(4)} ` +
    `(${(pProd * 100).toFixed(2)}%)<br><br>`;

  // interpretacion
  if (pProd === 0) {
    mensaje += "Interpretación: Nunca ocurren A y B al mismo tiempo.";
  } else if (pProd === 1) {
    mensaje += "Siempre ocurren A y B juntos (100 % de probabilidad).";
  } else {
    mensaje += `Interpretación: Hay una probabilidad del ${(pProd * 100).toFixed(2)} % ` +
               `de que ocurran A y B a la vez.`;
  }

  // cuadro de advertencia
  if (Math.abs(pProd - pAB) > 0.0001) {
    mensaje += `<br><br><strong>⚠ Aviso:</strong> el valor obtenido por la regla del producto ` +
               `no coincide exactamente con el obtenido por conteo directo. Revisa los datos.`;
  }

  salida.innerHTML = mensaje;
}

// eventos independientes
function calcularIndependientesCasos() {
  const N      = parseInt(document.getElementById("indep-N").value);
  const favA   = parseInt(document.getElementById("indep-favA").value);
  const favB   = parseInt(document.getElementById("indep-favB").value);
  const salida = document.getElementById("indep-resultado");

  if ([N, favA, favB].some(v => isNaN(v))) {
    salida.textContent = "Ingresa valores numéricos válidos para todos los campos.";
    return;
  }

  if (N <= 0) {
    salida.textContent = "N (casos posibles) debe ser mayor que 0.";
    return;
  }

  if (favA < 0 || favB < 0 || favA > N || favB > N) {
    salida.textContent = "Los casos favorables deben estar entre 0 y N.";
    return;
  }

  const pA = favA / N;
  const pB = favB / N;
  const pAB = pA * pB; // aqui es por independecia

  let mensaje =
    `P(A) = ${pA.toFixed(4)} (${(pA * 100).toFixed(2)}%)<br>` +
    `P(B) = ${pB.toFixed(4)} (${(pB * 100).toFixed(2)}%)<br>` +
    `P(A y B) = P(A) · P(B) = ${pAB.toFixed(4)} (${(pAB * 100).toFixed(2)}%)<br><br>`;

  if (pAB === 0) {
    mensaje += "Interpretación: Nunca ocurren A y B al mismo tiempo.";
  } else if (pAB === 1) {
    mensaje += "Interpretación: Siempre ocurren A y B juntos (100 % de probabilidad).";
  } else {
    mensaje += `Interpretación: Hay una probabilidad del ${(pAB * 100).toFixed(2)} % ` +
               `de que ocurran A y B al mismo tiempo.`;
  }

  salida.innerHTML = mensaje;
}
// calcular el complemento
function calcularComplementoCasos() {
  const N      = parseInt(document.getElementById("compl-N").value);
  const favA   = parseInt(document.getElementById("compl-favA").value);
  const salida = document.getElementById("compl-resultado");

  if ([N, favA].some(v => isNaN(v))) {
    salida.textContent = "Ingresa valores numéricos válidos para N y los casos favorables de A.";
    return;
  }

  if (N <= 0) {
    salida.textContent = "N (casos posibles) debe ser mayor que 0.";
    return;
  }

  if (favA < 0 || favA > N) {
    salida.textContent = "Los casos favorables de A deben estar entre 0 y N.";
    return;
  }

  const pA = favA / N;
  const pCompl = 1 - pA;

  let mensaje =
    `P(A) = ${pA.toFixed(4)} (${(pA * 100).toFixed(2)}%)<br>` +
    `P(A') = 1 − P(A) = ${pCompl.toFixed(4)} (${(pCompl * 100).toFixed(2)}%)<br><br>` +
    `Interpretación: Hay una probabilidad del ${(pCompl * 100).toFixed(2)} % ` +
    `de que <strong>no</strong> ocurra el evento A.`;

  salida.innerHTML = mensaje;
}

// probabilidad condicional

// P(B|A)
function calcularProbCondicionalCasos() {
  const N     = parseInt(document.getElementById("cond-N").value);
  const favA  = parseInt(document.getElementById("cond-favA").value);
  const favAB = parseInt(document.getElementById("cond-favAB").value);
  const salida = document.getElementById("cond-resultado");

  if ([N, favA, favAB].some(v => isNaN(v))) {
    salida.textContent = "Ingresa valores numéricos válidos para N, casos de A y casos de A ∩ B.";
    return;
  }

  if (N <= 0) {
    salida.textContent = "N (casos posibles) debe ser mayor que 0.";
    return;
  }

  if (favA < 0 || favAB < 0 || favA > N || favAB > N) {
    salida.textContent = "Los casos favorables deben estar entre 0 y N";
    return;
  }

  if (favAB > favA) {
    salida.textContent = "Los casos de A ∩ B no pueden ser más que los casos de A";
    return;
  }

  if (favA === 0) {
    salida.textContent = "No se puede calcular P(B | A) si nunca ocurre A (casos de A = 0)";
    return;
  }

  const pA  = favA  / N;
  const pAB = favAB / N;
  const pB_dado_A = pAB / pA; 

  let mensaje =
    `P(A) = ${pA.toFixed(4)} (${(pA * 100).toFixed(2)}%)<br>` +
    `P(A ∩ B) = ${pAB.toFixed(4)} (${(pAB * 100).toFixed(2)}%)<br>` +
    `P(B | A) = P(A ∩ B) / P(A) = ${pB_dado_A.toFixed(4)} ` +
    `(${(pB_dado_A * 100).toFixed(2)}%)<br><br>` +
    `Interpretación: entre los casos donde ocurre A, aproximadamente ` +
    `${(pB_dado_A * 100).toFixed(2)} % también presentan B.`;

  salida.innerHTML = mensaje;
}


// diferenciacion
function analizarDependenciaCasos() {
  const N     = parseInt(document.getElementById("dep2-N").value);
  const favA  = parseInt(document.getElementById("dep2-favA").value);
  const favB  = parseInt(document.getElementById("dep2-favB").value);
  const favAB = parseInt(document.getElementById("dep2-favAB").value);
  const salida = document.getElementById("dep2-resultado");

  if ([N, favA, favB, favAB].some(v => isNaN(v))) {
    salida.textContent = "Ingresa valores numéricos válidos para todos los campos.";
    return;
  }

  if (N <= 0) {
    salida.textContent = "N (casos posibles) debe ser mayor que 0.";
    return;
  }

  if (favA < 0 || favB < 0 || favAB < 0 ||
      favA > N || favB > N || favAB > N) {
    salida.textContent = "Los casos favorables deben estar entre 0 y N.";
    return;
  }

  if (favAB > favA || favAB > favB) {
    salida.textContent =
      "Los casos de A ∩ B no pueden ser más que los casos de A o de B por separado.";
    return;
  }

  if (favA === 0) {
    salida.textContent = "No se puede calcular P(B | A) si nunca ocurre A (casos de A = 0).";
    return;
  }

  const pB      = favB  / N;
  const pB_dado_A = favAB / favA;
  const diff    = Math.abs(pB_dado_A - pB);

  const pB_pct      = (pB * 100).toFixed(2);
  const pB_dado_A_pct = (pB_dado_A * 100).toFixed(2);

  let mensaje =
    `P(B) = ${pB.toFixed(4)} (${pB_pct}%)<br>` +
    `P(B | A) = ${pB_dado_A.toFixed(4)} (${pB_dado_A_pct}%)<br>` +
    `Diferencia absoluta: ${diff.toFixed(4)}<br><br>`;

  const umbral = 0.01; 

  if (diff <= umbral) {
    mensaje +=
      `Conclusión: Como P(B | A) es muy similar a P(B), los eventos A y B ` +
      `se pueden considerar <strong>aproximadamente independientes</strong>.`;
  } else {
    mensaje +=
      `Conclusión: Como P(B | A) es diferente de P(B), los eventos A y B ` +
      `se consideran <strong>dependientes</strong>.`;
  }

  mensaje += `<br><br>Interpretación: Si conocer que ocurre A cambia (o casi no cambia) ` +
             `la probabilidad de B, entonces hay dependencia (o independencia) entre los eventos.`;

  salida.innerHTML = mensaje;
}
// bayes
function calcularBayes() {
  const pA           = parseFloat(document.getElementById("bayes-PA").value);
  const pB_dado_A    = parseFloat(document.getElementById("bayes-PB_dado_A").value);
  const pB_dado_notA = parseFloat(document.getElementById("bayes-PB_dado_notA").value);
  const salida       = document.getElementById("bayes-resultado");

  // validacion
  if ([pA, pB_dado_A, pB_dado_notA].some(v => isNaN(v))) {
    salida.textContent = "Ingresa valores numéricos válidos para todas las probabilidades.";
    return;
  }

  if ([pA, pB_dado_A, pB_dado_notA].some(v => v < 0 || v > 1)) {
    salida.textContent = "Todas las probabilidades deben estar entre 0 y 1.";
    return;
  }

  // llenar campos que el problema no me dice
  const pNotA           = 1 - pA;
  const pNotB_dado_A    = 1 - pB_dado_A;
  const pNotB_dado_notA = 1 - pB_dado_notA;

  // ramas para el arbol
  const pAB         = pA    * pB_dado_A;       
  const pA_notB     = pA    * pNotB_dado_A;    
  const pNotA_B     = pNotA * pB_dado_notA;    
  const pNotA_notB  = pNotA * pNotB_dado_notA; 

  // probabilidad total
  const pB_total    = pAB + pNotA_B;

  if (pB_total === 0) {
    salida.textContent = "No se puede calcular P(A|B) si la probabilidad total de B es 0.";
    return;
  }

  // calculo
  const pA_dado_B    = pAB / pB_total;
  const pNotA_dado_B = 1 - pA_dado_B;

  let mensaje =
    `Probabilidad Total = ${pB_total.toFixed(4)} (${(pB_total * 100).toFixed(2)}%)<br>` +
    `P(A | B) = ${pA_dado_B.toFixed(4)} (${(pA_dado_B * 100).toFixed(2)}%)<br>` +
    `Interpretación: La probabilidad ` +
    `de que el caso pertenezca a la rama A es de ${(pA_dado_B * 100).toFixed(2)} %.`;

  salida.innerHTML = mensaje;

  // para el arbol
  const tree = document.getElementById("bayes-tree");
  if (tree) {
    document.getElementById("tree-PA").textContent =
      `P(A) = ${pA.toFixed(3)} (${(pA * 100).toFixed(1)}%)`;
    document.getElementById("tree-PnotA").textContent =
      `P(¬A) = ${pNotA.toFixed(3)} (${(pNotA * 100).toFixed(1)}%)`;

    document.getElementById("tree-PB_given_A").textContent =
      `P(B|A) = ${pB_dado_A.toFixed(3)}`;
    document.getElementById("tree-PnotB_given_A").textContent =
      `P(¬B|A) = ${pNotB_dado_A.toFixed(3)}`;

    document.getElementById("tree-PB_given_notA").textContent =
      `P(B|¬A) = ${pB_dado_notA.toFixed(3)}`;
    document.getElementById("tree-PnotB_given_notA").textContent =
      `P(¬B|¬A) = ${pNotB_dado_notA.toFixed(3)}`;

    document.getElementById("tree-PAB").textContent =
      `P(A ∧ B) = ${pAB.toFixed(3)}`;
    document.getElementById("tree-PA_notB").textContent =
      `P(A ∧ ¬B) = ${pA_notB.toFixed(3)}`;
    document.getElementById("tree-PnotA_B").textContent =
      `P(¬A ∧ B) = ${pNotA_B.toFixed(3)}`;
    document.getElementById("tree-PnotA_notB").textContent =
      `P(¬A ∧ ¬B) = ${pNotA_notB.toFixed(3)}`;

    tree.style.display = "block";
  }
}

const factCache = {0:1, 1:1};
function fact(n){
  if (n < 0) return NaN;
  if (factCache[n] !== undefined) return factCache[n];
  let r = factCache[Object.keys(factCache).length-1] || 1;
  for (let i = Object.keys(factCache).length; i <= n; i++){
    r *= i;
    factCache[i] = r;
  }
  return factCache[n];
}
function comb(n,k){
  if (k < 0 || k > n) return 0;
  k = Math.min(k, n-k);
  let num = 1, den = 1;
  for (let i=1;i<=k;i++){ num *= (n - (k - i)); den *= i; }
  return num/den;
}

function binomialPMF(n, k, p){
  if (k<0 || k>n) return 0;
  return comb(n,k) * Math.pow(p,k) * Math.pow(1-p, n-k);
}
function negbinPMF_rthSuccessAtX(r, x, p){
  if (x < r) return 0;
  return comb(x-1, r-1) * Math.pow(p,r) * Math.pow(1-p, x-r);
}
function poissonPMF(lambda, k){
  if (k<0) return 0;
  return Math.exp(-lambda) * Math.pow(lambda, k) / fact(k);
}

/* ===== chart ===== */
let charts = {};
function drawBars(canvasId, labels, data, title){
  if (charts[canvasId]) charts[canvasId].destroy();
  const ctx = document.getElementById(canvasId);
  charts[canvasId] = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: title,
        data,
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true, ticks: { callback: v => v.toFixed(2) } }
      },
      plugins: {
        legend: { display:false },
        tooltip: {
          callbacks: { label: ctx => `P = ${(+ctx.raw).toFixed(4)}` }
        }
      }
    }
  });
  const opts = {
    responsive: true,
    plugins: {
        legend: { display: false }
    },
    scales: {
        x: { title: { display: true, text: 'x' } },
        y: { title: { display: true, text: 'P(X = x)' } }
    },

    animation: {
        duration: 800,
        easing: 'easeOutQuart',
        delay: ctx => ctx.dataIndex * 40
    },
    animations: {
        y: {
            from: 0,        
            duration: 800,
            easing: 'easeOutQuart'
        }
    }
};

}

function binomialPMF(n, x, p) {
  if (x < 0 || x > n) return 0;
  return comb(n, x) * Math.pow(p, x) * Math.pow(1 - p, n - x);
}
function binomialCDF_LE(n, p, x) {
  let s = 0;
  for (let k = 0; k <= x; k++) s += binomialPMF(n, k, p);
  return s;
}
function binomialTail_GE(n, p, x) {
  if (x <= 0) return 1;
  return 1 - binomialCDF_LE(n, p, x - 1);
}

/* ===== binomial ===== */
function calcBinomial(){
  const n  = parseInt(document.getElementById('binom-n').value, 10);
  const p  = toNumber(document.getElementById('binom-p').value);
  const x  = parseInt(document.getElementById('binom-k').value, 10);
  const md = document.getElementById('binom-mode').value;

  const out = document.getElementById('binom-res');
  const tip = document.getElementById('binom-interp');

  // Vvalidaciones
  if (Number.isNaN(n) || Number.isNaN(p) || Number.isNaN(x)) {
    out.innerHTML = 'Completa <b>n</b>, <b>p</b> y <b>x</b>.'; tip.textContent=''; return;
  }
  if (!(p >= 0 && p <= 1) || n < 0 || x < 0 || x > n) {
    out.innerHTML = 'Verifica: 0 ≤ p ≤ 1 y 0 ≤ x ≤ n.'; tip.textContent=''; return;
  }

  const labels = [];
  const probs  = [];
  for (let k = 0; k <= n; k++) {
    labels.push(String(k));
    probs.push(binomialPMF(n, k, p));
  }

  let prob, label;
  if (md === 'exact') {
    prob = binomialPMF(n, x, p);
    label = `P(X = ${x})`;
  } else if (md === 'atleast') {
    prob = binomialTail_GE(n, p, x);     
    label = `P(X ≥ ${x})`;
  } else {
    prob = binomialCDF_LE(n, p, x);      
    label = `P(X ≤ ${x})`;
  }

  out.innerHTML = `${label} = <b>${prob.toFixed(5)}</b> (${(prob*100).toFixed(2)}%)`;

  const esperados = (n * p).toFixed(2);
  const modoTxt = (md === 'exact') ? 'exactamente' : (md === 'atleast' ? 'al menos' : 'a lo sumo');
  tip.textContent =
    `Con p = ${p}, en ${n} ensayos la probabilidad de obtener ${modoTxt} ${x} ` +
    `${x===1?'éxito':'éxitos'} es ${(prob*100).toFixed(2)} %. ` +
    `En promedio se esperan ${esperados} ${(+esperados===1?'éxito':'éxitos')}.`;

  drawBars('binomChart', labels, probs, `Binomial n=${n}, p=${p}`);
}

/* ===== negativa ===== */
// decimales
function toNumber(v) {
  return parseFloat(String(v).replace(',', '.'));
}

// combinatoria
function comb(n, k) {
  if (k < 0 || k > n) return 0;
  k = Math.min(k, n - k);
  let num = 1, den = 1;
  for (let i = 1; i <= k; i++) { num *= (n - k + i); den *= i; }
  return num / den;
}

function negbinPMF_rthSuccessAtX(r, x, p) {
  if (x < r) return 0;
  return comb(x - 1, r - 1) * Math.pow(p, r) * Math.pow(1 - p, x - r);
}

function calcNegBin() {
  const r  = parseInt(document.getElementById('negb-r').value, 10);
  const p  = toNumber(document.getElementById('negb-p').value); // acepta coma
  let   x0 = parseInt(document.getElementById('negb-x').value, 10);

  const out = document.getElementById('negb-res');

  // validaciones
  if (Number.isNaN(r) || Number.isNaN(p) || Number.isNaN(x0)) {
    out.innerHTML = 'Completa <b>r</b>, <b>p</b> y <b>x</b>.';
    return;
  }
  if (!(p > 0 && p < 1)) {
    out.innerHTML = 'p debe estar entre 0 y 1. Usa punto decimal, ej. 0.2';
    return;
  }
  if (x0 < r) {
    out.innerHTML = `x debe ser ≥ r. (Ajustado de ${x0} a ${r})`;
    x0 = r;
  }

  const labels = [];
  const probs  = [];
  let x = r, safety = 0;
  while (safety < 200) {
    const pmf = negbinPMF_rthSuccessAtX(r, x, p);
    labels.push(String(x));
    probs.push(pmf);
    safety++;

    if (x > Math.max(r + 10, r + Math.ceil(6 * (1 - p) / Math.max(p, 1e-6))) && pmf < 1e-6) break;
    x++;
  }

  const px = negbinPMF_rthSuccessAtX(r, x0, p);
  out.innerHTML =
    `P(X = <b>${x0}</b>) = <b>${px.toFixed(5)}</b> (${(px * 100).toFixed(2)}%)<br>`
  drawBars('negbChart', labels, probs, 'Binomial negativa (r-ésimo éxito)');
}

/* ===== poson ===== */
function calcPoisson() {
  const lambda = parseFloat(document.getElementById('pois-l').value);
  const k0 = parseInt(document.getElementById('pois-k').value, 10);
  const mode = document.getElementById('pois-mode').value;

  const out = document.getElementById('pois-res');

  // validaciones
  if (!(lambda >= 0) || !Number.isFinite(lambda) || !Number.isInteger(k0) || k0 < 0) {
    out.innerHTML = 'Ingresa valores válidos: λ ≥ 0 y k entero ≥ 0.';
    return;
  }

  // rango pa la grafica
  const kMax = Math.max(k0, Math.ceil(lambda + 4 * Math.sqrt(lambda)));
  const labels = [];
  const probs  = [];

  for (let k = 0; k <= kMax; k++) {
    labels.push(String(k));
    probs.push(poissonPMF(lambda, k));
  }

  // calculo segun el contexto
  let px = 0;
  if (mode === 'exact') {
    px = poissonPMF(lambda, k0);
  } else if (mode === 'atmost') {
    for (let k = 0; k <= k0; k++) px += poissonPMF(lambda, k);           
  } else { 
    let cdfLess = 0; for (let k = 0; k < k0; k++) cdfLess += poissonPMF(lambda, k);
    px = 1 - cdfLess;                                                    
  }

  const pct = (px * 100).toFixed(2);
  const labelMode = (mode === 'exact') ? `X = ${k0}` :
                    (mode === 'atmost') ? `X ≤ ${k0}` : `X ≥ ${k0}`;

  out.innerHTML =
    `P(${labelMode}) = <b>${px.toFixed(4)}</b> (${pct}%)<br>` +
    `Media = <b>${lambda.toFixed(2)}</b>` +
    `Interpretación: con tasa media λ = ${lambda}, la probabilidad de observar ${labelMode.replace('X', '')} eventos en el intervalo es ${pct}%.`;

  drawBars('poisChart', labels, probs, 'Poisson');
}

// calculos
window.addEventListener('DOMContentLoaded', ()=>{
  calcBinomial();
  calcNegBin();
  calcPoisson();
});

function linspace(x0, x1, n) {
  const xs = [];
  const h = (x1 - x0) / (n - 1);
  for (let i = 0; i < n; i++) xs.push(x0 + i * h);
  return xs;
}

// chart
const _charts = {};
function drawDensity(canvasId, xs, ys, shadeRanges = []) {
  const ctx = document.getElementById(canvasId).getContext('2d');

  // para el sombreado
  const shadeData = xs.map((x, i) => {
    const y = ys[i];
    const inside = shadeRanges.some(r => {
      const lo = Math.min(r.from, r.to ?? r.from);
      const hi = Math.max(r.from, r.to ?? r.from);
      return x >= lo && x <= hi;
    });
    return inside ? y : null;
  });

  const data = {
    labels: xs,
    datasets: [
      { type: 'line', label: 'densidad', data: ys, borderWidth: 2, fill: false, tension: 0.15 },
      { type: 'line', label: 'área', data: shadeData, fill: 'origin', pointRadius: 0, borderWidth: 0 }
    ]
  };

  const opts = {
    responsive: true,
    plugins: {
        legend: { display: false }
    },
    scales: {
        x: { title: { display: true, text: 'x' } },
        y: { title: { display: true, text: 'f(x)' } }
    },

    // ⬇⬇⬇ NUEVO: animación
    animation: {
        duration: 900,
        easing: 'easeOutQuart'
    },
    animations: {
        y: {
            from: 0,
            duration: 900,
            easing: 'easeOutQuart'
        }
    }
};

  if (_charts[canvasId]) { _charts[canvasId].destroy(); }
  _charts[canvasId] = new Chart(ctx, { data, options: opts });
}

//exponencial
function expPDF(l, x){ return x < 0 ? 0 : l * Math.exp(-l*x); }
function expCDF(l, x){ return x < 0 ? 0 : 1 - Math.exp(-l*x); }

function _getLambdaFromUI(){
  const lStr = document.getElementById('exp-l').value.trim();
  const muStr = document.getElementById('exp-mu').value.trim();
  let l = parseFloat(lStr);
  if (!(l > 0) && muStr !== '') {
    const mu = parseFloat(muStr);
    if (mu > 0) l = 1/mu;
  }
  return l;
}

function calcExponencial(){
  const l = _getLambdaFromUI();
  const mode = document.getElementById('exp-mode').value;
  const a = parseFloat(document.getElementById('exp-a').value);
  const b = parseFloat(document.getElementById('exp-b').value);

  const resEl = document.getElementById('exp-res');

  if (!(l > 0)) { resEl.textContent = 'Ingresa λ>0 o μ>0.'; return; }

  let prob = 0, texto = '';
  if (mode === 'lt') {
    if (!(a >= 0)) { resEl.textContent = 'Ingresa x≥0.'; return; }
    prob = expCDF(l, a);
    texto = `P(X < ${a}) = ${prob.toFixed(4)} (${(prob*100).toFixed(2)}%).`;
  } else if (mode === 'gt') {
    if (!(a >= 0)) { resEl.textContent = 'Ingresa x≥0.'; return; }
    prob = 1 - expCDF(l, a);
    texto = `P(X > ${a}) = ${prob.toFixed(4)} (${(prob*100).toFixed(2)}%).`;
  } else {
    if (!(a >= 0 && b >= 0 && b > a)) { resEl.textContent = 'Ingresa 0 ≤ a < b.'; return; }
    prob = expCDF(l, b) - expCDF(l, a);
    texto = `P(${a} < X < ${b}) = ${prob.toFixed(4)} (${(prob*100).toFixed(2)}%).`;
  }

  let media = null;

  // Si el usuario llenó λ → media = λ
  if (document.getElementById('exp-l').value.trim() !== "") {
      media = parseFloat(document.getElementById('exp-l').value);
  }

  // Si el usuario llenó μ → media = 1 / μ
  else if (document.getElementById('exp-mu').value.trim() !== "") {
      const muInput = parseFloat(document.getElementById('exp-mu').value);
      media = 1 / muInput;
  }

  resEl.innerHTML = `${texto}<br>Media = <b>${media.toFixed(4)}</b>.`;
  // λ real para gráfica = el valor que se usó en los cálculos
  const lambdaFinal = media; // porque media = λ o media = 1/μ
  // grafic
  const xMax = Math.max(b || a || media, media) * 6;;
  const xs = linspace(0, xMax, 300);
  const ys = xs.map(x => expPDF(lambdaFinal, x));
  let shade = [];
  if (mode === 'lt') shade = [{from: 0, to: a}];
  else if (mode === 'gt') shade = [{from: a, to: xMax}];
  else shade = [{from: a, to: b}];

  drawDensity('expChart', xs, ys, shade);
}

//normal
function normalPDF(x, mu, sig){
  const z = (x - mu)/sig;
  return (1/(sig*Math.sqrt(2*Math.PI))) * Math.exp(-0.5*z*z);
}
function erf(x){
  const sign = x < 0 ? -1 : 1;
  const a1=0.254829592, a2=-0.284496736, a3=1.421413741, a4=-1.453152027, a5=1.061405429, p=0.3275911;
  const t = 1/(1+p*Math.abs(x));
  const y = 1 - (((((a5*t + a4)*t) + a3)*t + a2)*t + a1)*t*Math.exp(-x*x);
  return sign*y;
}
function normalCDF(x, mu, sig){
  return 0.5*(1 + erf((x-mu)/(sig*Math.SQRT2)));
}
function invNorm(p){
  if (p<=0 || p>=1) return NaN;
  const a=[-3.969683028665376e+01,2.209460984245205e+02,-2.759285104469687e+02,1.383577518672690e+02,-3.066479806614716e+01,2.506628277459239e+00];
  const b=[-5.447609879822406e+01,1.615858368580409e+02,-1.556989798598866e+02,6.680131188771972e+01,-1.328068155288572e+01];
  const c=[-7.784894002430293e-03,-3.223964580411365e-01,-2.400758277161838e+00,-2.549732539343734e+00,4.374664141464968e+00,2.938163982698783e+00];
  const d=[7.784695709041462e-03,3.224671290700398e-01,2.445134137142996e+00,3.754408661907416e+00];
  const plow=0.02425, phigh=1-plow;
  let q, r;
  if (p<plow){
    q=Math.sqrt(-2*Math.log(p));
    return (((((c[0]*q+c[1])*q+c[2])*q+c[3])*q+c[4])*q+c[5])/
           ((((d[0]*q+d[1])*q+d[2])*q+d[3])*q+1);
  } else if (p<=phigh){
    q=p-0.5; r=q*q;
    return (((((a[0]*r+a[1])*r+a[2])*r+a[3])*r+a[4])*r+a[5])*q/
           (((((b[0]*r+b[1])*r+b[2])*r+b[3])*r+b[4])*r+1);
  } else {
    q=Math.sqrt(-2*Math.log(1-p));
    return -(((((c[0]*q+c[1])*q+c[2])*q+c[3])*q+c[4])*q+c[5])/
             ((((d[0]*q+d[1])*q+d[2])*q+d[3])*q+1);
  }
}

function calcNormal(){
  const mu = parseFloat(document.getElementById('norm-mu').value);
  const sig = parseFloat(document.getElementById('norm-sig').value);
  const mode = document.getElementById('norm-mode').value;
  const aStr = document.getElementById('norm-a').value.trim();
  const bStr = document.getElementById('norm-b').value.trim();
  const pStr = document.getElementById('norm-p').value.trim();

  const resEl = document.getElementById('norm-res');
  const zEl  = document.getElementById('norm-z');

  if (!(sig > 0)) { resEl.textContent = 'σ debe ser > 0.'; return; }
  if (!Number.isFinite(mu)) { resEl.textContent = 'Ingresa μ.'; return; }

  let a = parseFloat(aStr), b = parseFloat(bStr), p = parseFloat(pStr);
  let prob = NaN, text = '', zs = '';

  if (mode === 'lt') {
    if (!Number.isFinite(a)) { resEl.textContent = 'Ingresa a.'; return; }
    prob = normalCDF(a, mu, sig);
    const z = ((a-mu)/sig);
    text = `P(X ≤ ${a}) = ${prob.toFixed(4)} (${(prob*100).toFixed(2)}%).`;

  } else if (mode === 'gt') {
    if (!Number.isFinite(a)) { resEl.textContent = 'Ingresa a.'; return; }
    const cdf = normalCDF(a, mu, sig);
    prob = 1 - cdf;
    const z = ((a-mu)/sig);
    text = `P(X ≥ ${a}) = ${prob.toFixed(4)} (${(prob*100).toFixed(2)}%).`;

  } else if (mode === 'between') {
    if (!(Number.isFinite(a) && Number.isFinite(b) && b > a)) { resEl.textContent = 'Ingresa a < b.'; return; }
    const p1 = normalCDF(a, mu, sig);
    const p2 = normalCDF(b, mu, sig);
    prob = p2 - p1;
    const z1 = ((a-mu)/sig), z2 = ((b-mu)/sig);
    text = `P(${a} ≤ X ≤ ${b}) = ${prob.toFixed(4)} (${(prob*100).toFixed(2)}%).`;

  } else if (mode === 'invLeft') {
    if (!(p>0 && p<1)) { resEl.textContent = 'Ingresa p en (0,1).'; return; }
    const z = invNorm(p);
    a = mu + sig*z;
    prob = p;
    text = `a = ${a.toFixed(4)} tal que P(X ≤ a) = ${p}.`;

  } else if (mode === 'invRight') {
    if (!(p>0 && p<1)) { resEl.textContent = 'Ingresa p en (0,1).'; return; }
    const z = invNorm(1 - p);
    a = mu + sig*z;
    prob = p;
    text = `a = ${a.toFixed(4)} tal que P(X ≥ a) = ${p}.`;
  }

  resEl.innerHTML = text;
  zEl.textContent  = zs;

  // grafica
  const x0 = mu - 4*sig, x1 = mu + 4*sig;
  const xs = linspace(x0, x1, 400);
  const ys = xs.map(x => normalPDF(x, mu, sig));

  let shade = [];
  if (mode === 'lt') shade = [{from: x0, to: a}];
  else if (mode === 'gt') shade = [{from: a, to: x1}];
  else if (mode === 'between') shade = [{from: a, to: b}];
  else if (mode === 'invLeft') shade = [{from: x0, to: a}];
  else if (mode === 'invRight') shade = [{from: a, to: x1}];

  drawDensity('normChart', xs, ys, shade);
}
