var drive = document.querySelector('.drive');
var newFolderBtn = document.querySelector('#newFolder');
var layoutNewFolder = document.querySelector('.layoutNewFolder');

var dragID = 3;
var deletedItems = 0;
var trashCapacity = 4;

var createButton = document.querySelector('.create');
var cancelButton = document.querySelector('.cancel');
var closeButton = document.querySelector('.innerFolder .fa-times');
var inputFolder = document.querySelector('#folderName');

//trashbin for drag&drop
var trashbin = document.querySelector('.trashHolder');


// Right click event - show drive div
document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
    if (e.target.tagName == "BODY") {
        

        var top = e.pageY;
        var left = e.pageX;
        var driveWidth = drive.clientWidth;
        var driveHeight = drive.clientHeight;

        var windowWidth = window.innerWidth - 20;
        var windowHeight = window.innerHeight;

        //Adjust left
        if (left + driveWidth > windowWidth) {
            left -= driveWidth;
        }

        //Adjust top
        if (top + driveHeight > windowHeight) {
            top -= driveHeight;
        }

        drive.style.top = top + "px";
        drive.style.left = left + "px";
        drive.classList.add("show");
    };
});

// Left click event - hide drive div
document.addEventListener("click", hideDrive);

// Enter key event - hide drive div
document.addEventListener("keyup", function (e) {
    if (e.which == 27) {
        hideDrive();
    }
});

// Function for hiding drive
function hideDrive() {
    if (drive.classList.contains("show")) {
        drive.classList.remove("show");
    }
}

newFolderBtn.addEventListener("click", function () {
    layoutNewFolder.style.display = "block";
    inputFolder.select();
});

// Add events to close and cancel buttons

cancelButton.onclick = closeNewFolder;
closeButton.onclick = closeNewFolder;

function closeNewFolder(){
    layoutNewFolder.style.display = "none";
}

inputFolder.oninput = disableCreate;

// function for disabling create button
function disableCreate(){
    if(inputFolder.value == ""){
        createButton.setAttribute("disabled", true);
    }
    else{
        createButton.removeAttribute("disabled");
    }
}   

// Create button click event for adding new folder
createButton.onclick = function(){
    var name = inputFolder.value;

    var el = document.createElement('div');
    el.setAttribute("draggable", true);
    el.setAttribute("data-dragID", dragID++);
    el.className = "folder";

    el.ondragstart =  dragStart;
    el.ondragend =  dragEnd;
    
    var i = document.createElement('i');
    i.className = "fas fa-folder";

    
    el.appendChild(i);
    el.innerHTML  += name;

    document.querySelector('main').appendChild(el);
    closeNewFolder();

}


// DRAGGABLE EVENT STARTS HERE

var draggables = document.querySelectorAll('.folder');

for(var draggable of draggables){
    draggable.ondragstart = dragStart;
    draggable.ondragend = dragEnd;
}

trashbin.addEventListener("dragover", function(e){
    e.preventDefault();
})

trashbin.addEventListener("drop", function(e){
    var icons = document.querySelectorAll('.trashbin i');
    for(var icon of icons){
        icon.classList.remove('trashAnimation');
    }

    deletedItems++;
    if(deletedItems / trashCapacity < 0.8){
        var dragID = e.dataTransfer.getData("dragID");
        var dragEl = document.querySelector('[data-dragID = "'+ dragID +'" ]');
        dragEl.remove();
        
        updateTrash();
    }else{
        for(var icon of icons){
            icon.classList.add('trashAnimation');
        }
        deletedItems--;
    }

   
    
})


// function for dragstart
function dragStart(e){
    e.dataTransfer.setData("dragID", e.target.getAttribute("data-dragid"));    
    e.target.classList.add("dragging");
}

function dragEnd(e){
    e.target.classList.remove("dragging");
}

function updateTrash(){
    var percent = (1 - (deletedItems / trashCapacity))*100;
    
    document.querySelector('.trashbin.deletedPart').style.color = "red";
    document.querySelector('.trashbin.deletedPart').style.clipPath = "polygon(0% "+percent+"%, 100% "+percent+"%, 100% 100%, 0% 100%)";
    
}