let today = new Date();
let dd = String(today.getDate());
let mm = String(today.getMonth() + 1); //January is 0!
let yyyy = today.getFullYear();
today = dd + '/' + mm + '/' + yyyy;
document.getElementById("current_date").innerHTML = today;

const input = document.querySelector("#add");
const  btn = document.querySelector("#btn");
const list = document.querySelector("#list");
let el = document.getElementsByTagName('li');

// add elements on click the button
btn.onclick = function(){    
    let txt = input.value;
    if(txt ==''){
      alert('you must write something');
    }else{
      li = document.createElement('li');
      li.innerHTML = txt;
      list.insertBefore(li,list.childNodes[0])
      removeBtn = document.createElement('button');
      removeBtn.innerHTML = "remove";
      li.append(removeBtn)
      input.value = '';
    }
    
};

//check the clicked elements
list.onclick = function(ev){
    if(ev.target.tagName == 'LI'){
         ev.target.classList.toggle('checked');
    }
};


document.getElementById("btnRemove").addEventListener('click',function(){
this.parentNode.remove();
});