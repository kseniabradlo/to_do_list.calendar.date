
let input = document.querySelector(".input");
let addBtn = document.querySelector(".addBtn");
let taskList = document.querySelector(".taskList");
taskList.classList.add("taskList");

let tasks = []; 
let newAr = [];

addBtn.addEventListener("click", addTaskToTheList);
input.addEventListener("keydown", function(e){
    if(e.code === "Enter")
    addTaskToTheList() 
})

function addTaskToTheList() {
    if (input.value) {

        let newTask = new Task(input.value);
        newTask.createIn(taskList);
        tasks.push(newTask);

        input.value = "";
  
    }
}


class Task {
    constructor(text) {
        this.text = text;
        this.isDone = false;
        this.div = null;

        this.work = false;
        this.leisure = false;
        this.health = false;
        this.house = false;
    }

    createIn(element) {
        this.div = document.createElement("div");
        this.div.classList.add("task");

        let input = document.createElement("input");
        input.addEventListener("click", () => this.changeState(this.div));
        input.type = "checkbox";

        let p = document.createElement("p");
        p.innerText = this.text;
        p.classList.add("divP");

        let selector = document.createElement("select");
        selector.classList.add("filterBtnTask");
        
    
        let optWork = document.createElement("option");
        let p2 = document.createElement("p");
        p2.innerText = "Робота";
        optWork.append(p2);
        selector.append(optWork);
    
        let optHealth = document.createElement("option");
        let p3 = document.createElement("p");
        p3.innerText = "Здоров'я";
        optHealth.append(p3);
        selector.append(optHealth);
    
        let optLeisure = document.createElement("option");
        let p4 = document.createElement("p");
        p4.innerText = "Вільний час";
        optLeisure.append(p4);
        selector.append(optLeisure);
    
        let optHouse = document.createElement("option");
        let p5 = document.createElement("p");
        p5.innerText = "Побут";
        optHouse.append(p5);
        selector.append(optHouse);
       


        this.div.append(input);
        this.div.append(p);
        element.append(this.div);

    }

    changeState(element) {
        this.isDone = !this.isDone;
        element.classList.toggle("completed");
        }

}



let notDone = document.querySelector(".notDone");
notDone.addEventListener("click", showNotDoneTasks);

        function showNotDoneTasks(){
            taskList.innerHTML = "";

            newAr = tasks.filter((task) => task.isDone != true);
            console.log(newAr);
            for (const task of newAr){
              taskList.append(task.div);
          }
        }




  let showAllTasks = document.querySelector(".allTasks");
  showAllTasks.addEventListener("click", showAllHandler);
  
  function showAllHandler(){  
      taskList.innerHTML = "";
      
      for (const task of tasks){
        taskList.append(task.div);
      }
  }




let now = new Date();
let x = now.toLocaleDateString('pl-PL');

let date = document.querySelector(".date");
date.innerText = x;

let y = now.toLocaleTimeString('pl-PL').slice(0,-3);
let time = document.querySelector(".time");
time.innerText = y;



function createCalendar(elem, year, month){
    elem = document.querySelector(elem);

    let mon = month - 1;
    let d = new Date(year,mon);

    let table = `
    <table>
       <tr>
         <th>Mon</th>
         <th>Tue</th>
         <th>Wed</th>
         <th>Thur</th>
         <th>Fri</th>
         <th>Sat</th>
         <th>Sun</th>
       </tr>
       <tr>
    `;

     
    for(let i=0; i<getDay(d);i++){
        table += `<td></td>`
    }

    while(d.getMonth() == mon){
        table += `<td>` + d.getDate() + `</td>`
        if(getDay(d)%7 == 6){
            table += `<tr></tr>` 
        }
        d.setDate(d.getDate()+1)
    }

    if(getDay(d) != 0){
        for(let i=getDay(d); i<7; i++){
            table += `<td></td>`
        }
    }

    table += `<tr></table>`;
    elem.innerHTML = table;
}

function getDay(date){
    let day = date.getDay();
    if(day== 0) day = 7;
    return day - 1;
}

createCalendar(".wrapperRight", 2023, 10)