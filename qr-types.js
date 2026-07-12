// =======================================
// PRO QR GENERATOR
// qr-types.js
// Part 1
// =======================================

let currentType = "url";
let qrCanvas = null;

// ---------- Tab Buttons ----------

const tabButtons = document.querySelectorAll(".tabs button");

tabButtons.forEach(btn => {

    btn.addEventListener("click", () => {

        tabButtons.forEach(b => b.classList.remove("active"));

        btn.classList.add("active");

        currentType = btn.innerText.trim().toLowerCase();

    });

});

// ---------- Generate Button ----------

document
.getElementById("generateBtn")
.addEventListener("click", generateQR);

// ---------- Main Generate ----------

function generateQR(){

    let data = "";

    switch(currentType){

        case "url":

            data =
            document
            .getElementById("urlInput")
            .value
            .trim();

        break;

        case "text":

            data =
            document
            .getElementById("textInput")
            .value
            .trim();

        break;

        case "wifi":

            const wifi =
            document
            .getElementById("wifiName")
            .value;

            const pass =
            document
            .getElementById("wifiPassword")
            .value;

            data =
            `WIFI:T:WPA;S:${wifi};P:${pass};;`;

        break;

        case "email":

            const email =
            document
            .getElementById("emailInput")
            .value;

            const subject =
            document
            .getElementById("emailSubject")
            .value;

            data =
            `mailto:${email}?subject=${encodeURIComponent(subject)}`;

        break;

        case "phone":

            const phone =
            document
            .getElementById("phoneInput")
            .value;

            data =
            `tel:${phone}`;

        break;

        case "sms":

            const sms =
            document
            .getElementById("smsNumber")
            .value;

            const msg =
            document
            .getElementById("smsMessage")
            .value;

            data =
            `sms:${sms}?body=${encodeURIComponent(msg)}`;

        break;

        case "whatsapp":

            const wa =
            document
            .getElementById("waNumber")
            .value;

            const waMsg =
            document
            .getElementById("waMessage")
            .value;

            data =
            `https://wa.me/${wa}?text=${encodeURIComponent(waMsg)}`;

        break;

        default:

            data = "";

    }

    if(data===""){

        alert("Please enter data.");

        return;

    }

    createQRCode(data);

}

// ---------- Create QR ----------

function createQRCode(data){

    const preview =
    document.getElementById("previewBox");

    preview.innerHTML = "";

    QRCode.toCanvas(

        data,

        {

            width:350,

            margin:2,

            color:{

                dark:"#000000",

                light:"#ffffff"

            }

        },

        function(err,canvas){

            if(err){

                console.error(err);

                return;

            }

            qrCanvas = canvas;

            preview.appendChild(canvas);

            updateInfo(data);

        }

    );

}

// ---------- QR Info ----------

function updateInfo(data){

document
.getElementById("qrInfo")
.innerHTML=

`
<b>Type:</b> ${currentType.toUpperCase()}<br><br>

<b>Characters:</b> ${data.length}<br><br>

<b>Status:</b> Successfully Generated
`;

              }
// =======================================
// qr-types.js
// Part 2
// More QR Types
// =======================================

// ---------- vCard ----------

function buildVCard(name, phone, email, company) {

return `BEGIN:VCARD
VERSION:3.0
FN:${name}
ORG:${company}
TEL:${phone}
EMAIL:${email}
END:VCARD`;

}

// ---------- Google Map ----------

function buildLocation(lat, lng){

return `https://maps.google.com/?q=${lat},${lng}`;

}

// ---------- Event ----------

function buildEvent(title,start,end,location){

return `BEGIN:VEVENT
SUMMARY:${title}
LOCATION:${location}
DTSTART:${start}
DTEND:${end}
END:VEVENT`;

}

// ---------- YouTube ----------

function buildYoutube(url){

return url;

}

// ---------- Instagram ----------

function buildInstagram(username){

return `https://instagram.com/${username}`;

}

// ---------- Facebook ----------

function buildFacebook(username){

return `https://facebook.com/${username}`;

}

// ---------- X (Twitter) ----------

