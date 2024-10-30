
import { fetchPlaceholders,getMetadata } from '../../scripts/aem.js';
const placeholders = await fetchPlaceholders('');

const { abbreviation,countries,sn} = placeholders;
let currentPage=1;
let itemsPerPage=20;
let jsonURL='';

async function createTableHeader(table){

    let tr=document.createElement("tr");
    let sno=document.createElement("th");
    sno.appendChild(document.createTextNode(sn));
    let conuntry=document.createElement("th");
    conuntry.appendChild(document.createTextNode(countries));
    // let continenth=document.createElement("th");continenth.appendChild(document.createTextNode(continent));
    // let capitalh=document.createElement("th");capitalh.appendChild(document.createTextNode(capital));
    let abbr=document.createElement("th");
    abbr.appendChild(document.createTextNode(abbreviation));
    tr.append(sno);
    tr.append(conuntry);
    // tr.append(capitalh);
    // tr.append(continenth);
    tr.append(abbr);
    table.append(tr);
}
async function createTableRow(table,row,i){
    let tr=document.createElement("tr");
    let sno=document.createElement("td");
    sno.appendChild(document.createTextNode(i));
    let conuntry=document.createElement("td");
    conuntry.appendChild(document.createTextNode(row.Countries));
    let abbr=document.createElement("td");
    abbr.appendChild(document.createTextNode(row.Abbreviation));
    tr.append(sno);
    tr.append(conuntry);
    tr.append(abbr);
    table.append(tr);
   
}

async function getTotalRowCount() {
    const resp = await fetch(jsonURL);
    const jsonresp = await resp.json();
    return jsonresp.total || 0; //Return total rows from the JSON  
  }

  async function changePage(newPage) {
    const totalRows = await getTotalRowCount();
    const totalPages = Math.ceil(totalRows / itemsPerPage);
  
    if (newPage < 1 || newPage > totalPages) return; // Prevent going out of bounds
  
    currentPage = newPage;
    const table = document.querySelector(".contries-block table");
    table.innerHTML = "";
    const parentDiv = document.querySelector(".contries-block");
   
    parentDiv.innerHTML = ""; 
    parentDiv.append(await createTable(currentPage));
   
    const paginationControls = createPaginationControls(totalRows);
    parentDiv.append(paginationControls);
  }
// Create pagination
function createPaginationControls(totalRows) {
    const paginationDiv = document.createElement('div');
    paginationDiv.classList.add('pagination');
  
    const totalPages = Math.ceil(totalRows / itemsPerPage); 
    console.log(totalPages);
  
    // Create previous button
    const prevBtn = document.createElement('button');
    prevBtn.innerText = "Previous";
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener('click', () => changePage(currentPage - 1));
  
    paginationDiv.append(prevBtn);
  
    // Create page number buttons
    for(let i=1; i<= totalPages; i++) {
      const pageButton = document.createElement('button');
      pageButton.classList.add('page-number')
      pageButton.innerText = i;
      pageButton.disabled = i === currentPage;
      pageButton.addEventListener('click', () => changePage(i));
  
      paginationDiv.append(pageButton);
    }
  
    // Create next button
    const nextBtn = document.createElement('button');
    nextBtn.innerText = "Next";
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener('click', () => changePage(currentPage + 1));
  
    paginationDiv.append(nextBtn);
  
    return paginationDiv;
  
  }
async function createTable(page) {

     const offset = (page - 1) * itemsPerPage;
  const offsetURL = `${jsonURL}?offset=${offset}&limit=${itemsPerPage}`;

  const resp = await fetch(offsetURL);
  const jsonresp = await resp.json();
    console.log("=====JSON=====> {} ",jsonresp);
    
    const table = document.createElement('table');
    createTableHeader(table);
    jsonresp.data.forEach((row,i) => {

        createTableRow(table,row,(i+1));

      
    });
    return table;
   
}    

export default async function decorate(block) {
    const countries = block.querySelector('a[href$=".json"]');
    const parentDiv=document.createElement('div');
    parentDiv.classList.add('contries-block');

    if (countries) {
        jsonURL=countries.href;
        parentDiv.append(await createTable(currentPage));
        const totalRows = await getTotalRowCount(); 
        const paginationControls = createPaginationControls(totalRows); 
        parentDiv.append(paginationControls);
        countries.replaceWith(parentDiv);
    }
    
  }
