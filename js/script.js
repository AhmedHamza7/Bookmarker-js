var siteName = document.getElementById("siteName")
var siteURL = document.getElementById("siteURL")
var submitButton = document.getElementById("submitButton")
var visitButton = document.getElementById("visitButton")
var deleteButton = document.getElementById("deleteButton")
var content = document.getElementById("content")
var searchInput = document.getElementById("searchInput")
var invalidText = document.getElementById("invalidText")
var list = [];


// local storage 
if (localStorage.getItem('site') != null) {
    list = JSON.parse(localStorage.getItem('site'))
    displayData(list);
} else {
list = [];

}






function submitData() {
    if (validateURL() == true) {
        list.push({
            name:siteName.value,
            url:siteURL.value
        })
    
        localStorage.setItem('site',JSON.stringify(list))
        displayData(list)
        resetData()
    } else {
        invalidText.classList.replace("d-none", "d-block")
    }


}
function displayData(container) {
    
    var cartoona = ``
    for(i =0; i < container.length; i++) {
        cartoona += `<div class="url-item p-3 m-3">
        <div class="row">
            <h3 class="col-md-3 text-white">${container[i].name}</h3>
            <div class="col-md-9 url-buttons">
                <button class="btn btn-success" id="visitButton"><a href="${container[i].url}" target="_blank" class="text-decoration-none text-white">VISIT</a></button>
                <button class="btn btn-danger" id="deleteButton" onclick="deleteData(${i})">DELETE</button>
            </div>
        </div>
    </div>`
    }

    content.innerHTML = cartoona
}



function resetData() {
        siteName.value = "",
        siteURL.value =  ""

        siteURL.classList.remove("is-valid")
}



function deleteData(deletedIndex) {
    list.splice(deletedIndex,1)
    displayData(list)
    localStorage.setItem('site',JSON.stringify(list))

}   



function searchData() {

    var searched = []
    for (i=0; i < list.length; i++) {
        if(list[i].name.toLowerCase().includes(searchInput.value.toLowerCase()) == true) {
            searched.push(list[i])
        }
    }
    displayData(searched)
    console.log(searched)
    
}


function validateURL(){
    var regex = /^https:/

    if(regex.test(siteURL.value) == true){
        siteURL.classList.replace("is-invalid","is-valid")
        return true
    } else {
        siteURL.classList.add("is-invalid")
        return false
    }
}

