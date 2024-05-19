// Assignment 10
// Bookmarker

var submitSite = document.getElementById('submit');
var site = {name:'', url:''};
var siteList = [];
var fullUrl;

submitSite.addEventListener('click', addSite);

function addSite(){

    site = {
        name: document.getElementById('siteName').value.trim(),
        url: document.getElementById('siteURL').value.trim()
    };
    if(site.name != '' && site.url != ''){
        // if(isValidUrl(site.url)){
            siteList.push(site);
            localStorage.setItem('site', JSON.stringify(siteList))
            display()
        // }else{
            // window.alert('Please enter a valid URL');
        // }
    }else{
        window.alert('Please fill all fields');
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
            <td>${siteList[i].name}</td>
            <td><button onClick="visitSite(${i})"><i class="fa-regular fa-eye"></i> Visit</button></td>
            <td><button onClick="deleteSite(${i})"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
        </tr>`;
    }

    document.getElementById('tableBody').innerHTML = HTMLcode;
}

(function(){
    siteList = JSON.parse(localStorage.getItem('site'));
    display()
})()

function visitSite(index){
    window.open('https://' + siteList[index].url,"_blank");
}

function deleteSite(index){
    siteList.splice(index,1);
    localStorage.setItem('site', JSON.stringify(siteList));
    display();
}

// method 1: Validating URL with Regex
// method 2: URL object
// method 3: npm Packages

var validateUrl = document.getElementById('validate');
validateUrl.addEventListener('click', isValidUrl);

// method 1 - without http
// function isValidUrl() {
//     const pattern = new RegExp(
//       "^([a-zA-Z]+:\\/\\/)?" + // protocol
//         "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
//         "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR IP (v4) address
//         "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
//         "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
//         "(\\#[-a-z\\d_]*)?$", // fragment locator
//       "i"
//     );
//     return pattern.test(document.getElementById('siteURL').value.trim());
//   }

// method 1 - with http
// function isValidHttpUrl() {
//     const pattern = new RegExp(
//       "^(https?:\\/\\/)?" + // protocol
//         "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
//         "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
//         "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
//         "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
//         "(\\#[-a-z\\d_]*)?$", // fragment locator
//       "i"
//     );
//     return pattern.test(document.getElementById('siteURL').value.trim());
//   }

// method 2 - without http
// function isValidUrl() {
//     try {
//       new URL(document.getElementById('siteURL').value.trim());
//     } catch (err) {
//         return false;
//     }
//     return true;
// }

// method 2 - with http
// function isValidUrl() {
//     try {
//         var newUrl = new URL(document.getElementById('siteURL').value.trim());
//       return ["http:", "https:"].includes(newUrl.protocol);
//     } catch (err) {
//       return false;
//     }
//   }

// method 3 - without http
// 
// import isUrl from "is-url";
// function isValidUrl() {
//     if(isUrl(document.getElementById('siteURL').value.trim())){
//         return true;
//     }
//     return false;
// }

// method 3 - with http
// npm install is-url-http
// import isUrlHttp from "is-url-http";
// function isValidUrl() {
//     if(isUrlHttp(document.getElementById('siteURL').value.trim())){
//         return true;
//     }
//     return false;
// }