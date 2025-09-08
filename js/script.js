console.log("Cocking Green Earth")

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
       <button id="category-btn-${category.id}" onclick=loadTreeContainer(${category.id}) class="w-full hover:bg-[#DCFCE7] hover:cursor-pointer text-[14px] text-left px-[5px] py-[3px] rounded-[3px] my-[3px] allCategory-btn ">${category.category_name} </button>
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
        <div id="card-tree " class="bg-white p-[10px] rounded-sm w-[250px] mx-auto space-y-2 h-full">
                    <img class="h-[200px] w-full rounded-sm " src="${plant.image} "  alt="">
                    <h4 onclick="my_modal_5.showModal()" class="font-bold mt-[5px] hover:cursor-pointer ">${plant.name}</h4>
                    <p class="text-[11px] text-justify text-[#404040]  ">${plant.description} </p>
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
                    <div id="card-tree " class="bg-white p-[10px] rounded-sm w-[250px] mx-auto space-y-2 h-full">
                    <img class="h-[200px] w-full rounded-sm " src="${plant.image} "  alt="">
                    <h4 class="font-bold mt-[5px]">${plant.name} </h4>
                    <p class="text-[11px] text-justify text-[#404040]  ">${plant.description} </p>
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




// item into cart 

// ================= Add to Cart =================
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

const cartContainer = document.getElementById("card-item");
let cart = [];
let totalPrice = 0;

const addToCart = (plantName, plantPrice) => {
    let existing = cart.find(item => item.name === plantName);

    if (existing) {
        existing.quantity += 1;
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
    cartContainer.innerHTML = "";
    totalPrice = 0;

    if (cart.length === 0) {
        return; 
    }
    cart.forEach(item => {
        totalPrice += item.price * item.quantity;
        const cartItem = document.createElement("div");
        cartItem.className = "flex justify-between items-center bg-green-50 p-2 rounded mb-2";
        cartItem.innerHTML = `
            <div>
                <p class="font-semibold">${item.name}</p>
                <p class="text-sm text-gray-600">৳${item.price} x ${item.quantity}</p>
            </div>
            <button class="text-red-500 font-bold" onclick="removeFromCart('${item.name}')">x</button>
        `;
        cartContainer.appendChild(cartItem);
    });

    const totalDiv = document.createElement("div");
    totalDiv.className = "flex justify-between font-bold border-t pt-2 mt-2";
    totalDiv.innerHTML = `
        <span>Total:</span>
        <span>৳${totalPrice}</span>
    `;
    cartContainer.appendChild(totalDiv);
};
