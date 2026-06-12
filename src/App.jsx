import { useState, useEffect } from 'react'
import {
  Heart,
  ShieldCheck,
  Leaf,
  Flame,
  Camera,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronDown,
  ChefHat,
  Dumbbell,
  Sparkles,
  ArrowRight,
  Menu,
  X,
  Star,
  Plus,
  Minus,
  ShoppingBag,
  Trash2,
  ShoppingCart,
  Truck,
  MapPinHouse
} from 'lucide-react'
import './App.css'

// Food-themed Loading Screen Component
function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [fillLevel, setFillLevel] = useState(0)
  const [phase, setPhase] = useState('loading') // loading, revealing, complete
  const [steamOffset, setSteamOffset] = useState(0)

  useEffect(() => {
    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 1.2
      })
    }, 35)

    // Bowl fill animation
    const fillInterval = setInterval(() => {
      setFillLevel(prev => {
        if (prev >= 100) {
          clearInterval(fillInterval)
          return 100
        }
        return prev + 1.5
      })
    }, 40)

    // Steam animation
    const steamInterval = setInterval(() => {
      setSteamOffset(prev => (prev + 1) % 20)
    }, 100)

    // Phase transitions
    const phaseTimer = setTimeout(() => setPhase('revealing'), 3000)
    const completeTimer = setTimeout(() => {
      setPhase('complete')
      setTimeout(onComplete, 800)
    }, 4500)

    return () => {
      clearInterval(progressInterval)
      clearInterval(fillInterval)
      clearInterval(steamInterval)
      clearTimeout(phaseTimer)
      clearTimeout(completeTimer)
    }
  }, [onComplete])

  return (
    <div className={`loading-screen ${phase === 'complete' ? 'loading-screen--fadeout' : ''}`}>
      {/* Animated Background */}
      <div className="loading-bg-gradient"></div>
      <div className="loading-particles">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="loading-particle" style={{ '--i': i }}></div>
        ))}
      </div>

      <div className="loading-content">
        {/* Food Bowl Animation */}
        <div className={`loading-bowl-container ${phase !== 'loading' ? 'loading-bowl-container--visible' : ''}`}>
          <svg className="loading-bowl" viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              {/* Bowl gradient */}
              <linearGradient id="bowlGradient" x1="100" y1="60" x2="100" y2="150" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#2a2a35"/>
                <stop offset="100%" stopColor="#1a1a22"/>
              </linearGradient>
              {/* Food gradient */}
              <linearGradient id="foodGradient" x1="100" y1="50" x2="100" y2="130" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#a855f7"/>
                <stop offset="50%" stopColor="#863bff"/>
                <stop offset="100%" stopColor="#7c3aed"/>
              </linearGradient>
              {/* Steam gradient */}
              <linearGradient id="steamGradient" x1="100" y1="0" x2="100" y2="50" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="rgba(168, 85, 247, 0.4)"/>
                <stop offset="100%" stopColor="rgba(168, 85, 247, 0)"/>
              </linearGradient>
            </defs>

            {/* Bowl Shadow */}
            <ellipse cx="100" cy="150" rx="80" ry="10" fill="rgba(0,0,0,0.3)"/>

            {/* Steam */}
            <g className="loading-steam" style={{ transform: `translateY(${steamOffset}px)` }}>
              <path d="M70 50 Q65 35, 75 20" stroke="url(#steamGradient)" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6"/>
              <path d="M100 45 Q95 25, 105 10" stroke="url(#steamGradient)" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.8"/>
              <path d="M130 50 Q135 35, 125 20" stroke="url(#steamGradient)" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6"/>
            </g>

            {/* Bowl */}
            <path d="M20 70 Q20 140, 100 145 Q180 140, 180 70 L175 65 Q175 60, 100 60 Q25 60, 25 65 Z" fill="url(#bowlGradient)" stroke="#3a3a45" strokeWidth="2"/>

            {/* Bowl Rim */}
            <ellipse cx="100" cy="62" rx="78" ry="12" fill="#2a2a35" stroke="#3a3a45" strokeWidth="2"/>

            {/* Food inside bowl - clips to fill level */}
            <clipPath id="bowlClip">
              <path d="M25 68 Q25 135, 100 140 Q175 135, 175 68 L175 62 Q175 57, 100 57 Q25 57, 25 62 Z"/>
            </clipPath>

            {/* Food fill */}
            <rect
              x="25"
              y={140 - (fillLevel * 0.75)}
              width="150"
              height={fillLevel * 0.75}
              fill="url(#foodGradient)"
              clipPath="url(#bowlClip)"
              style={{ transition: 'all 0.1s ease-out' }}
            />

            {/* Food topping decorations */}
            <g clipPath="url(#bowlClip)" className="loading-toppings">
              {/* Chicken pieces */}
              <circle cx="60" cy="70" r="8" fill="#e8b88a" opacity={fillLevel > 10 ? 1 : 0}/>
              <circle cx="130" cy="75" r="7" fill="#e8b88a" opacity={fillLevel > 20 ? 1 : 0}/>
              <circle cx="85" cy="65" r="6" fill="#e8b88a" opacity={fillLevel > 30 ? 1 : 0}/>

              {/* Vegetables */}
              <circle cx="100" cy="72" r="5" fill="#4ade80" opacity={fillLevel > 25 ? 1 : 0}/>
              <circle cx="75" cy="80" r="4" fill="#4ade80" opacity={fillLevel > 40 ? 1 : 0}/>
              <circle cx="120" cy="68" r="5" fill="#4ade80" opacity={fillLevel > 35 ? 1 : 0}/>

              {/* Rice/grain texture */}
              <circle cx="55" cy="90" r="2" fill="#d4a373" opacity={fillLevel > 50 ? 1 : 0}/>
              <circle cx="70" cy="85" r="2" fill="#d4a373" opacity={fillLevel > 55 ? 1 : 0}/>
              <circle cx="95" cy="95" r="2" fill="#d4a373" opacity={fillLevel > 60 ? 1 : 0}/>
              <circle cx="110" cy="88" r="2" fill="#d4a373" opacity={fillLevel > 65 ? 1 : 0}/>
              <circle cx="130" cy="92" r="2" fill="#d4a373" opacity={fillLevel > 70 ? 1 : 0}/>
              <circle cx="145" cy="85" r="2" fill="#d4a373" opacity={fillLevel > 75 ? 1 : 0}/>

              {/* Egg */}
              <ellipse cx="100" cy="78" rx="12" ry="8" fill="#ffd93d" opacity={fillLevel > 45 ? 1 : 0}/>
              <ellipse cx="100" cy="78" rx="6" ry="4" fill="#fff" opacity={fillLevel > 45 ? 0.8 : 0}/>
            </g>

            {/* Bowl shine */}
            <path d="M35 75 Q40 85, 35 95" stroke="rgba(255,255,255,0.1)" strokeWidth="3" fill="none" strokeLinecap="round"/>
          </svg>

          {/* Glow ring */}
          <div
            className="loading-bowl-glow"
            style={{ opacity: fillLevel / 150 }}
          ></div>
        </div>

        {/* Logo Text */}
        <div className={`loading-logo ${phase !== 'loading' ? 'loading-logo--visible' : ''}`}>
          <h1 className="loading-logo-text">
            Feast<span>&</span>Fit
          </h1>
          <p className="loading-tagline">Premium Protein Foods</p>
        </div>

        {/* Progress Bar */}
        <div className="loading-progress-container">
          <div className="loading-progress-bar">
            <div
              className="loading-progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
            <div
              className="loading-progress-shine"
              style={{ left: `${progress}%` }}
            ></div>
          </div>
          <div className="loading-progress-text">
            <span>Preparing your meal</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Food icons floating */}
        <div className="loading-food-icons">
          <span className="loading-food-icon" style={{ '--delay': '0s' }}>🍗</span>
          <span className="loading-food-icon" style={{ '--delay': '0.5s' }}>🥗</span>
          <span className="loading-food-icon" style={{ '--delay': '1s' }}>🍳</span>
          <span className="loading-food-icon" style={{ '--delay': '1.5s' }}>🥩</span>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState('all')
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const categories = [
    { id: 'all', name: 'All Items', icon: Sparkles },
    { id: 'protein', name: 'Protein Packs', icon: Dumbbell },
    { id: 'boiled', name: 'Boiled Delights', icon: Flame },
    { id: 'raw', name: 'Fresh & Raw', icon: Leaf },
    { id: 'meals', name: 'Meal Prep', icon: ChefHat },
  ]

  const products = [
    {
      id: 1,
      name: 'Premium Protein Box',
      description: 'Grilled chicken breast, hard-boiled eggs, broccoli & quinoa',
      price: 12.99,
      category: 'protein',
      calories: 420,
      protein: '32g',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
      rating: 4.9
    },
    {
      id: 2,
      name: 'Ocean Protein Bowl',
      description: 'Grilled salmon, asparagus, sweet potato & lemon butter',
      price: 15.99,
      category: 'protein',
      calories: 380,
      protein: '28g',
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop',
      rating: 4.8
    },
    {
      id: 3,
      name: 'Classic Boiled Eggs & Greens',
      description: '6 soft-boiled eggs, mixed greens, avocado & hemp seeds',
      price: 8.99,
      category: 'boiled',
      calories: 290,
      protein: '18g',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
      rating: 4.7
    },
    {
      id: 4,
      name: 'Rainbow Raw Platter',
      description: 'Seasonal crudités, hummus, tahini & seed mix',
      price: 9.99,
      category: 'raw',
      calories: 220,
      protein: '8g',
      image: 'https://images.unsplash.com/photo-1519996529931-28324d5a630e?w=400&h=300&fit=crop',
      rating: 4.6
    },
    {
      id: 5,
      name: 'Power Meal Prep Box',
      description: 'Weekly rotation of protein, carbs & veggies',
      price: 89.99,
      category: 'meals',
      calories: 350,
      protein: '25g',
      image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=400&h=300&fit=crop',
      rating: 4.9
    },
    {
      id: 6,
      name: 'Turkey & Veggie Bowl',
      description: 'Lean ground turkey, roasted vegetables & brown rice',
      price: 11.99,
      category: 'protein',
      calories: 410,
      protein: '30g',
      image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop',
      rating: 4.8
    },
    {
      id: 7,
      name: 'Detox Raw Salad',
      description: 'Kale, spinach, cucumber, celery & lemon ginger dressing',
      price: 7.99,
      category: 'raw',
      calories: 150,
      protein: '5g',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop',
      rating: 4.5
    },
    {
      id: 8,
      name: 'Boiled Chicken & Rice',
      description: 'Poached chicken, jasmine rice, carrots & parsley',
      price: 10.99,
      category: 'boiled',
      calories: 360,
      protein: '28g',
      image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&h=300&fit=crop',
      rating: 4.7
    },
  ]

  const features = [
    {
      icon: ShieldCheck,
      title: '100% Clean Ingredients',
      description: 'No preservatives, no additives — just pure, wholesome nutrition'
    },
    {
      icon: Flame,
      title: 'Freshly Boiled Daily',
      description: 'Every item cooked to perfection, maintaining maximum nutrition'
    },
    {
      icon: Leaf,
      title: 'Farm-Fresh Produce',
      description: 'Sourced daily from local organic farms'
    },
    {
      icon: Heart,
      title: 'Protein-Packed',
      description: 'Designed for fitness enthusiasts and healthy lifestyles'
    },
  ]

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory)

  const cartTotalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id)
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prevCart, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId)
      return
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    )
  }

  const getProductQuantity = (productId) => {
    const item = cart.find(item => item.id === productId)
    return item ? item.quantity : 0
  }

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />
  }

  return (
    <div className="app">
      {/* Navigation */}
      <nav className={`nav ${isScrolled ? 'nav--scrolled' : ''}`}>
        <div className="nav__container">
          <a href="#" className="nav__logo">
            <span className="nav__logo-icon">🍎</span>
            <span className="nav__logo-text">Feast<span>&</span>Fit</span>
          </a>

          <div className="nav__links">
            <a href="#menu" className="nav__link">Menu</a>
            <a href="#delivery" className="nav__link">Delivery</a>
            <a href="#about" className="nav__link">About</a>
            <a href="#features" className="nav__link">Why Us</a>
            <a href="#contact" className="nav__link">Contact</a>
          </div>

          <div className="nav__actions">
            <button className="nav__cart" onClick={() => setCartOpen(true)}>
              <ShoppingBag size={20} />
              {cartTotalItems > 0 && (
                <span className="nav__cart-count">{cartTotalItems}</span>
              )}
            </button>
            <a href="#menu" className="btn btn--primary">Order Now</a>
          </div>

          <button
            className="nav__mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`nav__mobile ${mobileMenuOpen ? 'nav__mobile--open' : ''}`}>
          <a href="#menu" className="nav__mobile-link" onClick={() => setMobileMenuOpen(false)}>Menu</a>
          <a href="#delivery" className="nav__mobile-link" onClick={() => setMobileMenuOpen(false)}>Delivery</a>
          <a href="#about" className="nav__mobile-link" onClick={() => setMobileMenuOpen(false)}>About</a>
          <a href="#features" className="nav__mobile-link" onClick={() => setMobileMenuOpen(false)}>Why Us</a>
          <a href="#contact" className="nav__mobile-link" onClick={() => setMobileMenuOpen(false)}>Contact</a>
          <a href="#menu" className="btn btn--primary btn--full" onClick={() => setMobileMenuOpen(false)}>Order Now</a>
        </div>
      </nav>

      {/* Cart Overlay */}
      <div
        className={`cart-overlay ${cartOpen ? 'cart-overlay--open' : ''}`}
        onClick={() => setCartOpen(false)}
      />

      {/* Cart Sidebar */}
      <div className={`cart-sidebar ${cartOpen ? 'cart-sidebar--open' : ''}`}>
        <div className="cart__header">
          <h2 className="cart__title">
            <ShoppingCart size={22} />
            Your Order
          </h2>
          <button className="cart__close" onClick={() => setCartOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <div className="cart__items">
          {cart.length === 0 ? (
            <div className="cart__empty">
              <div className="cart__empty-icon">
                <ShoppingBag size={48} />
              </div>
              <p>Your cart is empty</p>
              <span>Add some delicious items from our menu!</span>
              <a href="#menu" className="btn btn--primary" onClick={() => setCartOpen(false)}>
                Browse Menu
              </a>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item__image" />
                <div className="cart-item__info">
                  <h3 className="cart-item__name">{item.name}</h3>
                  <p className="cart-item__price">${(item.price * item.quantity).toFixed(2)}</p>
                  <div className="cart-item__controls">
                    <button
                      className="cart-item__qty-btn"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus size={14} />
                    </button>
                    <span className="cart-item__qty">{item.quantity}</span>
                    <button
                      className="cart-item__qty-btn"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus size={14} />
                    </button>
                    <button
                      className="cart-item__remove"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart__footer">
            <div className="cart__summary">
              <div className="cart__summary-row">
                <span>Subtotal ({cartTotalItems} items)</span>
                <span>${cartSubtotal.toFixed(2)}</span>
              </div>
              <div className="cart__summary-row cart__summary-row--total">
                <span>Total</span>
                <span>${cartSubtotal.toFixed(2)}</span>
              </div>
            </div>
            <button className="btn btn--primary btn--large btn--full cart__checkout">
              Proceed to Checkout
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero__particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="hero__particle" style={{ '--i': i }}></div>
          ))}
        </div>
        <div className="hero__bg-shapes">
          <div className="hero__shape hero__shape--1"></div>
          <div className="hero__shape hero__shape--2"></div>
          <div className="hero__shape hero__shape--3"></div>
        </div>
        <div className="hero__container">
          <div className="hero__content">
            <div className="hero__badge">
              <Sparkles size={14} />
              Premium Protein Foods
            </div>
            <h1 className="hero__title">
              Eat Clean.<br />
              <span>Fuel Strong.</span>
            </h1>
            <p className="hero__subtitle">
              Freshly boiled proteins, raw veggies & wholesome meals —
              crafted for those who live fitness first. No preservatives,
              just pure nutrition delivered to your door.
            </p>
            <div className="hero__cta">
              <a href="#menu" className="btn btn--primary btn--large">
                Explore Menu
                <ArrowRight size={18} />
              </a>
              <a href="#about" className="btn btn--outline btn--large">
                Our Story
              </a>
            </div>
            <div className="hero__stats">
              <div className="hero__stat">
                <span className="hero__stat-value">50+</span>
                <span className="hero__stat-label">Menu Items</span>
              </div>
              <div className="hero__stat">
                <span className="hero__stat-value">100%</span>
                <span className="hero__stat-label">Natural</span>
              </div>
              <div className="hero__stat">
                <span className="hero__stat-value">4.9</span>
                <span className="hero__stat-label">Rating</span>
              </div>
            </div>
          </div>
          <div className="hero__visual">
            <div className="hero__image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=500&fit=crop"
                alt="Healthy protein bowl"
                className="hero__image"
              />
              <div className="hero__image-badge">
                <div className="hero__image-badge-content">
                  <span className="hero__image-badge-value">32g</span>
                  <span className="hero__image-badge-label">Protein</span>
                </div>
              </div>
              <div className="hero__image-badge hero__image-badge--calories">
                <div className="hero__image-badge-content">
                  <span className="hero__image-badge-value">420</span>
                  <span className="hero__image-badge-label">Calories</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hero__scroll">
          <span>Scroll to explore</span>
          <ChevronDown size={24} />
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="features__container">
          <div className="features__header">
            <span className="section__badge">Why Choose Us</span>
            <h2 className="section__title">Nutrition Without Compromise</h2>
            <p className="section__subtitle">
              We believe healthy eating should be delicious, convenient, and honest.
            </p>
          </div>
          <div className="features__grid">
            {features.map((feature, index) => (
              <div className="feature" key={index} style={{ '--delay': `${index * 0.1}s` }}>
                <div className="feature__icon">
                  <feature.icon size={28} />
                </div>
                <h3 className="feature__title">{feature.title}</h3>
                <p className="feature__description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="menu" id="menu">
        <div className="menu__container">
          <div className="menu__header">
            <span className="section__badge">Our Menu</span>
            <h2 className="section__title">Fresh. Protein-Rich. Delicious.</h2>
            <p className="section__subtitle">
              Explore our selection of healthy, high-protein meals and snacks.
            </p>
          </div>

          <div className="menu__categories">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`menu__category ${activeCategory === category.id ? 'menu__category--active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                <category.icon size={18} />
                {category.name}
              </button>
            ))}
          </div>

          <div className="menu__grid">
            {filteredProducts.map((product) => (
              <div className="product" key={product.id}>
                <div className="product__image-wrapper">
                  <img src={product.image} alt={product.name} className="product__image" />
                  <div className="product__overlay">
                    <button
                      className="product__add-btn"
                      onClick={() => addToCart(product)}
                    >
                      <Plus size={20} />
                      Add to Cart
                    </button>
                  </div>
                  <div className="product__badges">
                    <span className="product__badge">{product.protein} protein</span>
                  </div>
                </div>
                <div className="product__info">
                  <div className="product__meta">
                    <span className="product__calories">{product.calories} cal</span>
                    <div className="product__rating">
                      <Star size={14} fill="currentColor" />
                      {product.rating}
                    </div>
                  </div>
                  <h3 className="product__name">{product.name}</h3>
                  <p className="product__description">{product.description}</p>
                  <div className="product__footer">
                    <span className="product__price">${product.price.toFixed(2)}</span>
                    {getProductQuantity(product.id) > 0 ? (
                      <div className="product__qty-controls">
                        <button
                          className="product__qty-btn"
                          onClick={() => updateQuantity(product.id, getProductQuantity(product.id) - 1)}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="product__qty">{getProductQuantity(product.id)}</span>
                        <button
                          className="product__qty-btn"
                          onClick={() => updateQuantity(product.id, getProductQuantity(product.id) + 1)}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    ) : (
                      <button
                        className="product__qty-btn"
                        onClick={() => addToCart(product)}
                      >
                        <Plus size={16} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery Section */}
      <section className="delivery" id="delivery">
        <div className="delivery__container">
          <div className="delivery__header">
            <span className="section__badge">How It Works</span>
            <h2 className="section__title">Fresh to Your Doorstep</h2>
            <p className="section__subtitle">
              Watch your order make its way from our kitchen to your home.
            </p>
          </div>

          <div className="delivery__animation">
            <div className="delivery__sky">
              <div className="delivery__sun"></div>
              <div className="delivery__cloud delivery__cloud--1"></div>
              <div className="delivery__cloud delivery__cloud--2"></div>
            </div>

            <div className="delivery__city">
              <div className="delivery__building delivery__building--1">
                <div className="delivery__building-window"></div>
                <div className="delivery__building-window"></div>
                <div className="delivery__building-window"></div>
              </div>
              <div className="delivery__building delivery__building--2">
                <div className="delivery__building-window"></div>
                <div className="delivery__building-window"></div>
                <div className="delivery__building-window"></div>
              </div>
              <div className="delivery__building delivery__building--3">
                <div className="delivery__building-window"></div>
                <div className="delivery__building-window"></div>
              </div>
            </div>

            <div className="delivery__road">
              <div className="delivery__road-marking"></div>
            </div>

            <div className="delivery__house">
              <div className="delivery__house-body"></div>
              <div className="delivery__house-roof"></div>
              <div className="delivery__house-door"></div>
              <div className="delivery__house-chimney"></div>
              <div className="delivery__house-window"></div>
            </div>

            <div className="delivery__truck-wrapper">
              <div className="delivery__truck">
                <div className="delivery__truck-body">
                  <span className="delivery__truck-logo">F&F</span>
                </div>
                <div className="delivery__truck-cabin">
                  <div className="delivery__truck-window"></div>
                </div>
                <div className="delivery__truck-wheel delivery__truck-wheel--front"></div>
                <div className="delivery__truck-wheel delivery__truck-wheel--back"></div>
              </div>
              <div className="delivery__truck-trail">
                <div className="delivery__trail-line"></div>
                <div className="delivery__trail-line"></div>
                <div className="delivery__trail-line"></div>
              </div>
            </div>

            <div className="delivery__pin">
              <MapPinHouse size={32} />
              <div className="delivery__pin-pulse"></div>
            </div>
          </div>

          <div className="delivery__info">
            <div className="delivery__info-card">
              <div className="delivery__info-icon">
                <Clock size={24} />
              </div>
              <div className="delivery__info-content">
                <h3>30-45 Min</h3>
                <p>Average delivery time</p>
              </div>
            </div>
            <div className="delivery__info-card">
              <div className="delivery__info-icon">
                <ShieldCheck size={24} />
              </div>
              <div className="delivery__info-content">
                <h3>Insulated Bags</h3>
                <p>Temperature controlled</p>
              </div>
            </div>
            <div className="delivery__info-card">
              <div className="delivery__info-icon">
                <Truck size={24} />
              </div>
              <div className="delivery__info-content">
                <h3>Real-time Track</h3>
                <p>Know exactly where your order is</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about" id="about">
        <div className="about__container">
          <div className="about__image">
            <img
              src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=500&h=600&fit=crop"
              alt="Fresh ingredients"
            />
            <div className="about__image-decoration"></div>
          </div>
          <div className="about__content">
            <span className="section__badge">Our Story</span>
            <h2 className="section__title">Built by Fitness Lovers, <br />for Fitness Lovers</h2>
            <p className="about__text">
              Feast & Fit was born from a simple frustration — why is eating healthy so complicated?
              We wanted to create a service that delivers genuinely nutritious, protein-rich meals
              without the junk.
            </p>
            <p className="about__text">
              Every dish is prepared fresh daily, using only the finest ingredients. Our boiled
              proteins retain maximum nutrition, our vegetables are crisp and raw, and our portions
              are designed by athletes, for athletes.
            </p>
            <div className="about__highlights">
              <div className="about__highlight">
                <div className="about__highlight-icon">
                  <ChefHat size={24} />
                </div>
                <div>
                  <h4>Chef Prepared</h4>
                  <p>By certified health chefs</p>
                </div>
              </div>
              <div className="about__highlight">
                <div className="about__highlight-icon">
                  <Dumbbell size={24} />
                </div>
                <div>
                  <h4>Macro-Tracked</h4>
                  <p>Every meal is nutritionally balanced</p>
                </div>
              </div>
            </div>
            <a href="#contact" className="btn btn--primary">
              Get in Touch
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="testimonials__container">
          <div className="testimonials__header">
            <span className="section__badge">Testimonials</span>
            <h2 className="section__title">Loved by Fitness Enthusiasts</h2>
          </div>
          <div className="testimonials__grid">
            <div className="testimonial">
              <div className="testimonial__quote">"</div>
              <div className="testimonial__stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="testimonial__text">
                Finally, a meal service that actually understands protein needs! The boiled chicken
                is perfectly cooked and the portions are exactly what I need for my training.
              </p>
              <div className="testimonial__author">
                <div className="testimonial__avatar">RS</div>
                <div>
                  <h4>Rahul Sharma</h4>
                  <p>Fitness Coach</p>
                </div>
              </div>
            </div>
            <div className="testimonial testimonial--featured">
              <div className="testimonial__quote">"</div>
              <div className="testimonial__stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="testimonial__text">
                I've tried many healthy food services, but Feast & Fit is different. The ingredients
                are always fresh, the protein content is accurate, and it tastes incredible.
              </p>
              <div className="testimonial__author">
                <div className="testimonial__avatar">PK</div>
                <div>
                  <h4>Priya Kumar</h4>
                  <p>Marathon Runner</p>
                </div>
              </div>
            </div>
            <div className="testimonial">
              <div className="testimonial__quote">"</div>
              <div className="testimonial__stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="testimonial__text">
                The raw veggie platters are my favorite! So fresh and the tahini dressing is
                addictive. Great for a quick healthy lunch between client meetings.
              </p>
              <div className="testimonial__author">
                <div className="testimonial__avatar">AM</div>
                <div>
                  <h4>Arjun Mehta</h4>
                  <p>Software Engineer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact / CTA Section */}
      <section className="contact" id="contact">
        <div className="contact__container">
          <div className="contact__content">
            <span className="section__badge section__badge--light">Get Started</span>
            <h2 className="contact__title">Ready to Eat Clean?</h2>
            <p className="contact__subtitle">
              Order now and get fresh, protein-rich meals delivered to your doorstep.
              Follow us on social media for daily healthy tips and exclusive offers!
            </p>
            <div className="contact__links">
              <a href="https://www.instagram.com/feastnfit_vizag/" className="contact__link" target="_blank" rel="noopener noreferrer">
                <Camera size={20} />
                Instagram
              </a>
              <a href="https://wa.me/917075841866" className="contact__link" target="_blank" rel="noopener noreferrer">
                <MessageCircle size={20} />
                WhatsApp
              </a>
              <a href="tel:+917075841866" className="contact__link">
                <Phone size={20} />
                Call Us
              </a>
            </div>
            <div className="contact__info">
              <div className="contact__info-item">
                <Clock size={18} />
                <span>Mon-Sun: 8AM - 10PM</span>
              </div>
              <div className="contact__info-item">
                <MapPin size={18} />
                <span>MVP Sector 7, Visakhapatnam</span>
              </div>
              <div className="contact__info-item">
                <Mail size={18} />
                <span>hello@feastandfit.com</span>
              </div>
            </div>
          </div>
          <div className="contact__cta">
            <a href="#menu" className="btn btn--primary btn--large btn--full">
              Browse Full Menu
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer__container">
          <div className="footer__brand">
            <div className="footer__logo">
              <span className="footer__logo-icon">🍎</span>
              <span className="footer__logo-text">Feast<span>&</span>Fit</span>
            </div>
            <p className="footer__tagline">
              Premium protein foods for a stronger, healthier you.
            </p>
          </div>
          <div className="footer__links">
            <div className="footer__column">
              <h4>Menu</h4>
              <a href="#menu">All Items</a>
              <a href="#menu">Protein Packs</a>
              <a href="#menu">Boiled Delights</a>
              <a href="#menu">Fresh & Raw</a>
            </div>
            <div className="footer__column">
              <h4>Company</h4>
              <a href="#about">About Us</a>
              <a href="#features">Why Us</a>
              <a href="#contact">Contact</a>
            </div>
            <div className="footer__column">
              <h4>Connect</h4>
              <a href="https://www.instagram.com/feastnfit_vizag/" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://wa.me/917075841866" target="_blank" rel="noopener noreferrer">WhatsApp</a>
              <a href="mailto:hello@feastandfit.com">Email</a>
            </div>
          </div>
          <div className="footer__bottom">
            <p>© 2024 Feast & Fit. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
