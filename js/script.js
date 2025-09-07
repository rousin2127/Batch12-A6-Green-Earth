console.log('ready to cooking ')

//  category section 
const loadCategory = () => {
    fetch('https://openapi.programming-hero.com/api/categories')
        .then(res => res.json())
        .then(json => displayCategory(json.categories))
}




const displayCategory = (categories) => {

    const allCategory = document.getElementById('all-category')
    allCategory.innerHTML = '';

    categories.forEach(category => {

        const btnDiv = document.createElement('div')
        btnDiv.innerHTML = `
       <button onclick=loadTreeContainer(${category.id}) class="w-full hover:bg-[#DCFCE7] hover:cursor-pointer text-[14px] text-left px-[5px] py-[3px] rounded-[3px] my-[5px] ">${category.category_name} </button>
        `
        allCategory.append(btnDiv)

        // console.log(category)
    })
}
loadCategory()


// category 

const loadTreeContainer=(id)=>{
    const url=`https://openapi.programming-hero.com/api/category/${id}`
    fetch(url)
    .then(res=> res.json())
    .then(data=>displayTreeContainer(data.plants))
}
const displayTreeContainer=(plants)=>{
    
    const treeContainer = document.getElementById('tree-container');
    treeContainer.innerHTML = "";


    
    plants.forEach(plant =>{
        const cardDiv = document.createElement('div')
        cardDiv.innerHTML =`
        <div id="card-tree " class="bg-white p-[10px] rounded-sm w-[250px] space-y-2 h-full">
                    <img class="h-[200px] w-full rounded-sm " src="${plant.image} "  alt="">
                    <h4 class="font-bold mt-[5px]">${plant.name} </h4>
                    <p class="text-[12px]  ">${plant.description} </p>
                    <div class="flex justify-between mt-[10px]">
                        <span class="text-[14px] bg-[#DCFCE7] px-[10px] py-[2px] rounded-xl">${plant.category} </span>
                        <span class="text-[14px] font-semibold">ট${plant.price} </span>
                    </div>
                    <button class="w-full mt-[15px] mb-[10px] bg-[#15803D] text-white text-[14px] h-[30px] rounded-2xl">Add to Cart</button>
                </div>
        `
        treeContainer.append(cardDiv)

        console.log(plant)
    })
}




// all tree container 

const loadAllTreeContainer = () => {
    console.log();
    fetch('https://openapi.programming-hero.com/api/plants')
        .then(res => res.json())
        .then(data => displayAllTreeContainer(data.plants))
}
const displayAllTreeContainer = (plants) => {

    const allTreeContainer = document.getElementById('tree-container');
    allTreeContainer.innerHTML = "";

    plants.forEach(plant => {
        const cardDiv = document.createElement('div')
        cardDiv.innerHTML = `
                    <div id="card-tree " class="bg-white p-[10px] rounded-sm w-[250px] space-y-2 h-full">
                    <img class="h-[200px] w-full rounded-sm " src="${plant.image} "  alt="">
                    <h4 class="font-bold mt-[5px]">${plant.name} </h4>
                    <p class="text-[12px]  ">${plant.description} </p>
                    <div class="flex justify-between mt-[10px]">
                        <span class="text-[14px] bg-[#DCFCE7] px-[10px] py-[2px] rounded-xl">${plant.category} </span>
                        <span class="text-[14px] font-semibold">ট${plant.price} </span>
                    </div>
                    <button class="w-full mt-[15px] mb-[10px] bg-[#15803D] text-white text-[14px] h-[30px] rounded-2xl">Add to Cart</button>
                </div>
        
        `;
        allTreeContainer.append(cardDiv)
        // console.log(plant)
    })
    // console.log(plants)
}
loadAllTreeContainer()


// // Difference category container

