var siteName = document.getElementById('bName');
var siteURL = document.getElementById('bURL');
var btnSubmit = document.getElementById('btnSubmit');
var vlaidurl = document.getElementById('vlaidURL')
var searchField = document.getElementById('inSearchField');

bookmark = [];



siteName.addEventListener('keyup', validName)
siteURL.addEventListener('keyup', validURL)

var vName = ``;
var vUrl = ``;

function validName(){
    var regexName = /^\w{3,}(\s+\w+)*$/ ;
    var sName = siteName.value;
    if(regexName.test(sName)){
        console.log('vailid name');
        return true;
    } 
    // displayWarningName()
}
function validURL(){
    var regexURL = /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;
    var sURL = siteURL.value;
    if(regexURL.test(sURL)){
        console.log('vailid url');
        return true;
    } 
    // displayWarningURL()
}
function displayWarningName(){
    vName = `
        <p class="warning-statement p-2"><i class="fa-sharp fa-regular fa-circle-xmark text-danger"></i>
        Site name must contain at least 3 characters
        <span class="d-block ms-3 ps-1 text-secondary">Ex: RouteAcademy</span>
        </p>`
    console.log('aaaa');
    document.getElementById('vlaidName').innerHTML = vName;
}
function displayWarningURL(){
    vUrl= `
        <p class="warning-statement p-2"><i class="fa-sharp fa-regular fa-circle-xmark text-danger"></i>
        Site URL must be a valid one 
        <span class="d-block ms-3 ps-1 text-secondary">Ex: https://routeacademy.github</span>
        </p>`
    console.log('uuuu');
    document.getElementById('vlaidURL').innerHTML = vUrl;
}

function createBookmark(){
    if(validName() && validURL()){
        var book = {
            bname:siteName.value,
            burl:siteURL.value
        }
        bookmark.push(book);
        localStorage.setItem('lsit', JSON.stringify(book));    
        console.log(bookmark);
        document.getElementById('setSearchField').innerHTML=`<input type="text" onkeyup="search()" class="form-control btn-site w-100 m-auto border-warning" id="searchInput" placeholder="search..." />`
        clearField();
        display();
    }else if(validName()){
        displayWarningURL();
    }else{
        displayWarningName();
    }
}


// if(localStorage.getItem('list') !== null){
//     bookmark =JSON.parse(localStorage.getItem('array'));
//     display();
//     }

function clearField(){
    siteName.value = "";
    siteURL.value = "";
}

function display(){
var cartona=``;
for(var i=0;i<bookmark.length;i++){
cartona +=`
    <tr>
    <td>${i+1}</td>
    <td>${bookmark[i].bname}</td>
    <td><button class="btn visit-btn "><a href="${bookmark[i].burl}" target="_blank" class="py-2 px-3"><i class="fa-regular fa-eye p-2 me-1"></i>Visit</a></button></td>
    <td><button onclick="deletebookmark(${i})" class="btn btn-outline-danger py-2 px-3"><i class="fa fa-trash me-2"></i>Delete</button></td>
    </tr>
    `
    }
    document.getElementById('tableBody').innerHTML=cartona;
    var warning = document.querySelectorAll('.commonval');
    warning.classlis.add('d-none')
}

function deletebookmark(index) {
    bookmark.splice(index,1);
    display();
}

function search(){
    var cartona=``;
    for(var i=0;i<bookmark.length;i++){
    if(bookmark[i].bname.includes(searchField.value)){
        cartona +=`
            <tr>
            <td>${i+1}</td>
            <td>${bookmark[i].bname}</td>
            <td><button class="btn visit-btn "><a href="${bookmark[i].burl}" target="_blank" class="py-2 px-3"><i class="fa-regular fa-eye p-2 me-1"></i>Visit</a></button></td>
            <td><button onclick="deletebookmark(${i})" class="btn btn-outline-danger py-2 px-3"><i class="fa fa-trash me-2"></i>Delete</button></td>
            </tr>
            `
        }
    }
    display()
}