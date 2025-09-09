console.log("Cocking Green Earth")

const showLoading=()=>{
    const treeContainer=document.getElementById('tree-container')
    treeContainer.innerHTML=`
                <div id="loading-spinner"
                class=" flex fixed inset-0 items-center justify-center bg-white bg-opacity-70 z-50">
                <div class="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
    
    `
}

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
       <button id="category-btn-${category.id}" onclick=loadTreeContainer(${category.id}) class="sm:w-full hover:bg-[#DCFCE7] hover:cursor-pointer text-[12px] sm:text-[14px] text-left px-[5px] py-[3px] rounded-[3px] active mb-[3px] allCategory-btn">${category.category_name} </button>
        `
        allCategory.append(btnDiv)

        // console.log(category)
    })
}
loadCategory()



// remove active from btn 

const removeActive = () => {
    const categoryBtn = document.querySelectorAll('.allCategory-btn')
    categoryBtn.forEach(btn => btn.classList.remove("active"))


}
// category 

const loadTreeContainer = (id) => {
    const url = `https://openapi.programming-hero.com/api/category/${id}`
    showLoading()
    
    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeActive();
            const clickBtn = document.getElementById(`category-btn-${id}`)
            clickBtn.classList.add("active")
            console.log(clickBtn)
            displayTreeContainer(data.plants)
        })
}
const displayTreeContainer = (plants) => {

    const treeContainer = document.getElementById('tree-container');
    treeContainer.innerHTML = "";



    plants.forEach(plant => {
        const cardDiv = document.createElement('div')
        cardDiv.innerHTML = `
        <div id="card-tree " class="bg-white p-[10px] rounded-sm w-[350px] sm:w-[250px] mx-auto space-y-2 h-full">
                    <img class="h-[200px] w-full rounded-sm " src="${plant.image} "  alt="">
                    <h4 onclick="loadTreeDetail(${plant.id})" class="font-bold mt-[5px] hover:cursor-pointer ">${plant.name}</h4>
                    <p class="text-[11px] text-justify text-[#404040] overflow-hidden text-ellipsis line-clamp-3 ">${plant.description} </p>
                    <div class="flex justify-between mt-[10px]">
                        <span class="text-[14px] bg-[#DCFCE7] px-[10px] py-[2px] rounded-xl">${plant.category} </span>
                        <span class="text-[14px] font-semibold">ট${plant.price} </span>
                    </div>
                    <button class="w-full mt-[15px] mb-[10px] bg-[#15803D] text-white text-[14px] h-[30px] rounded-2xl hover:cursor-pointer add-to-cart">Add to Cart</button>
                </div>
        `
        const button = cardDiv.querySelector(".add-to-cart");
        button.addEventListener("click", () => {
            addToCart(plant.name, plant.price);
        });

        treeContainer.append(cardDiv)

        // console.log(plant)
    })
}



// all tree container 

const loadAllTreeContainer = () => {
    removeActive();
    showLoading()
    console.log();
    fetch('https://openapi.programming-hero.com/api/plants')
    
        .then(res => res.json())
        .then(data => {
            removeActive();
            const allBtn = document.getElementById("all-trees-btn");
            allBtn.classList.add("active");
            displayAllTreeContainer(data.plants)
        })
}
const displayAllTreeContainer = (plants) => {

    const allTreeContainer = document.getElementById('tree-container');
    allTreeContainer.innerHTML = "";

    plants.forEach(plant => {
        const cardDiv = document.createElement('div')
        cardDiv.innerHTML = `
                    <div id="card-tree " class="bg-white p-[10px] rounded-sm w-[350px] sm:w-[250px] mx-auto space-y-2 h-full">
                    <img class="h-[200px] w-full rounded-sm " src="${plant.image} "  alt="">
                    <h4 onclick="loadTreeDetail(${plant.id})" class="font-bold mt-[5px] hover:cursor-pointer">${plant.name} </h4>
                    <p class="text-[11px] text-justify text-[#404040] overflow-hidden text-ellipsis line-clamp-3 ">${plant.description} </p>
                    <div class="flex justify-between mt-[10px]">
                        <span class="text-[14px] bg-[#DCFCE7] px-[10px] py-[2px] rounded-xl">${plant.category} </span>
                        <span class="text-[14px] font-semibold">ট${plant.price} </span>
                    </div>
                    <button class="w-full mt-[15px] mb-[10px] bg-[#15803D] text-white text-[14px] h-[30px] rounded-2xl hover:cursor-pointer add-to-cart">Add to Cart</button>
                </div>
        
        `;
        const button = cardDiv.querySelector(".add-to-cart");
        button.addEventListener("click", () => {
            addToCart(plant.name, plant.price);
        });

        allTreeContainer.append(cardDiv)
        // console.log(plant)
    })
    // console.log(plants)
}
loadAllTreeContainer()