function buildTwitter(username){

return `https://x.com/${username}`;

}

// ---------- LinkedIn ----------

function buildLinkedin(username){

return `https://linkedin.com/in/${username}`;

}

// ---------- Spotify ----------

function buildSpotify(link){

return link;

}

// ---------- PDF Link ----------

function buildPDF(link){

return link;

}

// ---------- Play Store ----------

function buildPlayStore(packageName){

return `https://play.google.com/store/apps/details?id=${packageName}`;

}

// ---------- App Store ----------

function buildAppStore(link){

return link;

}

// ---------- Website Validation ----------

function isURL(text){

try{

new URL(text);

return true;

}

catch{

return false;

}

}

// ---------- QR Counter ----------

let totalQRGenerated = 0;

function increaseCounter(){

totalQRGenerated++;

const box = document.getElementById("totalQR");

if(box){

box.innerText = totalQRGenerated;

}

}

// ---------- Save Last QR ----------

function saveLastQR(data){

localStorage.setItem(

"lastQR",

data

);

}

// ---------- Load Last QR ----------

function loadLastQR(){

return localStorage.getItem(

"lastQR"

);

}
// =======================================
// qr-types.js
// Part 3
// Payment, Crypto & History
// =======================================

// ---------- UPI Payment ----------

function buildUPI(id,name,amount,note){

return `upi://pay?pa=${id}&pn=${encodeURIComponent(name)}&am=${amount}&tn=${encodeURIComponent(note)}&cu=INR`;

}

// ---------- Bitcoin ----------

function buildBitcoin(address,amount){

if(amount){

return `bitcoin:${address}?amount=${amount}`;

}

return `bitcoin:${address}`;

}

// ---------- Ethereum ----------

function buildEthereum(address){

return `ethereum:${address}`;

}

// ---------- USDT ----------

function buildUSDT(address){

return address;

}

// ---------- PayPal ----------

function buildPayPal(email){

return `https://paypal.me/${email}`;

}

// ---------- Telegram ----------

function buildTelegram(username){

return `https://t.me/${username}`;

}

// ---------- Gmail ----------

function buildGmail(email,subject,body){

return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

}

// ---------- History ----------

let qrHistory = JSON.parse(localStorage.getItem("qrHistory")) || [];

function addHistory(type,data){

const item={

type:type,

data:data,

time:new Date().toLocaleString()

};

qrHistory.unshift(item);

if(qrHistory.length>50){

qrHistory.pop();

}

localStorage.setItem("qrHistory",JSON.stringify(qrHistory));

showHistory();

}

// ---------- Show History ----------

function showHistory(){

const box=document.getElementById("historyList");

if(!box) return;

if(qrHistory.length===0){

box.innerHTML="No History";

return;

}

box.innerHTML="";

qrHistory.forEach((item,index)=>{

const div=document.createElement("div");

div.style.padding="10px";

div.style.marginBottom="8px";

div.style.borderBottom="1px solid rgba(255,255,255,.1)";

div.innerHTML=`
<b>${item.type.toUpperCase()}</b><br>
<small>${item.time}</small>
`;

box.appendChild(div);

});

}

// ---------- Auto Save ----------

const oldCreate=createQRCode;

createQRCode=function(data){

oldCreate(data);

addHistory(currentType,data);

increaseCounter();

saveLastQR(data);

};

showHistory();
// =======================================
// qr-types.js
// Part 4
// Favorites, Share & Utilities
// =======================================

// ---------- Favorites ----------

let favoriteQR = JSON.parse(
localStorage.getItem("favoriteQR")
) || [];

function addFavorite(type,data){

favoriteQR.unshift({

type:type,
data:data,
time:new Date().toLocaleString()

});

if(favoriteQR.length>30){

favoriteQR.pop();

}

localStorage.setItem(

"favoriteQR",

JSON.stringify(favoriteQR)

);

showFavorites();

}

// ---------- Show Favorites ----------

