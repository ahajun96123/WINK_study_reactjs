// Get the modal
let modal = document.getElementById('myModal');
let deleteModal = document.getElementById('deleteModal');

// Get the button that opens the modal
let wrtieBtn = document.getElementById("writeBtn");
let deleteBtn = document.getElementById("deleteBtn");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
wrtieBtn.onclick = function() {
    modal.style.display = "block";
}
deleteBtn.onclick = function() {
    deleteModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
    deleteModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target === modal || event.target === deleteModal) {
        modal.style.display = "none";
        deleteModal.style.display = "none";
    }
}


window.onload = async ()=>{
    const feedResponse = await fetch('http://ec2-52-78-131-251.ap-northeast-2.compute.amazonaws.com/feed/', {
        method: 'get',
    });
    const posts = await feedResponse.json();

    for (let i = 0; i < posts.length; i++){
        let writer = posts[i].owner;
        let content = posts[i].content;
        await post(writer, content);
    }
}
let timeline = document.querySelector("#timeline");
const validate = (description, name)=>{
    if (description === "" || name === "") alert("작성자 또는 내용을 입력해주세요");
}
const postStart = (validation)=>{
    let name = document.querySelector("#name").value;
    let description = document.querySelector("#text").value;
    console.log(name);
    modal.style.display = "none";
    if (validation){
        validate(description, name);
    }else{
        post(name, description);
    }
}
const post = async(name, description)=>{
    await fetch('http://ec2-52-78-131-251.ap-northeast-2.compute.amazonaws.com/feed/', {
        method: 'POST',
        body: JSON.stringify({
            owner: name,
            content: description,
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(res => res.json())
        .then(res => {
            let container = document.createElement("div");
            let writer = document.createElement("h1");
            let contents = document.createElement("p");

            writer.appendChild(document.createTextNode(name));
            contents.appendChild(document.createTextNode(description));
            container.appendChild(writer);
            container.appendChild(contents);
            container.setAttribute("class", "container");

            timeline.appendChild(container);
        })
}