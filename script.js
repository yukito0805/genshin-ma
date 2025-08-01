document.getElementById('severity').addEventListener('input', function() {
    document.getElementById('severityValue').textContent = this.value;
});

// 日付をYYYY-MM-DD形式で取得（JSTを保証）
function getCurrentDate() {
    const now = new Date();
    const offset = 9 * 60; // JSTはUTC+9
    const jstDate = new Date(now.getTime() + (offset * 60 * 1000));
    return jstDate.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' });
}

// 症状アイテムを表示する関数
function displaySymptom(symptom, severity, date, note, index) {
    const symptomItem = document.createElement('div');
    symptomItem.className = 'symptom-item';
    symptomItem.dataset.index = index;
    
    const symptomHeader = document.createElement('div');
    symptomHeader.className = 'symptom-header';
    
    const symptomName = document.createElement('div');
    symptomName.className = 'symptom-name';
    symptomName.textContent = symptom;
    
    const symptomBar = document.createElement('div');
    symptomBar.className = 'symptom-bar';
    
    const barFill = document.createElement('div');
    barFill.className = 'bar-fill';
    barFill.style.width = `${severity * 10}%`;
    
    const severityNumber = document.createElement('div');
    severityNumber.className = 'severity-number';
    severityNumber.textContent = severity;
    
    const symptomDate = document.createElement('div');
    symptomDate.className = 'symptom-date';
    symptomDate.textContent = date;
    
    const symptomNote = document.createElement('div');
    symptomNote.className = 'symptom-note';
    
    const noteLabel = document.createElement('label');
    noteLabel.textContent = '備考:';
    
    const noteTextarea = document.createElement('textarea');
    noteTextarea.className = 'note-textarea';
    noteTextarea.value = note || '';
    noteTextarea.rows = 3;
    noteTextarea.placeholder = 'ここに備考を入力';
    noteTextarea.addEventListener('change', function() {
        const savedSymptoms = JSON.parse(localStorage.getItem('symptoms')) || [];
        savedSymptoms[index].note = noteTextarea.value;
        localStorage.setItem('symptoms', JSON.stringify(savedSymptoms));
    });
    
    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.textContent = '削除';
    deleteButton.addEventListener('click', function() {
        if (confirm('このエントリを削除しますか？')) {
            const savedSymptoms = JSON.parse(localStorage.getItem('symptoms')) || [];
            savedSymptoms.splice(index, 1);
            localStorage.setItem('symptoms', JSON.stringify(savedSymptoms));
            symptomItem.remove();
            const symptomItems = document.querySelectorAll('.symptom-item');
            symptomItems.forEach((item, i) => {
                item.dataset.index = i;
            });
        }
    });
    
    symptomBar.appendChild(barFill);
    symptomHeader.appendChild(symptomName);
    symptomHeader.appendChild(symptomBar);
    symptomHeader.appendChild(severityNumber);
    symptomHeader.appendChild(symptomDate);
    symptomHeader.appendChild(deleteButton);
    symptomNote.appendChild(noteLabel);
    symptomNote.appendChild(noteTextarea);
    symptomItem.appendChild(symptomHeader);
    symptomItem.appendChild(symptomNote);
    
    document.getElementById('symptomList').appendChild(symptomItem);
}

// ページ読み込み時に保存されたデータを表示
document.addEventListener('DOMContentLoaded', function() {
    const savedSymptoms = JSON.parse(localStorage.getItem('symptoms')) || [];
    
    savedSymptoms.forEach((item, index) => {
        displaySymptom(item.symptom, item.severity, item.date, item.note, index);
    });
});

document.getElementById('symptomForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const symptom = document.getElementById('symptom').value;
    const severity = document.getElementById('severity').value;
    const date = getCurrentDate();
    const note = '';
    
    // localStorageに保存
    const savedSymptoms = JSON.parse(localStorage.getItem('symptoms')) || [];
    const index = savedSymptoms.length;
    savedSymptoms.push({ symptom, severity, date, note });
    localStorage.setItem('symptoms', JSON.stringify(savedSymptoms));
    
    // 画面に追加
    displaySymptom(symptom, severity, date, note, index);
    
    // フォームをリセット
    document.getElementById('symptomForm').reset();
    document.getElementById('severityValue').textContent = '1';
});