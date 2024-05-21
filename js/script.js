// Assignment 10
// Bookmarker

var submitSite = document.getElementById('submit');
var site = {name:'', url:''};
var siteList = [];

submitSite.addEventListener('click', addSite);

(function(){
    siteList = JSON.parse(localStorage.getItem('site'));
    display()
})()

function addSite(){
    site = {
        name: document.getElementById('siteName').value.trim(),
        url: document.getElementById('siteURL').value.trim()
    };
    if(site.name.split('').length >= 3 && site.url != ''){
         if(isValidUrl(site.url)){
            siteList.push(site);
            localStorage.setItem('site', JSON.stringify(siteList))
            display()
            clearData()
         }else{
             window.alert('Please enter a valid URL');
         }
    }else{
        window.alert(`Site Name or Url is not valid, Please follow the rules below :
        Site name must contain at least 3 characters
        Site URL must be a valid one`);
    }
}

function display(){
    if(localStorage.getItem('site') === null){
        siteList = [];
    }

    var HTMLcode = '';

    for(var i=0;i<siteList.length;i++){
        HTMLcode += `
        <tr>
            <td>${i+1}</td>
            <td>${siteList[i].name.charAt(0).toUpperCase() + siteList[i].name.slice(1)}</td>
            <td><button class="btn btn-visit pe-2" onClick="visitSite(${i})"><i class="fa-solid fa-eye pe-2"></i>Visit</button></td>
            <td><button class="btn btn-delete pe-2" onClick="deleteSite(${i})"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
        </tr>`;
    }

    document.getElementById('tableBody').innerHTML = HTMLcode;
}

function visitSite(index){
    window.open('https://' + siteList[index].url,"_blank");
}

function deleteSite(index){
    siteList.splice(index,1);
    localStorage.setItem('site', JSON.stringify(siteList));
    display();
}

function clearData(){
    document.getElementById('siteName').value = null;
    document.getElementById('siteURL').value = null;
}


// URL Validation Methods
// method 1: Own function
// method 2: URL object
// method 3: Validating URL with Regex

var urlCheck = document.getElementById('siteURL');

// method 1
function isValidUrl(siteUrl) {
    const validPrefixes = ['http://www.', 'https://www.', 'www.'];
    const tldPattern = /\.(com|net|org|edu|gov|mil|int|info|biz|co)$/;

    // Check if the URL starts with any of the valid prefixes
    const hasValidPrefix = validPrefixes.some(prefix => siteUrl.startsWith(prefix));
    
    if (!hasValidPrefix) {
        urlCheck.classList.add('is-invalid');
        urlCheck.classList.remove('is-valid');
        return false;
    }

    // Extract the part of the URL after the valid prefix
    const prefix = validPrefixes.find(prefix => siteUrl.startsWith(prefix));
    const urlWithoutPrefix = siteUrl.slice(prefix.length);

    // Check if the URL ends with a valid top-level domain
    const match = urlWithoutPrefix.match(tldPattern);
    if (!match) {
        urlCheck.classList.add('is-invalid');
        urlCheck.classList.remove('is-valid');
        return false;
    }

    // Extract the part before the TLD
    const domainAndPath = urlWithoutPrefix.slice(0, -match[0].length);

    // Check if there's at least one characters between the prefix and the TLD
    if (domainAndPath.length < 1) {
        urlCheck.classList.add('is-invalid');
        urlCheck.classList.remove('is-valid');
        return false;
    }

    urlCheck.classList.add('is-valid');
    urlCheck.classList.remove('is-invalid');
    return true;
}

function isValidName(){
    var numOfChar = document.getElementById('siteName');
    if(numOfChar.value.length < 3){
        numOfChar.classList.add('is-invalid');
        numOfChar.classList.remove('is-valid');
    }else{
        numOfChar.classList.add('is-valid');
        numOfChar.classList.remove('is-invalid');
    }
}

// method 2 - without http
// function isValidUrl(siteUrl) {
//     try {
//       new URL(siteUrl);
//       urlCheck.classList.add('is-valid');
//       urlCheck.classList.remove('is-invalid');
//       return true;
//     } catch (err) {
//         urlCheck.classList.add('is-invalid');
//         urlCheck.classList.remove('is-valid');
//         return false;
//     }
// }


// method 2 - with http
// function isValidUrl(siteUrl) {
//     try {
//         var newUrl = new URL(siteUrl);
//         const allowedProtocols = ['http:', 'https:']; // Add or remove protocols as needed
//         urlCheck.classList.add('is-valid');
//         urlCheck.classList.remove('is-invalid');
//       return allowedProtocols.includes(newUrl.protocol);
//     } catch (err) {
//       urlCheck.classList.add('is-invalid');
//       urlCheck.classList.remove('is-valid');    
//       return false;
//     }
//   }


// method 3 - without http
// function isValidUrl(siteUrl) {
//     const pattern = new RegExp(
//       "^([a-zA-Z]+:\\/\\/)?" + // protocol
//         "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
//         "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR IP (v4) address
//         "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
//         "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
//         "(\\#[-a-z\\d_]*)?$", // fragment locator
//       "i"
//     );
//     if(pattern.test(siteUrl)){
//          urlCheck.classList.add('is-valid');
//          urlCheck.classList.remove('is-invalid');
//     }else{
//          urlCheck.classList.add('is-invalid');
//          urlCheck.classList.remove('is-valid');
//      }
//     return pattern.test(siteUrl);
//   }


// method 3 - with http
// function isValidHttpUrl(siteUrl) {
//     const pattern = new RegExp(
//       "^(https?:\\/\\/)?" + // protocol
//         "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
//         "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
//         "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
//         "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
//         "(\\#[-a-z\\d_]*)?$", // fragment locator
//       "i"
//     );
//     if(pattern.test(siteUrl)){
//          urlCheck.classList.add('is-valid');
//          urlCheck.classList.remove('is-invalid');
//     }else{
//          urlCheck.classList.add('is-invalid');
//          urlCheck.classList.remove('is-valid');
//      }
//     return pattern.test(siteUrl);
//   }