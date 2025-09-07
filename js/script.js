console.log('ready to cooking ')

const loadCategory = () => {
    fetch('https://openapi.programming-hero.com/api/categories')
        .then(res => res.json())
        .then(json => displayCategory(json.categories))
}

const displayCategory = (categories) => {

    const allCategory = document.getElementById('all-category')
    allCategory.innerHTML = ''

    categories.forEach(category => {

        const btnDiv=document.createElement('div')
        btnDiv.innerHTML=`
       <button class="w-full hover:bg-[#DCFCE7] hover:cursor-pointer text-[14px] text-left px-[5px] py-[3px] rounded-[3px] my-[5px] ">${category.category_name} </button>
        `
        allCategory.append(btnDiv)

        console.log(category)
    })
}
loadCategory()