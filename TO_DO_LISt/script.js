document.addEventListener("DOMContentLoaded", function() {
    loadList(); 
});

function newElement() {
    const inputValue = document.getElementById("myInput").value.trim();
    if (inputValue === '') {
        alert("You must write task!");
        return;
    }

 
    const li = document.createElement("li");
    li.textContent = inputValue;

    
    const span = document.createElement("span");
    span.textContent = "\u00D7";
    span.className = "close";
    li.appendChild(span);

  
    document.getElementById("myList").appendChild(li);
    document.getElementById("myInput").value = ""; 


    span.addEventListener("click", function() {
        li.remove();
        saveList();
    });

    saveList(); 
}


function saveList() {
    const items = [];
    const listItems = document.querySelectorAll('#myList li');
    listItems.forEach(item => {
        items.push({
            text: item.firstChild.textContent, 
            checked: item.classList.contains('checked') 
        });
    });
    localStorage.setItem('listItems', JSON.stringify(items));
}


function loadList() {
    const items = JSON.parse(localStorage.getItem('listItems')) || [];
    items.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item.text;
        if (item.checked) {
            li.classList.add('checked'); 
        }

        const span = document.createElement("span");
        span.textContent = "\u00D7";
        span.className = "close";
        li.appendChild(span);

        
        document.getElementById("myList").appendChild(li);


        span.addEventListener("click", function() {
            li.remove();
            saveList(); 
        });
    });
}


document.getElementById('myList').addEventListener('click', function(ev) {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked'); 
        saveList();
    }
});
