console.log("index js ok")

const counterNo = document.querySelector(".counterNo")
// counterNo.innerHTML=2;

window.onload = async () =>{
    const result = await fetch("/getcounter")
    if (result.ok){
        const data = await result.json()
        console.log(data)
        counterNo.innerHTML = data.counter
    }
}


document
  .querySelector('#create-form')
  .addEventListener('submit', async function (event) {
    event.preventDefault()
    //console.log("sent")
    //console.log(event.target)

    // Serialize the Form afterwards
    const content = event.target.content.value
    //console.log(content)
    const image = event.target.avatar.files[0]
    //console.log(image)


    const formData = new FormData()

    formData.append('content', content)
    formData.append('image', image)


    // Submit FormData(), no need to add "Content-Type": "application/json"
    const res = await fetch('/memo', {
      method: 'POST',
      body: formData,
    })

    const result = await res.json()
    if (res.ok){
        console.log("sucess")
        await getAllMemos();
    } else {
        console.log("fail")
    }// { success: true }
    // document.querySelector('#contact-result').textContent = result
  })

document
  .querySelector('#login-form')
  .addEventListener('submit', async function (event) {
    event.preventDefault()
    //console.log("login sent")
    console.log(event.target)

    // Serialize the Form afterwards
    const formObject = {
        username: event.target.username.value,
        password: event.target.password.value
    }

    console.log(formObject)

    // Submit FormData(), no need to add "Content-Type": "application/json"
    const res = await fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formObject),
    })

    const result = await res.json()
    if (res.ok){
        console.log("sucess submit login info")
        console.log(result)
        if(result.status === "sucess"){
          window.location = "/admin.html"
        } else {
          alert("Please input correct username & password.")
        }
        
    } else {
        
    }// { success: true }
    // document.querySelector('#contact-result').textContent = result
  })




window.onload = async () => {
  await getAllMemos();
}

async function getAllMemos(){
  const res = await fetch('/memo', {
    method: 'GET',
  })

  const result = await res.json()
    if (res.ok){
        //console.log(result)
        
        let memoshtml;
        for (i=0; i<result.length;i++){
          let wordcontent = result[i].content;
          let imagepath = result[i].image;
          let memoId = result[i].memoId;
          
          memoshtml = memoshtml ? memoshtml + `<div class="memosingle">
                    <div class="memo">${wordcontent}<img src="/${imagepath}"></div>
                    
          </div>` : `<div class="memosingle">
                    <div class="memo">${wordcontent}<img src="/${imagepath}"></div>
          </div>`
          // <div class="memo">${wordcontent}<img src="/${imagepath}"></div>
        }
        //console.log(memoshtml)
        document.querySelector(".memolist").innerHTML = memoshtml;
        //console.log(document.querySelector(".memolist").innerHTML)
        await delmemo();
    } 
}


async function delmemo(){
  const delButtons = document.querySelectorAll('.del');
  delButtons.forEach(delButton => {
    console.log(delButton)
    delButton.addEventListener('click', async function(event) {
         console.log(event.currentTarget.classList[1]); // Log the clicked element
         //delTargetId = event.currentTarget.classList[1];
         const formObject = {
          delTargetId: event.currentTarget.classList[1]
         }
         const res = await fetch('/memo', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formObject),
        })

        const result = await res.json()
        if (res.ok){
            console.log("sucess submit del req");
            getAllMemos();
            
        }
         
     });
  });  
  return;
}




