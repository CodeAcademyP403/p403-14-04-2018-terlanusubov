var dragItems = document.querySelectorAll(".dragItems");
var dropOuter = document.querySelectorAll(".DropOuter");

// DROP UCUN PREVENT DEAFULT
for(var dropabble of dropOuter ){
    dropabble.addEventListener("dragover", function(e){
        e.preventDefault();
    })
}

// DRAG START OLANDA DATA GOTUR
for(var draggable of dragItems){
    draggable.addEventListener("dragstart", DragStart);

}

function DragStart(e){
    console.log(e.target);
   e.dataTransfer.setData("dragid", e.target.getAttribute("data-dragid"));
}

for(var dropabble of dropOuter ){
    dropabble.addEventListener("drop", function(e){
        console.log(e.target.getAttribute("data-dropid"));
        var dragID = e.dataTransfer.getData("dragid");
        var dragEl = document.querySelector('[data-dragid="'+dragID+'"]');
        var dropEl = document.querySelector('[data-dropid="'+e.target.getAttribute("data-dropid")+'"]');
        
        dropEl.children[0].style.display = "block";
        dropEl.children[0].innerHTML = dragEl.innerHTML;
        dragEl.style.display = "none";
    })
}
