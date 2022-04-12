const addbtn = document.getElementById("add");

// /updating to local storage
const updateLSData = () => {
  const textAreaData = document.querySelectorAll("textarea");
  const notes = [];
  textAreaData.forEach((note) => {
    return notes.push(note.value);
  });

  localStorage.setItem("notes", JSON.stringify(notes));
};

const addNewNote = (text = "") => {
  const note = document.createElement("div");
  note.classList.add("note");
  const htmlData = `
<div class="operation">
    <Button class="edit"><i class="fa-solid fa-pen-to-square"></i></Button>
    <Button class="delete"><i class="fa-solid fa-trash-can"></i></Button>
    
    
</div>
 <div class="main ${text ? "" : "hidden"}"> </div>
    <textarea class = "${text ? "hidden" : ""}"> </textarea>

`;
  note.insertAdjacentHTML("afterbegin", htmlData);

  // getting reference
  const editbutton = note.querySelector(".edit");
  const deletebutton = note.querySelector(".delete");
  const mainDiv = note.querySelector(".main");
  const textarea = note.querySelector("textarea");

  //deleting the notes
  deletebutton.addEventListener("click", () => {
    note.remove();
    updateLSData();
  });

  textarea.value = text;
  mainDiv.innerHTML = text;
  // edit button

  editbutton.addEventListener("click", () => {
    mainDiv.classList.toggle("hidden");
    textarea.classList.toggle("hidden");
  });
  textarea.addEventListener("change", (event) => {
    const value = event.target.value;
    mainDiv.innerHTML = value;

    updateLSData();
  });

  document.body.appendChild(note);
};
// getting back from localStorage
const notes = JSON.parse(localStorage.getItem("notes"));
if (notes) {
  notes.forEach((note) => addNewNote(note));
}

addbtn.addEventListener("click", () => addNewNote());