// Add Model

const loadTreeDetail=(id)=>{
    const url=`https://openapi.programming-hero.com/api/plant/${id}`

    fetch(url)
    .then(res=> res.json())
    .then(detail=> displayTreeDetail(detail.plants))
}

const displayTreeDetail=(plants)=>{
    console.log(plants)
    const detailsBox=document.getElementById('details-container')
    detailsBox.innerHTML=`
     <h3 class="font-bold">${plants.name}</h3>
                    <div>
                        <img class="h-[150px] w-full" src="${plants.image}" alt="">
                    </div>
                    <div>
                        <p><strong class="text-[14px]">Category:</strong><span class="text-[12px]">${plants.category}</span></p>
                        <p><strong class="text-[14px]">Price:</strong><span class="text-[12px]">ট${plants.price}</span></p>
                        <p><strong class="text-[14px]">Description:</strong><span class="text-[12px]">${plants.description}</p>
                    </div>

    
    `
    
    document.getElementById("plants_modal").showModal()
}


// item into cart 

// const cartContainer = document.getElementById("card-item");

// const addToCart = (plantName, plantPrice) => {
//     const cartItem = document.createElement("div");
//     cartItem.className = "flex justify-between items-center border-b py-2 text-sm";

//     cartItem.innerHTML = `
//         <span>${plantName}</span>
//         <span class="font-semibold">৳${plantPrice}</span>
//     `;

//     cartContainer.appendChild(cartItem);
// };

const cartContainerDesktop = document.getElementById("card-item");
const cartContainerMobile = document.getElementById("mobile-cart-items");
let cart = [];
let totalPrice = 0;

const addToCart = (plantName, plantPrice) => {
    let existItem = cart.find(item => item.name === plantName);

    if (existItem) {
        existItem.quantity += 1;
    } else {
        cart.push({ name: plantName, price: plantPrice, quantity: 1 });
    }

    updateCart();
};

const removeFromCart = (plantName) => {
    cart = cart.filter(item => item.name !== plantName);
    updateCart();
};

const updateCart = () => {
    cartContainerDesktop.innerHTML = "";
    cartContainerMobile.innerHTML = "";
    totalPrice = 0;

    if (cart.length === 0) {
        document.getElementById("cart-count").innerText = 0;
        return; 
    }

    cart.forEach(item => {
        totalPrice += item.price * item.quantity;

        const cartItemHTML = `
            <div class="flex justify-between items-center bg-green-50 p-2 rounded mb-2">
                <div>
                    <p class="font-semibold text-[14px]">${item.name}</p>
                    <p class="text-[12px] text-gray-600">৳${item.price} x ${item.quantity}</p>
                </div>
                <button class="text-red-500 hover:cursor-pointer " onclick="removeFromCart('${item.name}')">x</button>
            </div>
        `;

        cartContainerDesktop.innerHTML += cartItemHTML;
        cartContainerMobile.innerHTML += cartItemHTML;
    });

    const totalDiv = `
        <div class="flex justify-between font-bold border-t border-gray-300 pt-1 mt-2">
            <span class="text-[12px]">Total:</span>
            <span class="text-[12px]">৳${totalPrice}</span>
        </div>
    `;

    cartContainerDesktop.innerHTML += totalDiv;
    cartContainerMobile.innerHTML += totalDiv;

    // Update badge
    document.getElementById("cart-count").innerText = cart.length;
};

function toggleCart() {
    const cart = document.getElementById("mobile-cart");
    cart.classList.toggle("translate-x-full");
}
