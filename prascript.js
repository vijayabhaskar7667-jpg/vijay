const productscontainer = document.getElementById("productcontainer");
const feedBackElement = document.querySelector(".feedback");
const products = [
    {
        id : 1, 
        nam : "Laptop", 
        price : 2000,
    },
    {
        id : 2, 
        nam : "mobile", 
        price : 30000,
    },
    {
        id : 3, 
        nam : "phone", 
        price : 4000,
    }
];
const cart = [];
products.forEach(function(product){
    console.log(product);
    const productRow = `
    <div class = product-row>
    <p>${product.nam} Rs- ${product.price}<p>
    <button onclick="addToCart(${product.id})"> Add to cart <button>
    <div>
    `;
    productscontainer.insertAdjacentHTML("beforeend", productRow);
    feedBackElement.textContent = `${product.nam} is added to the cart`;
})
function addToCart(id){
    console.log("clicked", id);
    const productToAdd = products.find(function(e){
        return e.id === id;
        console.log(productToAdd);
    })
    cart.push(productToAdd);
    console.log(cart);
    
};





setTimeout(()=>{
    feedBackElement.textContent = "Namasthe javascript";
}, 2000);

function rendercartdetails(){
    products.forEach(function(product){
        
    })
}