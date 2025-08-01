body {
    font-family: Arial, sans-serif;
    max-width: 100%;
    margin: 0 auto;
    padding: 15px;
    background-color: #f5f5f5;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    background: #fff;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

h1 {
    text-align: center;
    color: #2c3e50;
    font-size: 1.8em;
    margin-bottom: 20px;
}

form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 25px;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

label {
    font-weight: bold;
    color: #34495e;
    font-size: 1.1em;
}

input[type="text"], input[type="range"], textarea {
    padding: 10px;
    font-size: 1em;
    border: 1px solid #ccc;
    border-radius: 6px;
    width: 100%;
    box-sizing: border-box;
}

textarea {
    resize: vertical;
    border: 1px solid #dfe6e9;
}

input[type="range"] {
    width: 100%;
}

.severity-number {
    width: 40px;
    text-align: center;
    font-weight: bold;
    color: #34495e;
    font-size: 1em;
}

button {
    padding: 12px;
    background-color: #0984e3;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1.1em;
    transition: background-color 0.2s;
}

button:hover {
    background-color: #0652dd;
}

.delete-button {
    padding: 8px 12px;
    background-color: #e74c3c;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.9em;
}

.delete-button:hover {
    background-color: #c0392b;
}

.symptom-item {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 15px;
    margin-bottom: 15px;
    background-color: #f8fafc;
    border-radius: 8px;
    border: 1px solid #e0e0e0;
}

.symptom-header {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
}

.symptom-name {
    font-weight: bold;
    color: #2c3e50;
    font-size: 1.2em;
    flex: 1;
    min-width: 100px;
}

.symptom-bar {
    flex: 2;
    height: 20px;
    background-color: #dfe6e9;
    border-radius: 10px;
    overflow: hidden;
    min-width: 100px;
}

.bar-fill {
    height: 100%;
    background-color: #0984e3;
    transition: width 0.3s ease;
}

.severity-number {
    width: 120px; /* スライダーと値の表示用に幅を広げる */
    display: flex;
    align-items: center;
    gap: 5px;
}

.severity-number input[type="range"] {
    flex: 1;
}

.severity-number span {
    width: 20px;
    text-align: right;
}

.symptom-date {
    width: 120px;
    text-align: center;
    color: #636e72;
    font-size: 0.9em;
}

.symptom-note {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.symptom-note label {
    font-size: 0.9em;
    color: #636e72;
}

.note-textarea {
    background-color: #fff;
    border: 1px solid #dfe6e9;
}

@media (max-width: 600px) {
    .container {
        padding: 10px;
    }
    h1 {
        font-size: 1.5em;
    }
    .symptom-item {
        padding: 10px;
    }
    .symptom-header {
        flex-direction: column;
        align-items: flex-start;
    }
    .symptom-name, .symptom-bar, .severity-number, .symptom-date, .delete-button {
        width: 100%;
        min-width: unset;
    }
    .symptom-bar {
        height: 15px;
    }
    .severity-number, .symptom-date {
        text-align: left;
    }
    .delete-button {
        width: fit-content;
    }
}