function showFavorites(){

const box=document.getElementById("favoriteList");

if(!box) return;

if(favoriteQR.length===0){

box.innerHTML="No Favorite QR";

return;

}

box.innerHTML="";

favoriteQR.forEach(item=>{

const div=document.createElement("div");

div.style.padding="10px";
div.style.marginBottom="8px";
div.style.borderBottom="1px solid rgba(255,255,255,.1)";

div.innerHTML=`
<b>${item.type.toUpperCase()}</b><br>
<small>${item.time}</small>
`;

box.appendChild(div);

});

}

showFavorites();

// ---------- Share QR ----------

function shareQR(){

if(!qrCanvas){

alert("Generate QR First");

return;

}

if(navigator.share){

qrCanvas.toBlob(blob=>{

const file=new File(

[blob],

"qr.png",

{type:"image/png"}

);

navigator.share({

title:"QR Code",

files:[file]

});

});

}else{

alert("Sharing is not supported.");

}

}

// ---------- Print QR ----------

function printQR(){

if(!qrCanvas){

alert("Generate QR First");

return;

}

const win=window.open("");

win.document.write(

`<img src="${qrCanvas.toDataURL()}">`

);

win.print();

}

// ---------- Regenerate Last ----------

function regenerateLast(){

const last=loadLastQR();

if(last){

createQRCode(last);

}

}

// ---------- Device ----------

function isMobile(){

return /Android|iPhone|iPad|iPod/i.test(

navigator.userAgent

);

}

console.log(

isMobile()

?

"Mobile Device"

:

"Desktop Device"

);
// =====================================
// qr-types.js
// Part 5
// Premium Design Features
// =====================================

// QR Settings

let qrSettings = {

size:350,

foreground:"#000000",

background:"#ffffff",

margin:2,

logo:null,

rounded:false,

frame:false,

gradient:false

};

// Change Size

function setQRSize(size){

qrSettings.size=parseInt(size);

}

// Change Foreground

function setForeground(color){

qrSettings.foreground=color;

}

// Change Background

function setBackground(color){

qrSettings.background=color;

}

// Rounded Mode

function enableRounded(enable){

qrSettings.rounded=enable;

}

// Frame Mode

function enableFrame(enable){

qrSettings.frame=enable;

}

// Gradient Mode

function enableGradient(enable){

qrSettings.gradient=enable;

}

// Upload Logo

function uploadLogo(file){

const reader=new FileReader();

reader.onload=function(e){

qrSettings.logo=e.target.result;

};

reader.readAsDataURL(file);

}

// Draw Logo

function drawLogo(canvas){

if(!qrSettings.logo) return;

const ctx=canvas.getContext("2d");

const img=new Image();

img.onload=function(){

const size=canvas.width/5;

ctx.fillStyle="#ffffff";

ctx.fillRect(

(canvas.width-size)/2-6,

(canvas.height-size)/2-6,

size+12,

size+12

);

ctx.drawImage(

img,

(canvas.width-size)/2,

(canvas.height-size)/2,

size,

size

);

};

img.src=qrSettings.logo;

}

// Rebuild QR

const originalCreate=createQRCode;

createQRCode=function(data){

const preview=document.getElementById("previewBox");

preview.innerHTML="";

QRCode.toCanvas(

data,

{

width:qrSettings.size,

margin:qrSettings.margin,

color:{

dark:qrSettings.foreground,

light:qrSettings.background

}

},

function(err,canvas){

if(err){

console.log(err);

return;

}

qrCanvas=canvas;

preview.appendChild(canvas);

drawLogo(canvas);

updateInfo(data);

}

);

};
// =====================================
// qr-types.js
// Part 6
// Advanced Premium Features
// =====================================

// ---------- Gradient ----------

function createGradient(ctx,width,height){

const gradient=ctx.createLinearGradient(

0,0,width,height

);

gradient.addColorStop(0,"#22c55e");
gradient.addColorStop(.5,"#2563eb");
gradient.addColorStop(1,"#9333ea");

return gradient;

}

// ---------- Apply Gradient ----------

