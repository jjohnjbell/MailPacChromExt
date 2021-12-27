window.onload = () => {
    let myLinks = []
    const links = JSON.parse(localStorage.getItem("myLinks"))
    const results = document.getElementById("results")
    const getLinksBtn = document.getElementById("myBtn")
    const deleteBtn = document.getElementById("deleteBtn-El")

    deleteBtn.addEventListener("click",function(){
        localStorage.clear()
    })

    if (links) {
        myLinks = links
        render(myLinks)
    }

    getLinksBtn.addEventListener("click", function (e) {
        e.preventDefault()

        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            myLinks.push(tabs[0].url)
        })
        localStorage.setItem("myLinks", JSON.stringify(myLinks))
        render(myLinks)
    })

    function render(leads) {
       results.innerHTML = ""
        for (let i = 0; i < leads.length; i++) {
               results.innerHTML += `<div class= "well"> ${myLinks[i]} </div>`
        }
    }
}