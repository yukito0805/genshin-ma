document.addEventListener('DOMContentLoaded', () => {
  const symptomInput = document.getElementById('symptom');
  const severityInput = document.getElementById('severity');
  const severityValue = document.getElementById('severity-value');
  const notesInput = document.getElementById('notes');
  const submitBtn = document.getElementById('submit-btn');
  const recordsDiv = document.getElementById('records');

  let records = JSON.parse(localStorage.getItem('records')) || [];
  let editIndex = -1;

  // シークバーの値表示を更新
  severityInput.addEventListener('input', () => {
    severityValue.textContent = severityInput.value;
  });

  // 記録を表示
  function displayRecords() {
    recordsDiv.innerHTML = '';
    records.forEach((record, index) => {
      const recordDiv = document.createElement('div');
      recordDiv.className = 'record';
      recordDiv.innerHTML = `
        <p><strong>症状:</strong> ${record.symptom}</p>
        <p><strong>重症度:</strong> 
          <input type="range" class="record-severity" data-index="${index}" min="1" max="10" value="${record.severity}">
          <span class="record-severity-value">${record.severity}</span>
        </p>
        <p><strong>備考:</strong> ${record.notes || 'なし'}</p>
        <p><strong>日時:</strong> ${record.date}</p>
        <button class="edit-btn" data-index="${index}">編集</button>
        <button class="delete-btn" data-index="${index}">削除</button>
      `;
      recordsDiv.appendChild(recordDiv);
    });

    // 記録一覧のシークバーにイベントリスナーを追加
    document.querySelectorAll('.record-severity').forEach(slider => {
      slider.addEventListener('input', (e) => {
        const index = e.target.dataset.index;
        records[index].severity = e.target.value;
        e.target.nextElementSibling.textContent = e.target.value;
        localStorage.setItem('records', JSON.stringify(records));
      });
    });
  }

  // 記録を保存
  function saveRecord() {
    const record = {
      symptom: symptomInput.value,
      severity: severityInput.value,
      notes: notesInput.value,
      date: new Date().toLocaleString('ja-JP')
    };

    if (editIndex === -1) {
      records.push(record);
    } else {
      records[editIndex] = record;
      editIndex = -1;
      submitBtn.textContent = '記録する';
    }

    localStorage.setItem('records', JSON.stringify(records));
    displayRecords();
    resetForm();
  }

  // フォームリセット
  function resetForm() {
    symptomInput.value = '';
    severityInput.value = '1';
    severityValue.textContent = '1';
    notesInput.value = '';
  }

  // フォーム送信
  submitBtn.addEventListener('click', () => {
    if (symptomInput.value.trim()) {
      saveRecord();
    } else {
      alert('症状を入力してください。');
    }
  });

  // 編集・削除ボタンの処理
  recordsDiv.addEventListener('click', (e) => {
    const index = e.target.dataset.index;
    if (e.target.classList.contains('edit-btn')) {
      const record = records[index];
      symptomInput.value = record.symptom;
      severityInput.value = record.severity;
      severityValue.textContent = record.severity;
      notesInput.value = record.notes;
      editIndex = index;
      submitBtn.textContent = '更新する';
    } else if (e.target.classList.contains('delete-btn')) {
      if (confirm('この記録を削除しますか？')) {
        records.splice(index, 1);
        localStorage.setItem('records', JSON.stringify(records));
        displayRecords();
      }
    }
  });

  // 初期表示
  displayRecords();
});