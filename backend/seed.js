const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Service = require('./src/models/Service');

dotenv.config();

const services = [
  {
    title: 'Franchise Modules',
    description: 'Partnering with leading global and local franchises to deliver comprehensive business solutions.',
    price: 'Custom',
    category: 'Branding',
    features: ['Global Franchise Network', 'Business Solutions', 'Brand Collaboration'],
    isActive: true
  },
  {
    title: 'Auto Brand',
    description: 'Professional vehicle branding solutions to make your brand mobile and visible.',
    price: '₹550 - ₹1,100',
    category: 'Branding',
    features: ['Vehicle Wraps', 'Mobile Advertising', 'High Visibility'],
    isActive: true
  },
  {
    title: 'Bus Brand',
    description: 'Interior and exterior bus branding for maximum brand visibility and passenger engagement.',
    price: '₹4,500 - ₹12,000',
    category: 'Branding',
    features: ['Interior Branding', 'Exterior Branding', 'Passenger Engagement'],
    isActive: true
  },
  {
    title: 'Auto Mobile Brand',
    description: 'Mobile auto branding services for maximum reach and visibility.',
    price: '₹2,000/day',
    category: 'Branding',
    features: ['Mobile Branding', 'Daily Rentals', 'Maximum Reach'],
    isActive: true
  },
  {
    title: 'Digital Marketing',
    description: 'Complete social media management packages from basic to premium.',
    price: '₹21,000 - ₹50,000',
    category: 'Marketing',
    features: ['Social Media Management', 'Content Creation', 'Analytics', 'Ad Campaigns'],
    isActive: true
  },
  {
    title: 'Websites',
    description: 'Beautiful, fast-loading static websites with modern design and animations.',
    price: '₹6,000 - ₹12,000',
    category: 'Development',
    features: ['Modern Design', 'Fast Loading', 'Responsive', 'Animations'],
    isActive: true
  },
  {
    title: 'PVR Advertisements',
    description: '15-second, 30-second, or 60-second video ads played before movie trailers or during interval.',
    price: 'Custom',
    category: 'Advertising',
    features: ['Video Ads', 'High Recall Value', 'Movie Audience'],
    isActive: true
  },
  {
    title: 'Radio Advertising',
    description: 'Strategic radio advertising campaigns on popular FM stations during peak hours.',
    price: 'Custom',
    category: 'Advertising',
    features: ['FM Radio Ads', 'Peak Hours', 'Mass Reach'],
    isActive: true
  },
  {
    title: 'News Channel Advertising',
    description: 'Television advertising on leading news channels during prime time and breaking news.',
    price: 'Custom',
    category: 'Advertising',
    features: ['TV Ads', 'Prime Time', 'Breaking News', 'High Credibility'],
    isActive: true
  },
  {
    title: 'Water Bottle Advertising',
    description: 'Innovative brand promotion through customized water bottle labels for events and corporate gifting.',
    price: 'Custom',
    category: 'Advertising',
    features: ['Custom Labels', 'Events', 'Corporate Gifting', 'High Recall'],
    isActive: true
  }
];

async function seedServices() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    // Clear existing services
    await Service.deleteMany();
    console.log('🗑️ Cleared existing services');
    
    // Insert new services
    await Service.insertMany(services);
    console.log(`✅ Added ${services.length} services`);
    
    console.log('🎉 Seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding:', error.message);
    process.exit(1);
  }
}

seedServices();