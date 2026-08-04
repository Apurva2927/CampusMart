import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { categories } from '../data/categoriesData';
import API from '../services/api';
import { 
  Search, 
  Plus, 
  Grid, 
  ArrowUpDown, 
  SlidersHorizontal, 
  X, 
  Tag, 
  DollarSign, 
  Calendar, 
  User, 
  Image as ImageIcon,
  ChevronRight,
  Sparkles,
  Info
} from 'lucide-react';

// Preset image pools to make posts look extremely premium automatically
const presetImages = {
  'cars': [
    'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80'
  ],
  'motorcycle': [
    'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?auto=format&fit=crop&w=600&q=80'
  ],
  'mobile-phones': [
    'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1565849906660-4469279f555e?auto=format&fit=crop&w=600&q=80'
  ],
  'properties': [
    'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80'
  ],
  'electronics': [
    'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80'
  ],
  'jobs': [
    'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80'
  ],
  'furniture': [
    'https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80'
  ],
  'fashion': [
    'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80'
  ],
  'pets': [
    'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&w=600&q=80'
  ],
  'books-sports': [
    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=600&q=80'
  ],
  'hobbies': [
    'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80'
  ],
  'services': [
    'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=600&q=80'
  ]
};

// Gorgeous seed fallback database for complete representation of the 12 categories
const fallbackProducts = [
  {
    _id: 'mock-1',
    title: '2018 Honda Civic LX',
    price: 14500,
    category: 'Cars',
    images: ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80'],
    description: 'Clean title, 65k miles, perfect commuter car for university students. Front tires replaced recently.',
    seller: { name: 'Alex Johnson', email: 'alex.johnson@campusmart.edu', contact: '+1 555-0101' },
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    status: 'Available'
  },
  {
    _id: 'mock-2',
    title: 'Vespa Primavera 150',
    price: 3200,
    category: 'Motorcycle',
    images: ['https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=600&q=80'],
    description: 'Vibrant orange scooter, super handy for beating campus traffic. Comes with helmet, lock, and registration papers.',
    seller: { name: 'Sarah Miller', email: 'sarah.miller@campusmart.edu', contact: '+1 555-0102' },
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    status: 'Available'
  },
  {
    _id: 'mock-3',
    title: 'iPhone 13 Pro (128GB, Sierra Blue)',
    price: 550,
    category: 'Mobile Phones',
    images: ['https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=600&q=80'],
    description: 'Unlocked iOS device. Battery health 88%. Kept in a screen protector and case from day one.',
    seller: { name: 'David Lee', email: 'david.lee@campusmart.edu', contact: '+1 555-0103' },
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    status: 'Available'
  },
  {
    _id: 'mock-4',
    title: 'Shared Room near Campus (Fall Semester)',
    price: 650,
    category: 'Properties',
    images: ['https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80'],
    description: '1 bedroom in a 3BHK house, just 5 minutes walk to the engineering quad. Utilities and Wi-Fi included.',
    seller: { name: 'Emily Taylor', email: 'emily.taylor@campusmart.edu', contact: '+1 555-0104' },
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    status: 'Available'
  },
  {
    _id: 'mock-5',
    title: 'M1 MacBook Air (2020) 8GB/256GB',
    price: 490,
    category: 'Electronics and Appliances',
    images: ['https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=600&q=80'],
    description: 'Space Gray model, flawless performance. Includes USB-C charger and premium felt carrying sleeve.',
    seller: { name: 'Ryan Clark', email: 'ryan.clark@campusmart.edu', contact: '+1 555-0105' },
    createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
    status: 'Available'
  },
  {
    _id: 'mock-6',
    title: 'Math & Physics Tutor Wanted',
    price: 25,
    category: 'Jobs',
    images: ['https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80'],
    description: 'Need assistance preparing for Calculus III and University Physics exams. Flexible hours, $25/hour.',
    seller: { name: 'Jessica Davis', email: 'jessica.davis@campusmart.edu', contact: '+1 555-0106' },
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    status: 'Available'
  },
  {
    _id: 'mock-7',
    title: 'Ergonomic Desk Chair',
    price: 80,
    category: 'Furniture',
    images: ['https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&w=600&q=80'],
    description: 'Fully adjustable armrests and seat height. Lumbar mesh padding. Perfect for long study sessions.',
    seller: { name: 'Marcus Wong', email: 'marcus.wong@campusmart.edu', contact: '+1 555-0107' },
    createdAt: new Date(Date.now() - 3600000 * 20).toISOString(),
    status: 'Available'
  },
  {
    _id: 'mock-8',
    title: 'Vintage Nike Windbreaker (L)',
    price: 35,
    category: 'Fashion',
    images: ['https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=600&q=80'],
    description: 'Retro colorblock pattern. No stains or rips. Oversized comfortable fit.',
    seller: { name: 'Sophia Patel', email: 'sophia.patel@campusmart.edu', contact: '+1 555-0108' },
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    status: 'Available'
  },
  {
    _id: 'mock-9',
    title: 'Automatic Pet Feeder',
    price: 30,
    category: 'Pets',
    images: ['https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80'],
    description: 'Program up to 4 meals a day. Runs on batteries or AC power. Great for student schedules.',
    seller: { name: 'Nathaniel Green', email: 'nathaniel.green@campusmart.edu', contact: '+1 555-0109' },
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    status: 'Available'
  },
  {
    _id: 'mock-10',
    title: 'Organic Chemistry Text (Wade)',
    price: 45,
    category: 'Books and sports',
    images: ['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80'],
    description: '8th edition Wade. Essential for CHEM 220. Very light pencil annotations on chapter 4, otherwise clean.',
    seller: { name: 'Olivia Martinez', email: 'olivia.martinez@campusmart.edu', contact: '+1 555-0110' },
    createdAt: new Date(Date.now() - 3600000 * 30).toISOString(),
    status: 'Available'
  },
  {
    _id: 'mock-11',
    title: 'Fujifilm X-T20 Mirrorless Camera',
    price: 620,
    category: 'Hobbies',
    images: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80'],
    description: 'Comes with 18-55mm kit lens. Fantastic vintage body styling, pristine sensor. SD card and extra battery included.',
    seller: { name: 'Tyler Anderson', email: 'tyler.anderson@campusmart.edu', contact: '+1 555-0111' },
    createdAt: new Date(Date.now() - 3600000 * 15).toISOString(),
    status: 'Available'
  },
  {
    _id: 'mock-12',
    title: 'Weekend Moving Assistant (Pickup Truck)',
    price: 40,
    category: 'Services',
    images: ['https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=600&q=80'],
    description: 'Offering moving services within 15 miles of campus. I have a clean F150. Heavy lifting assistance included. $40/hr.',
    seller: { name: 'Brandon Cole', email: 'brandon.cole@campusmart.edu', contact: '+1 555-0112' },
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    status: 'Available'
  }
];

