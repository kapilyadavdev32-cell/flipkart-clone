// Banner Slider Functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }
    
    slides[currentSlide].classList.add('active');
}

function changeSlide(direction) {
    showSlide(currentSlide + direction);
}

// Auto-play slider
setInterval(() => {
    changeSlide(1);
}, 3000);

// Search functionality
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

searchBtn.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

function performSearch() {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        alert(`Searching for: ${searchTerm}`);
        // In a real application, this would redirect to search results page
    }
}

// Cart functionality
let cartCount = 0;
const cartCountElement = document.querySelector('.cart-count');

// Add to cart functionality for product cards
document.addEventListener('DOMContentLoaded', () => {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('click', () => {
            addToCart(card);
        });
    });
    
    // Login button
    const loginBtn = document.querySelector('.login-btn');
    loginBtn.addEventListener('click', () => {
        showLoginModal();
    });
    
    // View all buttons
    const viewAllBtns = document.querySelectorAll('.view-all-btn');
    viewAllBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            alert('Redirecting to all products...');
        });
    });
});

function addToCart(productCard) {
    const productName = productCard.querySelector('h3').textContent;
    const productPrice = productCard.querySelector('.price').textContent;
    
    cartCount++;
    cartCountElement.textContent = cartCount;
    
    // Show notification
    showNotification(`${productName} added to cart!`);
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background-color: #4caf50;
        color: white;
        padding: 15px 20px;
        border-radius: 4px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        z-index: 2000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function showLoginModal() {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'login-modal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="closeModal()"></div>
        <div class="modal-content">
            <button class="close-btn" onclick="closeModal()">×</button>
            <h2>Login</h2>
            <form id="loginForm" onsubmit="handleLogin(event)">
                <input type="email" placeholder="Enter Email/Mobile number" required>
                <input type="password" placeholder="Enter Password" required>
                <button type="submit">Login</button>
            </form>
            <p>New to Flipkart? <a href="#">Create an account</a></p>
        </div>
    `;
    
    // Add modal styles
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
        .login-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 3000;
        }
        
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.5);
        }
        
        .modal-content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: white;
            padding: 40px;
            border-radius: 4px;
            width: 400px;
            max-width: 90%;
        }
        
        .close-btn {
            position: absolute;
            top: 10px;
            right: 10px;
            background: none;
            border: none;
            font-size: 30px;
            cursor: pointer;
            color: #999;
        }
        
        .modal-content h2 {
            margin-bottom: 20px;
            color: #2874f0;
        }
        
        .modal-content input {
            width: 100%;
            padding: 12px;
            margin-bottom: 15px;
            border: 1px solid #ddd;
            border-radius: 2px;
            font-size: 14px;
        }
        
        .modal-content button[type="submit"] {
            width: 100%;
            padding: 12px;
            background-color: #fb641b;
            color: white;
            border: none;
            border-radius: 2px;
            font-size: 16px;
            font-weight: 500;
            cursor: pointer;
        }
        
        .modal-content button[type="submit"]:hover {
            background-color: #f55a1b;
        }
        
        .modal-content p {
            margin-top: 20px;
            text-align: center;
            color: #878787;
            font-size: 14px;
        }
        
        .modal-content a {
            color: #2874f0;
            text-decoration: none;
            font-weight: 500;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    
    document.head.appendChild(modalStyles);
    document.body.appendChild(modal);
}

function closeModal() {
    const modal = document.querySelector('.login-modal');
    if (modal) {
        document.body.removeChild(modal);
    }
}

function handleLogin(event) {
    event.preventDefault();
    alert('Login successful!');
    closeModal();
    
    // Update login button to show user name
    const loginBtn = document.querySelector('.login-btn');
    loginBtn.textContent = 'User';
}

// Dynamic product loading simulation
function loadMoreProducts() {
    const productsData = [
        { 
            name: 'Tablet', 
            price: 'From ₹8,999', 
            offer: 'Up to 35% Off',
            image: 'https://rukminim2.flixcart.com/image/200/200/ktketu80/tablet/f/y/b/sm-t225nzaains-samsung-original-imag6ve3kzphenbx.jpeg?q=70'
        },
        { 
            name: 'Power Bank', 
            price: 'From ₹699', 
            offer: 'Up to 65% Off',
            image: 'https://rukminim2.flixcart.com/image/200/200/xif0q/power-bank/j/i/v/power-bank-dx09-20000-mah-20000-dx09-20k-callmate-original-imagn22tuac3hqnz.jpeg?q=70'
        },
        { 
            name: 'Earphones', 
            price: 'From ₹399', 
            offer: 'Up to 75% Off',
            image: 'https://rukminim2.flixcart.com/image/200/200/kpinwy80/headphone/x/r/e/euro-110-euro-series-earphones-with-mic-boult-audio-original-imag3qkqhyhzeyht.jpeg?q=70'
        },
        { 
            name: 'USB Cable', 
            price: 'From ₹149', 
            offer: 'Up to 80% Off',
            image: 'https://rukminim2.flixcart.com/image/200/200/xif0q/data-cable/usb-type-c-cable/b/b/n/-original-imagq5jqzjqtqjzq.jpeg?q=70'
        },
        { 
            name: 'Mouse', 
            price: 'From ₹299', 
            offer: 'Up to 70% Off',
            image: 'https://rukminim2.flixcart.com/image/200/200/xif0q/mouse/9/3/n/-original-imagsfwbzxwfehtg.jpeg?q=70'
        }
    ];
    
    const dealsGrid = document.getElementById('dealsProducts');
    
    productsData.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">${product.price}</p>
            <p class="offer">${product.offer}</p>
        `;
        
        productCard.addEventListener('click', () => {
            addToCart(productCard);
        });
        
        dealsGrid.appendChild(productCard);
    });
}

// Scroll to top functionality
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        if (!document.querySelector('.scroll-top')) {
            const scrollTopBtn = document.createElement('button');
            scrollTopBtn.className = 'scroll-top';
            scrollTopBtn.innerHTML = '↑';
            scrollTopBtn.style.cssText = `
                position: fixed;
                bottom: 30px;
                right: 30px;
                background-color: #2874f0;
                color: white;
                border: none;
                border-radius: 50%;
                width: 50px;
                height: 50px;
                font-size: 20px;
                cursor: pointer;
                box-shadow: 0 2px 10px rgba(0,0,0,0.2);
                z-index: 1000;
                transition: opacity 0.3s;
            `;
            
            scrollTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
            
            document.body.appendChild(scrollTopBtn);
        }
    } else {
        const scrollTopBtn = document.querySelector('.scroll-top');
        if (scrollTopBtn) {
            document.body.removeChild(scrollTopBtn);
        }
    }
});