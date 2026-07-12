// =======================================
// history.js
// Part 1
// QR History Manager
// =======================================

let qrHistory = JSON.parse(localStorage.getItem("qrHistory")) || [];

// Save History

function saveHistory(type, data) {

    const item = {
        type: type,
        data: data,
        time: new Date().toLocaleString()
    };

    qrHistory.unshift(item);

    if (qrHistory.length > 100) {
        qrHistory.pop();
    }

    localStorage.setItem(
        "qrHistory",
        JSON.stringify(qrHistory)
    );

    loadHistory();
}

// Load History

function loadHistory() {

    const box = document.getElementById("historyList");

    if (!box) return;

    if (qrHistory.length === 0) {

        box.innerHTML = "<p>No History Available</p>";

        return;
    }

    box.innerHTML = "";

    qrHistory.forEach((item, index) => {

        const div = document.createElement("div");

        div.className = "history-item";

        div.innerHTML = `
        <strong>${item.type.toUpperCase()}</strong><br>
        <small>${item.time}</small><br>
        <button onclick="reuseHistory(${index})">Reuse</button>
        <button onclick="deleteHistory(${index})">Delete</button>
        `;

        box.appendChild(div);

    });

}
// =======================================
// history.js
// Part 2 (Final)
// =======================================

// Reuse QR

function reuseHistory(index){

const item=qrHistory[index];

if(!item) return;

createQRCode(item.data);

}

// Delete One

function deleteHistory(index){

if(!confirm("Delete this history?")) return;

qrHistory.splice(index,1);

localStorage.setItem(

"qrHistory",

JSON.stringify(qrHistory)

);

loadHistory();

}

// Clear All

function clearAllHistory(){

if(!confirm("Delete all history?")) return;

qrHistory=[];

localStorage.removeItem("qrHistory");

loadHistory();

}

// Search

function searchHistory(text){

text=text.toLowerCase();

const result=qrHistory.filter(item=>

item.data.toLowerCase().includes(text)

);

return result;

}

// Export JSON

function exportHistory(){

const blob=new Blob(

[JSON.stringify(qrHistory,null,2)],

{type:"application/json"}

);

const link=document.createElement("a");

link.href=URL.createObjectURL(blob);

link.download="qr-history.json";

link.click();

}

// Import JSON

function importHistory(file){

const reader=new FileReader();

reader.onload=function(e){

try{

qrHistory=JSON.parse(e.target.result);

localStorage.setItem(

"qrHistory",

JSON.stringify(qrHistory)

);

loadHistory();

alert("History Imported");

}catch{

alert("Invalid File");

}

};

reader.readAsText(file);

}

// Initialize

window.addEventListener("load",()=>{

loadHistory();

});
