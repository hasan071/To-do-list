
let add = document.querySelector(".add")

let inputField = document.querySelector(".inputField")

let output = document.querySelector(".output")

let arrayOfTasks = []

if ( localStorage.getItem("AllTasks") ) {
    arrayOfTasks = JSON.parse(localStorage.getItem("AllTasks"))
}

function renderTasks (){
    output.innerHTML = ""

    arrayOfTasks.forEach( el => {
        let taskStyle = el.done ? "opacity: 0.5; background-color : black;" : "opacity: 1; background-color : brown;"
        let buttonContent = el.done ? `<i class="fa-solid fa-check"></i>` : `Done`

        output.innerHTML += ` 
        <div class = "input" id = ${el.id} style="${taskStyle}">
            <p>${el.content}</p>
            <button class="done">${buttonContent}</button>
            <button class="del" onclick = "Delete()">Delete</button>
        </div>`
    })
}

window.onload = function () {
    inputField.focus()

    if ( arrayOfTasks.length>0 ){
        renderTasks()
    }
    // output.innerHTML = ""
    //     JSON.parse(localStorage.getItem("AllTasks")).forEach(el => {
    //         output.innerHTML += ` 
    //     <div class = "input" id = ${el.id} style="opacity: 1;">
    //         <p>${el.content}</p>
    //         <button class="done">Done</button>
    //         <button class="del" onclick = "Delete()">Delete</button>
    //     </div>`

    //     console.log(el.done.value);
    // });
    
    
    
}

// let done = document.querySelector(".done")
// console.log(done);

// let i = 1
function addToStorage (){
    if ( inputField.value ){
        let task = {
            id : Date.now(),
            content : inputField.value,
            done : false
        }

        arrayOfTasks.push(task)
        localStorage.setItem("AllTasks",JSON.stringify(arrayOfTasks))
    }
}

function addTask(){
    if ( inputField.value ){
        addToStorage()
        renderTasks()
        // output.innerHTML = ""
        // JSON.parse(localStorage.getItem("AllTasks")).forEach(el => {
        //     output.innerHTML += ` 
        // <div class = "input" id = ${el.id} style="opacity: 1;">
        //     <p>${el.content}</p>
        //     <button class="done">Done</button>
        //     <button class="del" onclick = "Delete()">Delete</button>
        // </div>`
        // });
            inputField.value = ""
            inputField.focus()
        }
    }
    
    add.onclick = addTask

document.addEventListener("click",function(event){
    if ( event.target.className == "del" ){
        event.target.parentElement.remove()

        arrayOfTasks = JSON.parse(localStorage.getItem("AllTasks"))

        arrayOfTasks = arrayOfTasks.filter( el => {
            return el.id != event.target.parentElement.id
        })

        localStorage.setItem("AllTasks",JSON.stringify(arrayOfTasks))

        renderTasks()
        // output.innerHTML = ""
        // JSON.parse(localStorage.getItem("AllTasks")).forEach( el =>{
        //     output.innerHTML += ` 
        // <div class = "input" id = ${el.id} style="opacity: 1;">
        //     <p>${el.content}</p>
        //     <button class="done">Done</button>
        //     <button class="del" onclick = "Delete()">Delete</button>
        // </div>`
        // })
    }
})

                
document.addEventListener("click",function(event){
    if ( event.target.className == "done" ){
        let taskId = event.target.parentElement.id
        let taskIndex = arrayOfTasks.findIndex(task => task.id == taskId)

        if ( taskIndex != -1 ){
            arrayOfTasks[taskIndex].done = !arrayOfTasks[taskIndex].done

            localStorage.setItem("AllTasks",JSON.stringify(arrayOfTasks))
            
            if ( arrayOfTasks[taskIndex].done ){
                event.target.parentElement.style.cssText = "background-color :black; opacity :0.5;"
                event.target.innerHTML = `<i class="fa-solid fa-check"></i>`
        }
        else {
            event.target.parentElement.style.cssText = " background-color :brown"
            event.target.parentElement.style.opacity = "1"
            event.target.innerHTML = `Done`
            }
        }
    }
})

// localStorage.clear()
