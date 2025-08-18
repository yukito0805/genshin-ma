const symptomEl = document.getElementById('symptom');
const ratingEl = document.getElementById('rating');
const ratingValueEl = document.getElementById('ratingValue');
const notesEl = document.getElementById('notes');

const confirmBtn = document.getElementById('confirmBtn');
const editBtn = document.getElementById('editBtn');
const clearBtn = document.getElementById('clearBtn');
const saveTxtBtn = document.getElementById('saveTxtBtn');
const printBtn = document.getElementById('printBtn');
const summaryEl = document.getElementById('summary');
const historyList = document.getElementById('historyList');

ratingEl.addEventListener('input', () => {
  ratingValueEl.textContent = ratingEl.value;
});

function lockFields(lock){
  [symptomEl, ratingEl, notesEl].forEach(el => el.disabled = lock);
  confirmBtn.classList.toggle('hidden', lock);
  editBtn.classList.toggle('hidden', !lock);
}

function buildSummary(){
  const now = new Date().toLocaleString();
  return `【日時】${now}
【症状】${symptomEl.value || '未入力'}
【評価】${ratingEl.value}/10
【備考】
${notesEl.value || '未入力'}`;
}

function renderSummary(){
  summaryEl.textContent = buildSummary();
  summaryEl.classList.add('visible');
}

function saveToHistory(){
  const item = {
    id: Date.now(),
    symptom: symptomEl.value,
    rating: ratingEl.value,
    notes: notesEl.value,
    ts: new Date().toLocaleString()
  };
  const arr = JSON.parse(localStorage.getItem('sxHistory') || '[]');
  arr.unshift(item);
  localStorage.setItem('sxHistory', JSON.stringify(arr.slice(0,50)));
  renderHistory();
}

function renderHistory(){
  const arr = JSON.parse(localStorage.getItem('sxHistory') || '[]');
  historyList.innerHTML = '';
  arr.forEach(item => {
    const li = document.createElement('li');
    li.className = 'history-item';
    li.textContent = `${item.ts} / ${item.symptom} / 評価 ${item.rating}`;
    historyList.appendChild(li);
  });
}

confirmBtn.addEventListener('click', () => {
  renderSummary();
  lockFields(true);
  saveToHistory();
});

editBtn.addEventListener('click', () => {
  lockFields(false);
  summaryEl.classList.remove('visible');
});

clearBtn.addEventListener('click', () => {
  symptomEl.value = '';
  ratingEl.value = 5;
  notesEl.value = '';
  editBtn.click();
});

saveTxtBtn.addEventListener('click', () => {
  const blob = new Blob([buildSummary()], {type:'text/plain'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = '症状メモ.txt';
  a.click();
  URL.revokeObjectURL(a.href);
});

printBtn.addEventListener('click', () => {
  if(!summaryEl.classList.contains('visible')) renderSummary();
  window.print();
});

// 初期化
ratingEl.dispatchEvent(new Event('input'));
renderHistory();
