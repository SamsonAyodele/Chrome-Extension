// let myLeads = ["www.awesomelead.com", "www.epiclead.com", "www.greatlead.com"]
let myLeads = []
let inputEl = document.getElementById("input-el")

let inputBtn = document.getElementById("input-btn")

let ulEl = document.getElementById("ul-el")

let deletebtn = document.getElementById("delete-btn")

let tabBtn = document.getElementById("tab-btn")

const leadsFromLocalStorage = JSON.parse( localStorage.getItem('myLeads') )

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        // listItems += "<li><a target='_blank' href='" + myLeads[i] + "'>" +  myLeads[i] + "</a></li>"
        //template string 
        listItems += `
        <li>
            <a target='_blank' href='${leads[i]}'>
                ${leads[i]}
            </a>
        </li>
        `
        //another method
       // const li = document.createElement("li")
        //li.textContent = myLeads[i]
       // ulEl.append(li)
    }
    ulEl.innerHTML = listItems
}

tabBtn.addEventListener("clicks", function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
   
})

deletebtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem( 'myLeads', JSON.stringify(myLeads) )
    render(myLeads)
})