function applyGradient(canvas){

if(!qrSettings.gradient) return;

const ctx=canvas.getContext("2d");

const img=ctx.getImageData(

0,

0,

canvas.width,

canvas.height

);

const data=img.data;

const gradient=createGradient(

ctx,

canvas.width,

canvas.height

);

ctx.clearRect(

0,

0,

canvas.width,

canvas.height

);

ctx.fillStyle="#ffffff";

ctx.fillRect(

0,

0,

canvas.width,

canvas.height

);

ctx.fillStyle=gradient;

for(let y=0;y<canvas.height;y+=6){

for(let x=0;x<canvas.width;x+=6){

const pixel=((y*canvas.width)+x)*4;

if(data[pixel]<100){

ctx.fillRect(

x,

y,

6,

6

);

}

}

}

}

// ---------- Rounded QR ----------

function applyRounded(canvas){

if(!qrSettings.rounded) return;

const ctx=canvas.getContext("2d");

const img=ctx.getImageData(

0,

0,

canvas.width,

canvas.height

);

const data=img.data;

ctx.clearRect(

0,

0,

canvas.width,

canvas.height

);

ctx.fillStyle="#ffffff";

ctx.fillRect(

0,

0,

canvas.width,

canvas.height

);

ctx.fillStyle=qrSettings.foreground;

for(let y=0;y<canvas.height;y+=6){

for(let x=0;x<canvas.width;x+=6){

const pixel=((y*canvas.width)+x)*4;

if(data[pixel]<100){

ctx.beginPath();

ctx.arc(

x+3,

y+3,

2.5,

0,

Math.PI*2

);

ctx.fill();

}

}

}

}

// ---------- Scan Frame ----------

function addFrame(canvas){

if(!qrSettings.frame) return;

const ctx=canvas.getContext("2d");

ctx.lineWidth=8;

ctx.strokeStyle="#22c55e";

ctx.strokeRect(

4,

4,

canvas.width-8,

canvas.height-8

);

ctx.fillStyle="#22c55e";

ctx.font="bold 22px Poppins";

ctx.textAlign="center";

ctx.fillText(

"SCAN ME",

canvas.width/2,

canvas.height-15

);

}

// ---------- Premium Render ----------

const renderQR=createQRCode;

createQRCode=function(data){

renderQR(data);

setTimeout(()=>{

if(!qrCanvas) return;

applyGradient(qrCanvas);

applyRounded(qrCanvas);

addFrame(qrCanvas);

drawLogo(qrCanvas);

},100);

};
// =====================================
// qr-types.js
// Part 7
// Download & Export Features
// =====================================

// ---------- Download PNG ----------

function downloadPNG(){

if(!qrCanvas){

alert("Generate QR First");

return;

}

const link=document.createElement("a");

link.download="pro-qr.png";

link.href=qrCanvas.toDataURL("image/png",1);

link.click();

}

// ---------- Download HD PNG ----------

function downloadHD(){

if(!qrCanvas){

alert("Generate QR First");

return;

}

const hd=document.createElement("canvas");

const ctx=hd.getContext("2d");

hd.width=qrCanvas.width*4;

hd.height=qrCanvas.height*4;

ctx.scale(4,4);

ctx.drawImage(qrCanvas,0,0);

const link=document.createElement("a");

link.download="pro-qr-hd.png";

link.href=hd.toDataURL("image/png",1);

link.click();

}

// ---------- Copy QR ----------

function copyQR(){

if(!qrCanvas){

alert("Generate QR First");

return;

}

qrCanvas.toBlob(blob=>{

navigator.clipboard.write([

new ClipboardItem({

[blob.type]:blob

})

]);

alert("QR Copied!");

});

}

// ---------- Share QR ----------

async function shareQRCode(){

if(!navigator.share){

alert("Sharing not supported");

return;

}

qrCanvas.toBlob(async blob=>{

const file=new File(

[blob],

"qr.png",

{type:"image/png"}

);

await navigator.share({

title:"QR Code",

text:"Generated by My Tools",

files:[file]

});

});

}

// ---------- Print ----------

function printQRCode(){

const win=window.open("");

win.document.write(

"<img src='"+

qrCanvas.toDataURL()

+

"' style='width:300px'>"

);

win.print();

}

// ---------- SVG ----------

function downloadSVG(){

alert("SVG Export Ready in Final Build");

}

