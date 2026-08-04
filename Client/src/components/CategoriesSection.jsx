import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Car, 
  Bike, 
  Smartphone, 
  Home, 
  Laptop, 
  Briefcase, 
  Sofa, 
  Shirt, 
  PawPrint, 
  BookOpen, 
  Gamepad2, 
  Wrench,
  ArrowRight
} from 'lucide-react';
import { categories } from '../data/categoriesData';

// Map icon name to component
const iconMap = {
  Car,
  Bike,
  Smartphone,
  Home,
  Laptop,
  Briefcase,
  Sofa,
  Shirt,
  PawPrint,
  BookOpen,
  Gamepad2,
  Wrench
};

export default function CategoriesSection() {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    // Navigate to marketplace and pass the selected category name as state or search param
    navigate(`/marketplace?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <section className="categories-section" style={{ padding: '80px 0', background: 'linear-gradient(180deg, rgba(248, 250, 252, 0.5) 0%, rgba(255, 255, 255, 1) 100%)' }}>
      <div className="page-home">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span style={{
            fontSize: '13px',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--page-accent)',
            backgroundColor: 'rgba(79, 70, 229, 0.08)',
            padding: '6px 16px',
            borderRadius: '999px',
            display: 'inline-block',
            marginBottom: '12px'
          }}>
            Categories
          </span>
          <h2 style={{
            fontSize: 'clamp(2rem, 3vw, 2.75rem)',
            fontWeight: '800',
            letterSpacing: '-0.03em',
            color: 'var(--page-text)',
            margin: '0 auto 16px',
            maxWidth: '800px',
            lineHeight: '1.15'
          }}>
            Explore Campus Listings By Category
          </h2>
          <p style={{
            fontSize: '1rem',
            color: 'var(--page-muted)',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Find exactly what you need from verified fellow students, safely transacted right here on campus.
          </p>
        </div>

        {/* Categories Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '24px',
          marginTop: '40px'
        }}>
          {categories.map((cat) => {
            const IconComponent = iconMap[cat.iconName] || Wrench;
            return (
              <div
                key={cat.id}
                onClick={() => handleCategoryClick(cat.name)}
                style={{
                  background: '#ffffff',
                  border: '1px solid var(--page-border)',
                  borderRadius: '20px',
                  padding: '24px',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '180px',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -1px rgba(0, 0, 0, 0.006)'
                }}
                className="category-card-hover"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)';
                  e.currentTarget.style.borderColor = cat.color;
                  const glow = e.currentTarget.querySelector('.card-glow');
                  if (glow) glow.style.opacity = '0.04';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -1px rgba(0, 0, 0, 0.006)';
                  e.currentTarget.style.borderColor = 'var(--page-border)';
                  const glow = e.currentTarget.querySelector('.card-glow');
                  if (glow) glow.style.opacity = '0';
                }}
              >
                {/* Background Glow */}
                <div 
                  className="card-glow"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: cat.gradient,
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    pointerEvents: 'none',
                    zIndex: 0
                  }}
                />

                <div style={{ position: 'relative', zIndex: 1 }}>
                  {/* Icon Backdrop */}
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: cat.bgLight,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: cat.color,
                    marginBottom: '16px',
                    transition: 'all 0.3s ease'
                  }}>
                    <IconComponent size={24} strokeWidth={2} />
                  </div>

                  {/* Title */}
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: 'var(--page-text)',
                    margin: '0 0 6px 0'
                  }}>
                    {cat.name}
                  </h3>

                  {/* Description */}
                  <p style={{
                    fontSize: '13px',
                    color: 'var(--page-muted)',
                    margin: 0,
                    lineHeight: '1.4'
                  }}>
                    {cat.description}
                  </p>
                </div>

                {/* Bottom Row */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: cat.color,
                  position: 'relative',
                  zIndex: 1,
                  marginTop: '12px'
                }}>
                  <span>Browse Category</span>
                  <ArrowRight size={14} style={{ transition: 'transform 0.2s ease' }} className="arrow-hover" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
