<script>
  // Initialize an empty array to store cart items
  let cart = [];

  // Get DOM elements to update cart and PDF preview
  const cartContent = document.getElementById("cart-content");
  const cartTotal = document.getElementById("cart-total");
  const pdfList = document.getElementById("pdf-list");
  const pdfTotal = document.getElementById("pdf-total");

  // Add event listeners to all "Add to Cart" buttons
  document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
      // Get item name and price from data attributes
      const name = button.getAttribute("data-name");
      const price = parseFloat(button.getAttribute("data-price"));

      // Add selected item to the cart array
      cart.push({ name, price });

      // Update the cart UI and PDF preview
      updateCart();
    });
  });

  // Function to update cart display and PDF content
  function updateCart() {
    // Clear existing content in cart and PDF list
    cartContent.innerHTML = "";
    pdfList.innerHTML = "";

    // Initialize total amount
    let total = 0;

    // Loop through items in the cart array
    cart.forEach((item, index) => {
      // Add item price to total
      total += item.price;

      // Create a new div for each cart item
      const row = document.createElement("div");
      row.className = "d-flex justify-content-between align-items-center mb-2";

      // Set inner HTML with item name, price and a remove button
      row.innerHTML = `
        <span>${item.name} - ₹ ${item.price}</span>
        <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">Remove</button>
      `;

      // Append the item row to cart content
      cartContent.appendChild(row);

      // Add item to the hidden PDF list
      const li = document.createElement("li");
      li.textContent = `${item.name} - ₹ ${item.price}`;
      pdfList.appendChild(li);
    });

    // Update total amounts in both cart and PDF
    cartTotal.textContent = total.toFixed(2);
    pdfTotal.textContent = total.toFixed(2);
  }

  // Function to remove an item from the cart
  function removeFromCart(index) {
    // Remove item at the specified index from the cart array
    cart.splice(index, 1);

    // Refresh the cart and PDF content
    updateCart();
  }

  // Function to generate and download the PDF of the order
  function downloadPDF() {
    // Get the hidden PDF content element
    const element = document.getElementById("pdf-content");

    // Temporarily display it so html2pdf can read its content
    element.style.display = "block";

    // Generate PDF using html2pdf with configuration
    html2pdf()
      .set({
        margin: 1,
        filename: 'hotel-order.pdf', // Name of the downloaded PDF file
        image: { type: 'jpeg', quality: 0.98 }, // Image quality settings
        html2canvas: { scale: 2 }, // Better resolution
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' } // Page setup
      })
      .from(element) // Source element for the PDF
      .save() // Start the download
      .then(() => {
        // Hide the PDF content after download
        element.style.display = "none";
      });
  }
</script>




-----------------------------------------------------------------
// Get the login form element by its ID
const form = document.getElementById("loginForm");

// Get the error message element by its ID
const errorText = document.getElementById("error");

// Add a submit event listener to the form
form.addEventListener("submit", function (e) {
  // Prevent the default form submission behavior (which would reload the page)
  e.preventDefault();

  // Get the trimmed value from the email input field
  const email = document.getElementById("email").value.trim();

  // Get the trimmed value from the password input field
  const password = document.getElementById("password").value.trim();

  // Search the "students" array for a student with matching email and password
  const foundStudent = students.find(s => s.email === email && s.password === password);

  // If a matching student is found
  if (foundStudent) {
    // Save the logged-in student to localStorage as a JSON string
    localStorage.setItem("loggedInStudent", JSON.stringify(foundStudent));

    // Redirect the user to the profile page
    window.location.href = "profile.html";
  } else {
    // If no match found, show the error message by removing the "d-none" class
    errorText.classList.remove("d-none");
  }
});

