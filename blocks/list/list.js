import { fetchPlaceholders,getMetadata } from '../../scripts/aem.js';
const placeholders = await fetchPlaceholders('');

async function createList(jsonURL,val) {
    let  pathname = null;
    if(val){
        pathname=jsonURL;
    }else{
        pathname= new URL(jsonURL);
    }
    
    const resp = await fetch(pathname);
    const json = await resp.json();
    console.log("=====JSON=====> {} ",json);
    const list=document.createElement("ol");
    list.innerHTML = '';
    json.data.forEach((row,i) => {
        const listItem=document.createElement('li');
        listItem.textContent=row.Countries+'  -  '+row.Abbreviation;
        list.appendChild(listItem);

    })
    return list;
}
export default async function decorate(block) {
    const countries = block.querySelector('a[href$=".json"]');
    const parientDiv=document.createElement('div');
    parientDiv.classList.add('contries-block');
    if(countries){
        parientDiv.append(await createList(countries.href,null));
        countries.replaceWith(parientDiv);
    }

}