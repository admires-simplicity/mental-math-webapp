// create div and textbox. text inputted to textbox will be displayed in div after submitting (keydown event.key=="Enter")

const div = document.createElement('div');
// set size
div.style.width = '200px';
div.style.height = '50px';
div.style.overflowY = 'auto';

document.body.appendChild(div);
const input = document.createElement('input');
document.body.appendChild(input);

input.addEventListener('keydown', function(event){
    if(event.key == "Enter"){
        div.innerHTML += input.value + '<br>';
        input.value = '';
        //auto scroll div
        div.scrollTop = div.scrollHeight;
    }
});