// ---------- PDF ----------

function downloadPDF(){

alert("PDF Export Ready in Final Build");

}
// =====================================
// qr-types.js
// Part 8
// Batch QR + Advanced Features
// =====================================

// ---------- Batch QR List ----------

let batchQRList = [];

// Add Batch Item

function addBatchQR(data){

if(!data) return;

batchQRList.push(data);

updateBatchCount();

}

// Remove Batch Item

function removeBatchQR(index){

batchQRList.splice(index,1);

updateBatchCount();

}

// Clear Batch

function clearBatch(){

batchQRList=[];

updateBatchCount();

}

// Batch Counter

function updateBatchCount(){

const box=document.getElementById("batchCount");

if(box){

box.innerText=batchQRList.length;

}

}

// Generate All

async function generateBatch(){

if(batchQRList.length===0){

alert("No Batch Data");

return;

}

for(let i=0;i<batchQRList.length;i++){

await QRCode.toCanvas(

batchQRList[i],

{

width:300,

margin:2

},

function(){}

);

}

alert(batchQRList.length+" QR Generated");

}

// Search History

function searchHistory(keyword){

keyword=keyword.toLowerCase();

const result=qrHistory.filter(item=>

item.data.toLowerCase().includes(keyword)

);

return result;

}

// Clear History

function clearHistory(){

if(confirm("Delete History?")){

qrHistory=[];

localStorage.removeItem("qrHistory");

showHistory();

}

}

// Favorite Search

function searchFavorite(keyword){

keyword=keyword.toLowerCase();

return favoriteQR.filter(item=>

item.data.toLowerCase().includes(keyword)

);

}

// Export History JSON

function exportHistory(){

const data=JSON.stringify(

qrHistory,

null,

2

);

const blob=new Blob(

[data],

{type:"application/json"}

);

const link=document.createElement("a");

link.href=URL.createObjectURL(blob);

link.download="qr-history.json";

link.click();

}

// Import History

function importHistory(json){

try{

qrHistory=JSON.parse(json);

localStorage.setItem(

"qrHistory",

JSON.stringify(qrHistory)

);

showHistory();

}catch{

alert("Invalid JSON");

}

}
// =====================================
// qr-types.js
// Part 9 (Final)
// Premium Final Features
// =====================================

// ---------- Auto Save ----------

let autoSave=true;

function setAutoSave(value){

autoSave=value;

}

function autoSaveQR(data){

if(!autoSave) return;

localStorage.setItem("lastGeneratedQR",data);

}

// ---------- Restore ----------

function restoreLastQR(){

const last=localStorage.getItem("lastGeneratedQR");

if(last){

createQRCode(last);

}

}

// ---------- Theme ----------

let darkMode=true;

function toggleTheme(){

darkMode=!darkMode;

document.body.classList.toggle("light-mode");

}

// ---------- Language ----------

let language="en";

function setLanguage(lang){

language=lang;

console.log("Language:",lang);

}

// ---------- Performance ----------

function optimizeCanvas(){

if(!qrCanvas) return;

qrCanvas.style.imageRendering="pixelated";

}

// ---------- Premium Unlock ----------

let premiumUnlocked=true;

function isPremium(){

return premiumUnlocked;

}

// ---------- Analytics ----------

let analytics={

generated:0,

downloaded:0,

shared:0,

printed:0

};

function generatedQR(){

analytics.generated++;

}

function downloadedQR(){

analytics.downloaded++;

}

function sharedQR(){

analytics.shared++;

}

function printedQR(){

analytics.printed++;

}

// ---------- Statistics ----------

function refreshStats(){

const total=document.getElementById("totalQR");

const today=document.getElementById("todayQR");

const download=document.getElementById("downloadQR");

if(total) total.innerText=analytics.generated;

if(today) today.innerText=analytics.generated;

if(download) download.innerText=analytics.downloaded;

}

// ---------- Initialize ----------

window.addEventListener("load",()=>{

restoreLastQR();

showHistory();

showFavorites();

refreshStats();

console.log("✅ Pro QR Generator Loaded Successfully");

});
