const form = document.querySelector('form');
const result = document.querySelector('.result');
 
form.addEventListener('submit',
(e)=>{
    e.preventDefault();
    getword(form.elements[0].value);
});
 const getword =async(word)=>{
    try {
    result.innerHTML= 'fetching data';
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
   const data= await  response.json();
   console.log(data); 
   let definations = data[0].meanings[0].definitions[0];
   result.innerHTML= `
    <h3><strong>word:- </strong>${word}</h3>
    <p><strong>part Of Speech:- </strong>${data[0].meanings[0].partOfSpeech}</p>
    <p><strong>Definition:- </strong>${definations.definition === undefined? "not found":definations.definition}</p>
    <p><strong>example:- </strong>${definations.example=== undefined? "not found":definations.example}</p>
    <p><strong>antonyms:- </strong></p>

`;
if(definations.antonyms.length===0){
    result.innerHTML += `<span>not found</span>`;
}else{
    for(let i=0;i<definations.antonyms.length;i++){
    result.innerHTML += `<li>${definations.antonyms[i]}</li>`}
 }
  result.innerHTML += `<div><a href= '${data[0].sourceUrls}' target= "-blank">read more</a></div>`

}
 
catch (error) {
        result.innerHTML= `<i>sorry, word not found </i>`
}
}