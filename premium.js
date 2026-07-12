// =======================================
// premium.js
// Part 1
// Premium Features Manager
// =======================================

// Premium Status

let premiumUser = true;

// Check Premium

function isPremiumUser() {
    return premiumUser;
}

// Unlock Premium

function unlockPremium() {
    premiumUser = true;
    localStorage.setItem("premiumUser", "true");
}

// Lock Premium

function lockPremium() {
    premiumUser = false;
    localStorage.setItem("premiumUser", "false");
}

// Restore Premium

const savedPremium = localStorage.getItem("premiumUser");

if (savedPremium === "true") {
    premiumUser = true;
}

// Logo Upload

function selectLogo(input) {

    if (!input.files.length) return;

    const file = input.files[0];

    const reader = new FileReader();

    reader.onload = function (e) {

        qrSettings.logo = e.target.result;

        alert("Logo Uploaded Successfully");

    };

    reader.readAsDataURL(file);

}

// Remove Logo

function removeLogo() {

    qrSettings.logo = null;

    alert("Logo Removed");

}

// Dark / Light Theme

function toggleDarkMode() {

    document.body.classList.toggle("light-mode");

}

// QR Size

function increaseQRSize() {

    qrSettings.size += 50;

}

function decreaseQRSize() {

    if (qrSettings.size > 150) {

        qrSettings.size -= 50;

    }

}

// Reset Settings

function resetQRSettings() {

    qrSettings.size = 350;

    qrSettings.foreground = "#000000";

    qrSettings.background = "#ffffff";

    qrSettings.logo = null;

    qrSettings.gradient = false;

    qrSettings.rounded = false;

    qrSettings.frame = false;

}
// =======================================
// premium.js
// Part 2 (Final)
// =======================================

// Premium Badge

function showPremiumBadge(){

const badge=document.getElementById("premiumBadge");

if(!badge) return;

badge.style.display=isPremiumUser()?"inline-block":"none";

}

// Welcome

function showWelcome(){

if(isPremiumUser()){

console.log("🚀 Pro QR Generator Ready");

}else{

console.log("Free Version");

}

}

// Save Settings

function saveSettings(){

localStorage.setItem(

"qrSettings",

JSON.stringify(qrSettings)

);

}

// Load Settings

function loadSettings(){

const data=localStorage.getItem("qrSettings");

if(!data) return;

try{

const settings=JSON.parse(data);

Object.assign(qrSettings,settings);

}catch(e){

console.log(e);

}

}

// Restore Theme

function restoreTheme(){

const theme=localStorage.getItem("theme");

if(theme==="light"){

document.body.classList.add("light-mode");

}

}

// Save Theme

function saveTheme(){

const light=document.body.classList.contains("light-mode");

localStorage.setItem(

"theme",

light?"light":"dark"

);

}

// Toggle Theme

const oldToggle=toggleDarkMode;

toggleDarkMode=function(){

oldToggle();

saveTheme();

}

// Reset Premium

function resetPremium(){

lockPremium();

localStorage.removeItem("qrSettings");

alert("Premium Reset Complete");

}

// Initialization

window.addEventListener("load",()=>{

loadSettings();

restoreTheme();

showPremiumBadge();

showWelcome();

});

window.addEventListener("beforeunload",()=>{

saveSettings();

});
