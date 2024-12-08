let stars = document.querySelectorAll(".ratings span");
let products = document.querySelectorAll(".ratings");

let ratings = JSON.parse(localStorage.getItem("rating")) || {};

// Function to update the star ratings display
function updateRatingDisplay() {
    for (let product of products) {
        let productId = product.dataset.productid;
        let ratingValueElement = document.getElementById(`rating-value-${productId}`);

        if (ratingValueElement) {
            let reversedStars = Array.from(product.children).reverse();

            if (ratings[productId]) {
                let index = parseInt(ratings[productId]) - 1;

                for (let i = 0; i <= index; i++) {
                    reversedStars[i].setAttribute("data-clicked", "true");
                }
                for (let i = index + 1; i < reversedStars.length; i++) {
                    reversedStars[i].removeAttribute("data-clicked");
                }

                // Update rating text
                ratingValueElement.innerText = `Rating: ${ratings[productId]}/5`;
            } else {
                // Set default text if no rating
                ratingValueElement.innerText = "Rating: 0/5";
                for (let star of reversedStars) {
                    star.removeAttribute("data-clicked");
                }
            }
        } else {
            console.warn(`Rating display element not found for product ID: ${productId}`);
        }
    }
}

// Initialize rating display when page loads
document.addEventListener('DOMContentLoaded', (event) => {
    updateRatingDisplay();
});

// Attach click event listeners to stars
for (let star of stars) {
    star.addEventListener("click", function() {
        let rating = this.dataset.rating;
        let productId = this.parentElement.dataset.productid;

        // Update the rating
        ratings[productId] = rating;
        localStorage.setItem("rating", JSON.stringify(ratings));

        // Update display
        updateRatingDisplay();
    });
}
