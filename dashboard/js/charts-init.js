/* ============================================
   Dashboard — Chart.js Initialization
   ============================================ */

function getChartColors() {
  const isDark = document.documentElement.classList.contains('dark');
  return {
    primary: isDark ? '#AAFFC7' : '#170C79',
    secondary: isDark ? '#67C090' : '#EFE3CA',
    accent: isDark ? '#215B63' : '#56B6C6',
    surface: isDark ? '#124170' : '#8ACBD0',
    text: isDark ? '#e2eaf2' : '#170C79',
    muted: isDark ? 'rgba(226,234,242,0.4)' : 'rgba(23,12,121,0.3)',
    grid: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(23,12,121,0.06)',
    bg1: isDark ? 'rgba(170,255,199,0.15)' : 'rgba(23,12,121,0.08)',
    bg2: isDark ? 'rgba(103,192,144,0.15)' : 'rgba(86,182,198,0.15)',
    palette: isDark
      ? ['#AAFFC7','#67C090','#5BB8D4','#8B5CF6','#F59E0B','#EC4899','#14B8A6']
      : ['#170C79','#56B6C6','#8ACBD0','#7C3AED','#F59E0B','#EC4899','#10B981'],
  };
}

function defaultChartOptions(title = '') {
  const c = getChartColors();
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: c.text, font: { family: 'Inter', size: 12 }, padding: 16, usePointStyle: true, pointStyleWidth: 8 } },
      title: title ? { display: true, text: title, color: c.text, font: { family: 'Outfit', size: 16, weight: 600 }, padding: { bottom: 16 } } : { display: false },
      tooltip: { backgroundColor: 'rgba(0,0,0,0.8)', titleFont: { family: 'Inter' }, bodyFont: { family: 'Inter' }, cornerRadius: 8, padding: 10 },
    },
    scales: {
      x: { ticks: { color: c.muted, font: { size: 11 } }, grid: { color: c.grid } },
      y: { ticks: { color: c.muted, font: { size: 11 } }, grid: { color: c.grid } },
    },
  };
}

// ── Create specific charts ──
function createLineChart(canvasId, labels, datasets, title) {
  const c = getChartColors();
  return new Chart(document.getElementById(canvasId), {
    type: 'line',
    data: { labels, datasets: datasets.map((ds, i) => ({
      ...ds, borderColor: c.palette[i], backgroundColor: i === 0 ? c.bg1 : c.bg2,
      tension: 0.4, fill: ds.fill ?? true, pointRadius: 3, pointBackgroundColor: c.palette[i], borderWidth: 2,
    }))},
    options: { ...defaultChartOptions(title) },
  });
}

function createBarChart(canvasId, labels, datasets, title, horizontal = false) {
  const c = getChartColors();
  return new Chart(document.getElementById(canvasId), {
    type: 'bar',
    data: { labels, datasets: datasets.map((ds, i) => ({
      ...ds, backgroundColor: ds.backgroundColor || c.palette.map(cl => cl + '66'),
      borderColor: ds.borderColor || c.palette, borderWidth: 1, borderRadius: 6,
    }))},
    options: { ...defaultChartOptions(title), indexAxis: horizontal ? 'y' : 'x' },
  });
}

function createPieChart(canvasId, labels, data, title) {
  const c = getChartColors();
  return new Chart(document.getElementById(canvasId), {
    type: 'pie',
    data: { labels, datasets: [{ data, backgroundColor: c.palette.map(cl => cl + '99'), borderColor: c.palette, borderWidth: 2 }] },
    options: { ...defaultChartOptions(title), scales: {} },
  });
}

function createDoughnutChart(canvasId, labels, data, title, centerText = '') {
  const c = getChartColors();
  const chart = new Chart(document.getElementById(canvasId), {
    type: 'doughnut',
    data: { labels, datasets: [{ data, backgroundColor: c.palette.map(cl => cl + '99'), borderColor: c.palette, borderWidth: 2 }] },
    options: { ...defaultChartOptions(title), scales: {}, cutout: '65%' },
    plugins: centerText ? [{
      id: 'centerText',
      beforeDraw(chart) {
        const { ctx, width, height } = chart;
        ctx.save();
        ctx.font = `bold 20px Outfit`;
        ctx.fillStyle = c.text;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(centerText, width / 2, height / 2);
        ctx.restore();
      }
    }] : [],
  });
  return chart;
}

function createRadarChart(canvasId, labels, datasets, title) {
  const c = getChartColors();
  return new Chart(document.getElementById(canvasId), {
    type: 'radar',
    data: { labels, datasets: datasets.map((ds, i) => ({
      ...ds, borderColor: c.palette[i], backgroundColor: c.palette[i] + '22',
      pointBackgroundColor: c.palette[i], borderWidth: 2,
    }))},
    options: {
      ...defaultChartOptions(title),
      scales: { r: { ticks: { color: c.muted, backdropColor: 'transparent' }, grid: { color: c.grid }, pointLabels: { color: c.text, font: { size: 11 } } } },
    },
  });
}

function createAreaChart(canvasId, labels, datasets, title) {
  const c = getChartColors();
  return new Chart(document.getElementById(canvasId), {
    type: 'line',
    data: { labels, datasets: datasets.map((ds, i) => ({
      ...ds, borderColor: c.palette[i], backgroundColor: c.palette[i] + '20',
      tension: 0.4, fill: true, pointRadius: 0, borderWidth: 2,
    }))},
    options: { ...defaultChartOptions(title) },
  });
}

function createMixedChart(canvasId, labels, barDataset, lineDataset, title) {
  const c = getChartColors();
  return new Chart(document.getElementById(canvasId), {
    type: 'bar',
    data: {
      labels,
      datasets: [
        { ...barDataset, type: 'bar', backgroundColor: c.palette[0] + '55', borderColor: c.palette[0], borderWidth: 1, borderRadius: 6, order: 2 },
        { ...lineDataset, type: 'line', borderColor: c.palette[1], backgroundColor: 'transparent', tension: 0.4, pointRadius: 4, pointBackgroundColor: c.palette[1], borderWidth: 2, order: 1 },
      ],
    },
    options: { ...defaultChartOptions(title) },
  });
}
