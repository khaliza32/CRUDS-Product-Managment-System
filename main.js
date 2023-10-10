let title =document.getElementById('title');
let price=document.getElementById('price');
let taxes =document.getElementById('taxes');
let ads =document.getElementById('ads');
let discount =document.getElementById('discount');
let count =document.getElementById('count');
let total =document.getElementById('total');
let category =document.getElementById('category');
let sumbit =document.getElementById('sumbit');
let moode='create';
let j;
let dataPro;


// get total

function getTotal(){
 if(price.value !='')
 {
    let result =(+price.value + +taxes.value + +ads.value)- +discount.value;
    total.innerHTML=result;
    total.style.background='#040';
 }
 else{
    total.innerHTML='';
    total.style.background='#a00d02';
 }
}
//  add data

if(localStorage.product != null){
    dataPro=JSON.parse (localStorage.product)
}
else{
    dataPro=[]
}
sumbit.onclick= function(){
  let newPro = {
    title:title.value.toLowerCase(),
    price:price.value,
    taxes:taxes.value,
    ads:ads.value,
    discount:discount.value,
    total:total.innerHTML,
    count:count.value,
    category:category.value.toLowerCase(),
    


  }
  if(title.value !='' && price.value !='' && category.value !='' && newPro.count<100 ){
     if(moode ==='create'){
          if(newPro.count > 1)
            {
              for(i=0 ;i< newPro.count;i++){
                dataPro.push(newPro);

              }
            }
            else{
              dataPro.push(newPro);
            }
            
  }
  else{
    dataPro[j]=newPro;
    moode = 'create';
    sumbit.innerHTML='create';
    count.style.display='block';
    
  }
  cleardata()
  }
 
 
  

  localStorage.setItem('product', JSON.stringify(dataPro) );
  
  showdata() 
}
// clean data
function cleardata(){
  title.value='';
  price.value='';
  taxes.value='';
  ads.value='';
  discount.value='';
  total.innerHTML='';
  count.value='';
  category.value='';
  

}
// read data
function showdata()
 {
  getTotal()
      let table= '';  
      for (let i = 0 ; i < dataPro.length ; i++)
       {
          table += `<tr>
          <td>${i+1}</td>
          <td>${dataPro[i].title }</td>
          <td>${dataPro[i].price +' DH'}</td>
          <td>${dataPro[i].taxes +' DH'}</td>
          <td>${dataPro[i].ads +' DH'}</td>
          <td>${dataPro[i].discount +' DH'}</td>
          
          <td>${dataPro[i].total +' DH'}</td>
          <td>${dataPro[i].category}</td>
          
          <td><button onclick="updatedata(   ${i}     )"  id="update">update</button></td>
          <td><button onclick="deletedata(   ${i}     )" id="delete">delete</button></td>

      </tr>`;
       }

 document.getElementById('tby').innerHTML = table;
 let btn=document.getElementById('delteall');
 if(dataPro.length>0){
  btn.innerHTML=`
  <button onclick="deleteAll()" >delete All ( ${dataPro.length} )</button>
  `

 }
 else{
  btn.innerHTML='';

 }


}
showdata()

//delete data
function deletedata(i){

  dataPro.splice(i,1);
  localStorage.product=JSON.stringify(dataPro);
  showdata()
}
// delete all data
function deleteAll(){
  localStorage.clear();
  dataPro.splice(0);
  showdata();
}
// update data
{
  function updatedata(i){
    title.value=dataPro[i].title;
    price.value=dataPro[i].price;
    taxes.value=dataPro[i].taxes;
    ads.value=dataPro[i].ads;
    discount.value=dataPro[i].discount;
    getTotal();
    count.style.display='none';

    category.value=dataPro[i].category;
    sumbit.innerHTML='update';
    moode='update'
    j=i;
    scroll({
      top:0,
      behavior:'smooth'
      
    })
  }
}

// serach data


let serchdat='title';


function getserch(id){
  let serch=document.getElementById('search');
  if(id=='serchTit'){
    serchdat='title';
    // serch.placeholder='search by Title ';
  }else{
    serchdat='category';
   // serch.placeholder='search by category ';
  }
  serch.placeholder='search by '+serchdat;
  serch.focus();
  serch.value= '';
  showdata();

}
//serch button
function serchdata(value){
  let table='';
  for(i=0 ; i< dataPro.length;i++){
  if(serchdat == 'title'){
     
      if(dataPro[i].title.includes(value.toLowerCase()))
      {
        table += `<tr>
          <td>${i+1}</td>
          <td>${dataPro[i].title}</td>
          <td>${dataPro[i].price}</td>
          <td>${dataPro[i].taxes}</td>
          <td>${dataPro[i].ads}</td>
          <td>${dataPro[i].discount}</td>
          
          <td>${dataPro[i].total}</td>
          <td>${dataPro[i].category}</td>
          
          <td><button onclick="updatedata(   ${i}     )"  id="update">update</button></td>
          <td><button onclick="deletedata(   ${i}     )" id="delete">delete</button></td>

      </tr>`;
      
      
    }
  }else{
    

      if(dataPro[i].category.includes(value.toLowerCase()))
      {
        table += `<tr>
          <td>${i+1}</td>
          <td>${dataPro[i].title}</td>
          <td>${dataPro[i].price}</td>
          <td>${dataPro[i].taxes}</td>
          <td>${dataPro[i].ads}</td>
          <td>${dataPro[i].discount}</td>
          
          <td>${dataPro[i].total}</td>
          <td>${dataPro[i].category}</td>
          
          <td><button onclick="updatedata(   ${i}     )"  id="update">update</button></td>
          <td><button onclick="deletedata(   ${i}     )" id="delete">delete</button></td>

      </tr>`;
      }
      
    

  }
}
  document.getElementById('tby').innerHTML = table;
}

// clean data