export default function Marketplace() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  // Read URL search params
  const categoryParam = searchParams.get('category') || '';
  const searchParam = searchParams.get('search') || '';
  const sellParam = searchParams.get('sell') === 'true';
  const myListingsParam = searchParams.get('myListings') === 'true';

  // Form & view states
  const [products, setProducts] = useState(fallbackProducts);
  const [loading, setLoading] = useState(true);
  const [apiOnline, setApiOnline] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParam);
  const [sortBy, setSortBy] = useState('newest');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Listing creation states
  const [modalOpen, setModalOpen] = useState(sellParam);
  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newCategory, setNewCategory] = useState('Electronics and Appliances');
  const [newDescription, setNewDescription] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newSellerEmail, setNewSellerEmail] = useState(user?.email || '');
  const [newSellerContact, setNewSellerContact] = useState(user?.contact || user?.phone || '');
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  // Auto-sync search query local state with URL
  useEffect(() => {
    setSearchQuery(searchParam);
  }, [searchParam]);

  // Sync sellParam with modalOpen state
  useEffect(() => {
    if (sellParam) {
      if (!user) {
        // Redirect to login if user tries to sell but is not authenticated
        navigate('/signin');
      } else {
        setModalOpen(true);
      }
    } else {
      setModalOpen(false);
    }
  }, [sellParam, user, navigate]);

  // Fetch listings from server, falling back to gorgeous mock database if offline
  const fetchListings = async () => {
    setLoading(true);
    try {
      const categoryFilter = categoryParam ? `category=${encodeURIComponent(categoryParam)}` : '';
      const searchFilter = searchParam ? `search=${encodeURIComponent(searchParam)}` : '';
      const sellerFilter = myListingsParam && user ? `seller=${user.id}` : '';
      const queryStr = [categoryFilter, searchFilter, sellerFilter].filter(Boolean).join('&');
      
      const response = await API.get(`/products?${queryStr}`);
      if (response.data && response.data.products) {
        setProducts(response.data.products);
        setApiOnline(true);
      } else {
        // Fallback to local filtering if structure is off
        applyLocalFilters();
        setApiOnline(false);
      }
    } catch (error) {
      console.warn('API connection failed. Operating with premium mock fallback state.', error.message);
      applyLocalFilters();
      setApiOnline(false);
    } finally {
      setLoading(false);
    }
  };

  const applyLocalFilters = () => {
    let filtered = [...fallbackProducts];

    // Filter by seller (My Listings)
    if (myListingsParam && user) {
      filtered = filtered.filter(p => 
        (p.seller && (p.seller.id === user.id || p.seller._id === user.id || p.seller.name === user.name || p.seller.name === 'You'))
      );
    } else {
      // Public marketplace: only show available items
      filtered = filtered.filter(p => p.status === 'Available');
    }

    // Filter by category
    if (categoryParam) {
      filtered = filtered.filter(p => p.category.toLowerCase() === categoryParam.toLowerCase());
    }

    // Filter by search keyword
    if (searchParam) {
      const kw = searchParam.toLowerCase();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(kw) || 
        p.description.toLowerCase().includes(kw)
      );
    }

    setProducts(filtered);
  };

  const handleUpdateStatus = async (productId, newStatus) => {
    try {
      if (apiOnline) {
        const res = await API.patch(`/products/${productId}/status`, { status: newStatus });
        if (res.data) {
          // Update selectedProduct so the modal updates immediately
          setSelectedProduct(res.data);
          // Refresh listings
          fetchListings();
          return;
        }
      }

      // Local fallback mode
      const idx = fallbackProducts.findIndex(p => p._id === productId);
      if (idx !== -1) {
        fallbackProducts[idx].status = newStatus;
        setSelectedProduct({ ...fallbackProducts[idx] });
        applyLocalFilters();
        alert(`Status updated to ${newStatus} (Local Mode)`);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update status.');
    }
  };

  const handleDeleteListing = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this listing?')) {
      return;
    }

    try {
      if (apiOnline) {
        await API.delete(`/products/${productId}`);
        setSelectedProduct(null);
        fetchListings();
        return;
      }

      // Local fallback mode
      const idx = fallbackProducts.findIndex(p => p._id === productId);
      if (idx !== -1) {
        fallbackProducts.splice(idx, 1);
        setSelectedProduct(null);
        applyLocalFilters();
        alert('Listing deleted successfully (Local Mode)');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete listing.');
    }
  };

  useEffect(() => {
    fetchListings();
  }, [categoryParam, searchParam, myListingsParam]);

  // Trigger search on submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchQuery) {
      params.set('search', searchQuery);
    } else {
      params.delete('search');
    }
    setSearchParams(params);
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setSearchParams({});
  };

  // Handle category pill toggle
  const handleCategoryPillClick = (catName) => {
    const params = new URLSearchParams(searchParams);
    if (categoryParam === catName) {
      params.delete('category'); // Toggle off if clicked again
    } else {
      params.set('category', catName);
    }
    setSearchParams(params);
  };

  // Sort logic applied client-side
  const getSortedProducts = () => {
    const sorted = [...products];
    if (sortBy === 'newest') {
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === 'price-low') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      sorted.sort((a, b) => b.price - a.price);
    }
    return sorted;
  };

  // Close Sell modal and sync URL state
  const handleCloseModal = () => {
    setModalOpen(false);
    const params = new URLSearchParams(searchParams);
    params.delete('sell');
    setSearchParams(params);
    setNewTitle('');
    setNewPrice('');
    setNewDescription('');
    setNewImageUrl('');
    setNewSellerEmail(user?.email || '');
    setNewSellerContact(user?.contact || user?.phone || '');
    setFormError('');
    setFormSuccess('');
  };

  // Handle preset image choice
  const selectPresetImage = (url) => {
    setNewImageUrl(url);
  };

  // Get matching preset images for currently selected category in modal
  const getCurrentCategoryPresets = () => {
    const matchedCategory = categories.find(c => c.name.toLowerCase() === newCategory.toLowerCase() || 
      c.id === newCategory.toLowerCase().replace(/[^a-z]/g, ''));
    
    if (matchedCategory && presetImages[matchedCategory.id]) {
      return presetImages[matchedCategory.id];
    }
    return presetImages['electronics']; // default fallback
  };

  // Submit new listing
  const handleCreateListing = async (e) => {
    e.preventDefault();
    if (!newTitle || !newPrice || !newCategory || !newDescription || !newSellerEmail || !newSellerContact) {
      setFormError('Please fill in all required fields.');
      return;
    }

    const priceVal = parseFloat(newPrice);
    if (isNaN(priceVal) || priceVal < 0) {
      setFormError('Please enter a valid price.');
      return;
    }

    // Default image if none provided
    const imageUrl = newImageUrl || getCurrentCategoryPresets()[0];

    const listingData = {
      title: newTitle,
      description: newDescription,
      price: priceVal,
      category: newCategory,
      images: [imageUrl],
      sellerEmail: newSellerEmail,
      sellerContact: newSellerContact
    };

    setFormError('');
    setFormSuccess('');

    try {
      if (apiOnline) {
        const res = await API.post('/products', listingData);
        if (res.data) {
          setFormSuccess('Listing posted successfully!');
          setTimeout(() => {
            fetchListings();
            handleCloseModal();
          }, 1500);
          return;
        }
      }

      // If API offline or fails, add to local mock array for immediate client interaction!
      const newMockItem = {
        _id: `mock-${Date.now()}`,
        title: newTitle,
        description: newDescription,
        price: priceVal,
        category: newCategory,
        images: [imageUrl],
        seller: { name: user?.name || 'You', email: newSellerEmail, contact: newSellerContact },
        createdAt: new Date().toISOString(),
        status: 'Available'
      };

      // Push into our list and update the display list immediately
      fallbackProducts.unshift(newMockItem);
      applyLocalFilters();

      setFormSuccess('Listing posted successfully! (Operating in client-side fallback mode)');
      setTimeout(() => {
        handleCloseModal();
      }, 1500);

    } catch (err) {
      setFormError(err.response?.data?.message || 'Failed to post listing. Please try again.');
    }
  };

  const sortedProductsList = getSortedProducts();

  return (
    <div className="marketplace-page" style={{ minHeight: '80vh', backgroundColor: '#f8fafc', padding: '40px 0' }}>
      <div className="page-home">
        
        {/* Breadcrumb / Top Row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--page-muted)', marginBottom: '16px' }}>
          <span style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>Home</span>
          <ChevronRight size={12} />
          <span style={{ color: 'var(--page-text)', fontWeight: '600' }}>Marketplace</span>
          {categoryParam && (
            <>
              <ChevronRight size={12} />
              <span style={{ color: 'var(--page-accent)', fontWeight: '600' }}>{categoryParam}</span>
            </>
          )}
        </div>

        {/* Headline Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '24px', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.5rem)', fontWeight: '800', letterSpacing: '-0.03em', color: 'var(--page-text)', margin: '0 0 8px 0' }}>
              Campus Marketplace
            </h1>
            <p style={{ color: 'var(--page-muted)', margin: 0, fontSize: '15px' }}>
              Browse peer listings from your campus. Safe, local exchange.
            </p>
          </div>
          {user && (
            <button
              onClick={() => {
                const params = new URLSearchParams(searchParams);
                params.set('sell', 'true');
                setSearchParams(params);
              }}
              className="primary-button"
              style={{ padding: '12px 24px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 10px 15px -3px rgba(79, 70, 229, 0.2)' }}
            >
              <Plus size={18} />
              <span>Post an Item</span>
            </button>
          )}
        </div>

        {/* Database Status Alert Banner if offline */}
        {!apiOnline && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            backgroundColor: '#fffbeb',
            border: '1px solid #fef3c7',
            padding: '12px 20px',
            borderRadius: '16px',
            marginBottom: '32px',
            color: '#b45309',
            fontSize: '14px'
          }}>
            <Info size={20} style={{ flexShrink: 0 }} />
            <span>
              <strong>Local Mode Activated:</strong> The backend is in standalone mode or connecting. You can fully browse categories, search, filter, and create listings locally in memory!
            </span>
          </div>
        )}

        {/* Categories Bar / Scrollable Pills */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--page-text)', marginBottom: '14px' }}>
            Categories
          </h3>
          <div style={{
            display: 'flex',
            gap: '10px',
            overflowX: 'auto',
            paddingBottom: '8px',
            scrollbarWidth: 'none', // Firefox
            msOverflowStyle: 'none' // IE/Edge
          }} className="hide-scrollbar">
            {/* All Pill */}
            <button
              onClick={() => {
                const params = new URLSearchParams(searchParams);
                params.delete('category');
                setSearchParams(params);
              }}
              style={{
                flexShrink: 0,
                padding: '10px 20px',
                borderRadius: '999px',
                border: '1px solid',
                borderColor: !categoryParam && !myListingsParam ? 'var(--page-accent)' : 'var(--page-border)',
                backgroundColor: !categoryParam && !myListingsParam ? 'var(--page-accent)' : '#ffffff',
                color: !categoryParam && !myListingsParam ? '#ffffff' : 'var(--page-text)',
                fontWeight: '600',
                fontSize: '14px',
                transition: 'all 0.2s',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Grid size={15} />
              <span>All Categories</span>
            </button>

            {/* My Listings Pill (Visible only if logged in) */}
            {user && (
              <button
                onClick={() => {
                  const params = new URLSearchParams(searchParams);
                  if (myListingsParam) {
                    params.delete('myListings');
                  } else {
                    params.set('myListings', 'true');
                    params.delete('category'); // Deselect category to focus on all owned items
                  }
                  setSearchParams(params);
                }}
                style={{
                  flexShrink: 0,
                  padding: '10px 20px',
                  borderRadius: '999px',
                  border: '1px solid',
                  borderColor: myListingsParam ? 'var(--page-accent)' : 'var(--page-border)',
                  backgroundColor: myListingsParam ? 'rgba(79, 70, 229, 0.1)' : '#ffffff',
                  color: myListingsParam ? 'var(--page-accent)' : 'var(--page-text)',
                  fontWeight: '700',
                  fontSize: '14px',
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <User size={15} />
                <span>My Listings</span>
              </button>
            )}

            {/* Category Dynamic Pills */}
            {categories.map(cat => {
              const isActive = categoryParam === cat.name;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryPillClick(cat.name)}
                  style={{
                    flexShrink: 0,
                    padding: '10px 20px',
                    borderRadius: '999px',
                    border: '1px solid',
                    borderColor: isActive ? cat.color : 'var(--page-border)',
                    backgroundColor: isActive ? cat.color : '#ffffff',
                    color: isActive ? '#ffffff' : 'var(--page-text)',
                    fontWeight: '600',
                    fontSize: '14px',
                    transition: 'all 0.2s',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                    {cat.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter Bar (Search + Sort) */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          background: '#ffffff',
          border: '1px solid var(--page-border)',
          borderRadius: '16px',
          padding: '16px 24px',
          marginBottom: '32px'
        }}>
          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center', flex: '1', minWidth: '280px', position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '16px', color: 'var(--page-muted)' }} />
            <input
              type="text"
              placeholder="Search items by title or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px 12px 48px',
                borderRadius: '12px',
                border: '1px solid var(--page-border)',
                fontSize: '14px',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--page-accent)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--page-border)'}
            />
            {searchQuery && (
              <button 
                type="button" 
                onClick={() => { setSearchQuery(''); const p = new URLSearchParams(searchParams); p.delete('search'); setSearchParams(p); }}
                style={{ position: 'absolute', right: '16px', background: 'none', border: 'none', color: 'var(--page-muted)', cursor: 'pointer' }}
              >
                <X size={16} />
              </button>
            )}
          </form>

          {/* Sort & Settings */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ArrowUpDown size={16} style={{ color: 'var(--page-muted)' }} />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: '10px 16px',
                  borderRadius: '12px',
                  border: '1px solid var(--page-border)',
                  fontSize: '14px',
                  backgroundColor: '#ffffff',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="newest">Newest Listed</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
            
            {(categoryParam || searchParam) && (
              <button
                onClick={handleClearFilters}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'none',
                  border: 'none',
                  color: '#ef4444',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Loading Indicator */}
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', border: '4px solid rgba(79, 70, 229, 0.1)', borderTopColor: 'var(--page-accent)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
            <p style={{ color: 'var(--page-muted)', fontWeight: '500' }}>Fetching products...</p>
          </div>
        ) : sortedProductsList.length === 0 ? (
          /* Empty State */
          <div style={{
            background: '#ffffff',
            border: '1px solid var(--page-border)',
            borderRadius: '24px',
            padding: '60px 40px',
            textAlign: 'center',
            maxWidth: '560px',
            margin: '40px auto'
          }}>
            <SlidersHorizontal size={48} style={{ color: 'var(--page-muted)', margin: '0 auto 16px', opacity: 0.5 }} />
            <h3 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--page-text)', marginBottom: '8px' }}>No listings found</h3>
            <p style={{ color: 'var(--page-muted)', margin: '0 0 24px 0', fontSize: '14px', lineHeight: '1.5' }}>
              We couldn't find any available listings matching "{searchQuery || categoryParam}". Try checking another category or clearing your search.
            </p>
            <button onClick={handleClearFilters} className="primary-button">
              Show All Listings
            </button>
          </div>
        ) : (
          /* Product Grid */
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '30px'
          }}>
            {sortedProductsList.map((product) => {
              const matchedCat = categories.find(c => c.name.toLowerCase() === product.category?.toLowerCase());
              const catColor = matchedCat?.color || 'var(--page-accent)';
              const catBg = matchedCat?.bgLight || 'rgba(79, 70, 229, 0.08)';

              return (
                <div
                  key={product._id}
                  onClick={() => setSelectedProduct(product)}
                  style={{
                    background: '#ffffff',
                    borderRadius: '20px',
                    border: '1px solid var(--page-border)',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.01), 0 2px 4px -1px rgba(0, 0, 0, 0.005)',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%'
                  }}
                  className="product-card-hover"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)';
                    e.currentTarget.style.borderColor = 'rgba(79, 70, 229, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.01), 0 2px 4px -1px rgba(0, 0, 0, 0.005)';
                    e.currentTarget.style.borderColor = 'var(--page-border)';
                  }}
                >
                  {/* Image wrapper */}
                  <div style={{ position: 'relative', width: '100%', height: '200px', backgroundColor: '#f1f5f9', overflow: 'hidden' }}>
                    <img
                      src={product.images && product.images[0] ? product.images[0] : 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80'}
                      alt={product.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    />
                    
                    {/* Category tag */}
                    <span style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      fontSize: '11px',
                      fontWeight: '700',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      backgroundColor: catBg,
                      color: catColor,
                      padding: '5px 12px',
                      borderRadius: '999px',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.5)',
                      backdropFilter: 'blur(4px)'
                    }}>
                      {product.category}
                    </span>

                    {/* Status tag if not Available */}
                    {product.status && product.status !== 'Available' && (
                      <span style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        fontSize: '11px',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                        backgroundColor: product.status === 'Sold' ? '#fee2e2' : '#fef3c7',
                        color: product.status === 'Sold' ? '#ef4444' : '#d97706',
                        padding: '5px 12px',
                        borderRadius: '999px',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.5)',
                        backdropFilter: 'blur(4px)'
                      }}>
                        {product.status}
                      </span>
                    )}

                    {/* Price Tag */}
                    <div style={{
                      position: 'absolute',
                      bottom: '16px',
                      right: '16px',
                      backgroundColor: '#1e293b',
                      color: '#ffffff',
                      padding: '6px 12px',
                      borderRadius: '10px',
                      fontWeight: '700',
                      fontSize: '15px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.15)',
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      ${product.price}
                    </div>
                  </div>

                  {/* Info details */}
                  <div style={{ padding: '20px', flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h4 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--page-text)', margin: '0 0 8px 0', lineBreak: 'anywhere' }}>
                        {product.title}
                      </h4>
                      <p style={{
                        fontSize: '13px',
                        color: 'var(--page-muted)',
                        margin: '0 0 16px 0',
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        lineHeight: '1.4'
                      }}>
                        {product.description}
                      </p>
                    </div>

                    {/* Footer seller details */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderTop: '1px solid var(--page-border)',
                      paddingTop: '14px',
                      fontSize: '12px',
                      color: 'var(--page-muted)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <User size={12} />
                        </div>
                        <span style={{ fontWeight: '500' }}>{product.seller?.name || 'Student'}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar size={12} />
                        <span>{new Date(product.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal: Post New Listing */}
        {modalOpen && (
          <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999,
            backgroundColor: 'rgba(15, 23, 42, 0.4)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}>
            <div style={{
              background: '#ffffff',
              borderRadius: '24px',
              border: '1px solid var(--page-border)',
              width: '100%',
              maxWidth: '580px',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
              position: 'relative'
            }}>
              {/* Header */}
              <div style={{
                position: 'sticky',
                top: 0,
                backgroundColor: '#ffffff',
                borderBottom: '1px solid var(--page-border)',
                padding: '20px 28px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                zIndex: 2
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={20} style={{ color: 'var(--page-accent)' }} />
                  <h2 style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--page-text)', margin: 0 }}>
                    Post a Listing
                  </h2>
                </div>
                <button
                  onClick={handleCloseModal}
                  style={{ background: 'none', border: 'none', color: 'var(--page-muted)', cursor: 'pointer', display: 'flex', padding: '4px' }}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form Body */}
              <form onSubmit={handleCreateListing} style={{ padding: '28px' }}>
                
                {formError && (
                  <div style={{
                    backgroundColor: '#fef2f2',
                    border: '1px solid #fecaca',
                    color: '#dc2626',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    marginBottom: '20px',
                    fontSize: '13px',
                    fontWeight: '500'
                  }}>
                    {formError}
                  </div>
                )}

                {formSuccess && (
                  <div style={{
                    backgroundColor: '#f0fdf4',
                    border: '1px solid #bbf7d0',
                    color: '#16a34a',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    marginBottom: '20px',
                    fontSize: '13px',
                    fontWeight: '500'
                  }}>
                    {formSuccess}
                  </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  
                  {/* Title */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontWeight: '600', fontSize: '13px' }}>Item Title *</label>
                    <input
                      type="text"
                      placeholder="e.g. Organic Chemistry Wade 8th Ed"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      required
                      style={{ padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--page-border)', fontSize: '14px', outline: 'none' }}
                    />
                  </div>

                  {/* Price and Category grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    {/* Price */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label style={{ fontWeight: '600', fontSize: '13px' }}>Price ($) *</label>
                      <input
                        type="number"
                        placeholder="e.g. 45"
                        value={newPrice}
                        onChange={(e) => setNewPrice(e.target.value)}
                        required
                        min="0"
                        step="0.01"
                        style={{ padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--page-border)', fontSize: '14px', outline: 'none' }}
                      />
                    </div>

                    {/* Category Select */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label style={{ fontWeight: '600', fontSize: '13px' }}>Category *</label>
                      <select
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        required
                        style={{ padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--page-border)', fontSize: '14px', outline: 'none', backgroundColor: '#ffffff' }}
                      >
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.name}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Description */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontWeight: '600', fontSize: '13px' }}>Description *</label>
                    <textarea
                      placeholder="Describe the condition, features, or location of exchange..."
                      value={newDescription}
                      onChange={(e) => setNewDescription(e.target.value)}
                      required
                      rows="4"
                      style={{ padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--page-border)', fontSize: '14px', outline: 'none', fontFamily: 'inherit', resize: 'vertical' }}
                    />
                  </div>

                  {/* Image Link Input */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontWeight: '600', fontSize: '13px' }}>Image URL</label>
                    <input
                      type="url"
                      placeholder="https://example.com/image.jpg"
                      value={newImageUrl}
                      onChange={(e) => setNewImageUrl(e.target.value)}
                      style={{ padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--page-border)', fontSize: '14px', outline: 'none' }}
                    />
                  </div>

                  {/* Seller Email */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontWeight: '600', fontSize: '13px' }}>Seller Email *</label>
                    <input
                      type="email"
                      placeholder="seller@example.com"
                      value={newSellerEmail}
                      onChange={(e) => setNewSellerEmail(e.target.value)}
                      required
                      style={{ padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--page-border)', fontSize: '14px', outline: 'none' }}
                    />
                  </div>

                  {/* Seller Contact */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontWeight: '600', fontSize: '13px' }}>Seller Contact Number *</label>
                    <input
                      type="tel"
                      placeholder="+1 555 123 4567"
                      value={newSellerContact}
                      onChange={(e) => setNewSellerContact(e.target.value)}
                      required
                      style={{ padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--page-border)', fontSize: '14px', outline: 'none' }}
                    />
                  </div>

                  {/* Image Presets Picker */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontWeight: '600', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <ImageIcon size={14} />
                      <span>Or Pick a Preset Template Photo</span>
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                      {getCurrentCategoryPresets().map((presetUrl, idx) => (
                        <div
                          key={idx}
                          onClick={() => selectPresetImage(presetUrl)}
                          style={{
                            height: '70px',
                            borderRadius: '10px',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            border: '3px solid',
                            borderColor: newImageUrl === presetUrl ? 'var(--page-accent)' : 'transparent',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                            transition: 'border-color 0.2s'
                          }}
                        >
                          <img src={presetUrl} alt="Preset option" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: '12px',
                  marginTop: '32px',
                  borderTop: '1px solid var(--page-border)',
                  paddingTop: '20px'
                }}>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="secondary-button"
                    style={{ padding: '12px 20px', borderRadius: '12px' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="primary-button"
                    style={{ padding: '12px 28px', borderRadius: '12px' }}
                  >
                    Submit Listing
                  </button>
                </div>

              </form>
            </div>
          </div>
        )}

        {/* Modal: Listing Details */}
        {selectedProduct && (
          <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999,
            backgroundColor: 'rgba(15, 23, 42, 0.4)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}>
            <div style={{
              background: '#ffffff',
              borderRadius: '24px',
              border: '1px solid var(--page-border)',
              width: '100%',
              maxWidth: '680px',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
              position: 'relative'
            }}>
              {/* Image banner */}
              <div style={{ position: 'relative', width: '100%', height: '320px', backgroundColor: '#e2e8f0' }}>
                <img
                  src={selectedProduct.images && selectedProduct.images[0] ? selectedProduct.images[0] : 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80'}
                  alt={selectedProduct.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProduct(null)}
                  style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: '#ffffff',
                    color: 'var(--page-text)',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)'
                  }}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Details body */}
              <div style={{ padding: '32px' }}>
                
                {/* Category & Badge */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <span style={{
                    fontSize: '12px',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    backgroundColor: categories.find(c => c.name.toLowerCase() === selectedProduct.category?.toLowerCase())?.bgLight || 'rgba(79, 70, 229, 0.08)',
                    color: categories.find(c => c.name.toLowerCase() === selectedProduct.category?.toLowerCase())?.color || 'var(--page-accent)',
                    padding: '6px 14px',
                    borderRadius: '999px'
                  }}>
                    {selectedProduct.category}
                  </span>
                  
                  <span style={{ fontSize: '13px', color: 'var(--page-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={14} />
                    Listed {new Date(selectedProduct.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                </div>

                {/* Title */}
                <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--page-text)', margin: '0 0 16px 0', lineHeight: '1.2' }}>
                  {selectedProduct.title}
                </h2>

                {/* Price Display card */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: '#f8fafc',
                  border: '1px solid var(--page-border)',
                  borderRadius: '16px',
                  padding: '16px 24px',
                  marginBottom: '24px'
                }}>
                  <div>
                    <span style={{ fontSize: '12px', color: 'var(--page-muted)', textTransform: 'uppercase', fontWeight: '600' }}>Price</span>
                    <div style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--page-accent)', display: 'flex', alignItems: 'center' }}>
                      ${selectedProduct.price}
                    </div>
                  </div>
                  
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '12px', color: 'var(--page-muted)', textTransform: 'uppercase', fontWeight: '600' }}>Status</span>
                    <div style={{
                      fontSize: '13px',
                      fontWeight: '700',
                      color: selectedProduct.status === 'Available' ? '#16a34a' : '#d97706',
                      backgroundColor: selectedProduct.status === 'Available' ? '#f0fdf4' : '#fffbeb',
                      padding: '4px 12px',
                      borderRadius: '8px',
                      marginTop: '4px',
                      display: 'inline-block'
                    }}>
                      {selectedProduct.status}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div style={{ marginBottom: '28px' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--page-text)', margin: '0 0 8px 0', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                    Description
                  </h4>
                  <p style={{ fontSize: '14px', color: 'var(--page-muted)', margin: 0, lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                    {selectedProduct.description}
                  </p>
                </div>

                {/* Seller & Action Grid */}
                {user && (selectedProduct.seller?.id === user.id || selectedProduct.seller?._id === user.id || selectedProduct.seller?.name === 'You' || selectedProduct.seller?.name === user.name) ? (
                  <div style={{
                    borderTop: '1px solid var(--page-border)',
                    paddingTop: '24px',
                    backgroundColor: '#faf5ff',
                    border: '1px dashed #d8b4fe',
                    borderRadius: '16px',
                    padding: '16px 20px',
                    marginTop: '20px'
                  }}>
                    <h4 style={{ fontSize: '13px', fontWeight: '700', color: 'var(--page-accent)', margin: '0 0 12px 0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Manage Your Listing
                    </h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '13px', fontWeight: '600' }}>Status:</span>
                        <select
                          value={selectedProduct.status}
                          onChange={(e) => handleUpdateStatus(selectedProduct._id, e.target.value)}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '8px',
                            border: '1px solid var(--page-border)',
                            fontSize: '13px',
                            backgroundColor: '#ffffff',
                            cursor: 'pointer',
                            outline: 'none'
                          }}
                        >
                          <option value="Available">Available</option>
                          <option value="Pending">Pending</option>
                          <option value="Sold">Sold</option>
                        </select>
                      </div>
                      <button
                        onClick={() => handleDeleteListing(selectedProduct._id)}
                        style={{
                          backgroundColor: '#ef4444',
                          color: '#ffffff',
                          border: 'none',
                          padding: '8px 16px',
                          borderRadius: '8px',
                          fontSize: '13px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          transition: 'opacity 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                        onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                      >
                        Delete Listing
                      </button>
                    </div>
                  </div>
                ) : (
                  <div style={{
                    borderTop: '1px solid var(--page-border)',
                    paddingTop: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '16px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(79, 70, 229, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--page-accent)' }}>
                        <User size={20} />
                      </div>
                      <div>
                        <span style={{ fontSize: '11px', color: 'var(--page-muted)', display: 'block' }}>Posted by student</span>
                        <strong style={{ fontSize: '14px', color: 'var(--page-text)' }}>{selectedProduct.seller?.name || 'Campus Student'}</strong>
                        <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: 'var(--page-muted)' }}>
                          {selectedProduct.seller?.email || selectedProduct.sellerEmail || 'seller@example.com'}
                        </p>
                        <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: 'var(--page-muted)' }}>
                          {selectedProduct.seller?.contact || selectedProduct.sellerContact || '+1 555-0000'}
                        </p>
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <a
                        href={`mailto:${selectedProduct.seller?.email || selectedProduct.sellerEmail || 'trade@university.edu'}?subject=Inquiry: ${encodeURIComponent(selectedProduct.title)}`}
                        className="primary-button"
                        style={{ padding: '12px 24px', borderRadius: '12px', textDecoration: 'none' }}
                      >
                        Contact Seller
                      </a>
                      <a
                        href={`tel:${selectedProduct.seller?.contact || selectedProduct.sellerContact || ''}`}
                        className="secondary-button"
                        style={{ padding: '12px 24px', borderRadius: '12px', textDecoration: 'none' }}
                      >
                        Call Seller
                      </a>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
