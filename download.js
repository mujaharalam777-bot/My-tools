// =======================================
// download.js
// Part 1
// Download & Export Manager
// =======================================

function downloadPNG(){

if(!qrCanvas){

alert("Generate a QR Code first.");

return;

}

const link=document.createElement("a");

link.download="mytools-qr.png";

link.href=qrCanvas.toDataURL("image/png");

link.click();

if(typeof downloadedQR==="function"){

downloadedQR();

refreshStats();

}

}

// HD PNG

function downloadHDPNG(){

if(!qrCanvas){

alert("Generate a QR Code first.");

return;

}

const canvas=document.createElement("canvas");

const ctx=canvas.getContext("2d");

canvas.width=qrCanvas.width*4;

canvas.height=qrCanvas.height*4;

ctx.scale(4,4);

ctx.drawImage(qrCanvas,0,0);

const link=document.createElement("a");

link.download="mytools-qr-hd.png";

link.href=canvas.toDataURL("image/png");

link.click();

}

// Copy

async function copyQRCode(){

if(!qrCanvas){

alert("Generate a QR Code first.");

return;

}

qrCanvas.toBlob(async(blob)=>{

await navigator.clipboard.write([

new ClipboardItem({

[blob.type]:blob

})

]);

alert("Copied Successfully");

});

}
}// =======================================
// download.js
// Part 2
// PDF, SVG, Print & Share
// =======================================

// PDF Export

function downloadPDF(){

if(!qrCanvas){

alert("Generate a QR Code first.");

return;

}

alert("PDF Export will be available in the final version.");

}

// SVG Export

function downloadSVG(){

if(!qrCanvas){

alert("Generate a QR Code first.");

return;

}

alert("SVG Export will be available in the final version.");

}

// Print

function printQRCode(){

if(!qrCanvas){

alert("Generate a QR Code first.");

return;

}

const win=window.open("");

win.document.write(`
<html>
<head>
<title>Print QR</title>
</head>
<body style="text-align:center;margin-top:40px;">
<img src="${qrCanvas.toDataURL()}">
</body>
</html>
`);

win.document.close();
win.print();

if(typeof printedQR==="function"){

printedQR();

}

}

// Share

async function shareQRCode(){

if(!qrCanvas){

alert("Generate a QR Code first.");

return;

}

if(!navigator.share){

alert("Your browser doesn't support Share.");

return;

}

qrCanvas.toBlob(async(blob)=>{

const file=new File(

[blob],

"qr-code.png",

{type:"image/png"}

);

try{

await navigator.share({

title:"QR Code",

text:"Generated with My Tools",

files:[file]

});

if(typeof sharedQR==="function"){

sharedQR();

}

}catch(e){

console.log(e);

}

});

}
}

// Download JPG

function downloadJPG(){

if(!qrCanvas){

alert("Generate a QR Code first.");

return;

}

const link=document.createElement("a");

link.download="qr-code.jpg";

link.href=qrCanvas.toDataURL("image/jpeg",1);

link.click();

}
