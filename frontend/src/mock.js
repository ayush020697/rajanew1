// Mock data for Rajan Wines

export const storeLocations = [
  {
    id: 1,
    city: "Agra",
    address: "Shop No. XX, Sector XX, Agra - 282001",
    phone: "+91-7983611438",
    timing: "10:00 AM - 10:00 PM",
    coordinates: { lat: 27.1767, lng: 78.0081 }
  },
  {
    id: 2,
    city: "Noida",
    address: "Shop No. XX, Sector XX, Noida - 201301",
    phone: "+91-7983611438",
    timing: "10:00 AM - 11:00 PM",
    coordinates: { lat: 28.5355, lng: 77.3910 }
  },
  {
    id: 3,
    city: "Ghaziabad",
    address: "Shop No. XX, Sector XX, Ghaziabad - 201001",
    phone: "+91-7983611438",
    timing: "10:00 AM - 10:00 PM",
    coordinates: { lat: 28.6692, lng: 77.4538 }
  },
  {
    id: 4,
    city: "Jaipur",
    address: "Shop No. XX, Sector XX, Jaipur - 302001",
    phone: "+91-7983611438",
    timing: "10:00 AM - 10:30 PM",
    coordinates: { lat: 26.9124, lng: 75.7873 }
  },
  {
    id: 5,
    city: "Mathura",
    address: "Shop No. XX, Sector XX, Mathura - 281001",
    phone: "+91-7983611438",
    timing: "10:00 AM - 10:00 PM",
    coordinates: { lat: 27.4924, lng: 77.6737 }
  },
  {
    id: 6,
    city: "Hathras",
    address: "Shop No. XX, Sector XX, Hathras - 204101",
    phone: "+91-7983611438",
    timing: "10:00 AM - 9:30 PM",
    coordinates: { lat: 27.5950, lng: 78.0500 }
  },
  {
    id: 7,
    city: "Farrukhabad",
    address: "Shop No. XX, Sector XX, Farrukhabad - 209625",
    phone: "+91-7983611438",
    timing: "10:00 AM - 10:00 PM",
    coordinates: { lat: 27.3882, lng: 79.5799 }
  }
];

export const productCategories = [
  {
    id: 1,
    name: "Whisky",
    description: "Premium single malts and blended whiskies from around the world",
    image: "https://images.unsplash.com/photo-1746422029293-43065303dab5",
    count: 50
  },
  {
    id: 2,
    name: "Red Wine",
    description: "Exquisite red wines from renowned vineyards",
    image: "https://images.unsplash.com/photo-1714377769989-140c9e47fbb9",
    count: 45
  },
  {
    id: 3,
    name: "White Wine",
    description: "Crisp and refreshing white wines for every occasion",
    image: "https://images.unsplash.com/photo-1769521838105-5d68119e88be",
    count: 35
  },
  {
    id: 4,
    name: "Sparkling Wine",
    description: "Celebrate life's moments with premium champagne and prosecco",
    image: "https://images.unsplash.com/photo-1713664060730-fe94cb5df25d",
    count: 25
  },
  {
    id: 5,
    name: "Vodka",
    description: "Crystal clear premium vodkas for the perfect mix",
    image: "https://images.unsplash.com/photo-1759912316272-a414bf146476",
    count: 30
  },
  {
    id: 6,
    name: "Rum",
    description: "Rich and smooth rums from the Caribbean and beyond",
    image: "https://images.unsplash.com/photo-1674916084024-50cdd3f6b864",
    count: 28
  },
  {
    id: 7,
    name: "Gin",
    description: "Botanical gins for craft cocktail enthusiasts",
    image: "https://images.unsplash.com/photo-1737029114889-8f5edb15b8be",
    count: 22
  },
  {
    id: 8,
    name: "Beer",
    description: "Premium craft and imported beers",
    image: "https://images.unsplash.com/photo-1732525819066-88074e2d2748",
    count: 40
  }
];

export const featuredProducts = [
  {
    id: 1,
    name: "Jack Daniel's Single Barrel",
    category: "Whisky",
    origin: "Tennessee, USA",
    description: "Hand-selected single barrel Tennessee whiskey",
    image: "https://images.unsplash.com/photo-1746422029293-43065303dab5",
    featured: true
  },
  {
    id: 2,
    name: "Château Reserve",
    category: "Red Wine",
    origin: "Bordeaux, France",
    description: "Full-bodied red wine with rich tannins",
    image: "https://images.unsplash.com/photo-1714377769989-140c9e47fbb9",
    featured: true
  },
  {
    id: 3,
    name: "Grey Goose",
    category: "Vodka",
    origin: "France",
    description: "Premium French wheat vodka",
    image: "https://images.unsplash.com/photo-1759912316272-a414bf146476",
    featured: true
  },
  {
    id: 4,
    name: "Ardbeg Corryvreckan",
    category: "Whisky",
    origin: "Islay, Scotland",
    description: "Peaty single malt Scotch whisky",
    image: "https://images.unsplash.com/photo-1767217667288-8b50f1dc2103",
    featured: true
  }
];

export const offers = [
  {
    id: 1,
    title: "Premium Selection",
    description: "Flat 15% off on premium whisky collection",
    validUntil: "Limited Time Offer",
    category: "Whisky"
  },
  {
    id: 2,
    title: "Wine Festival",
    description: "Buy 2 Get 1 on selected wine bottles",
    validUntil: "Valid till 31st Dec",
    category: "Wine"
  },
  {
    id: 3,
    title: "Party Starter",
    description: "Special combo offers on vodka and mixers",
    validUntil: "Weekend Special",
    category: "Vodka"
  },
  {
    id: 4,
    title: "Membership Benefits",
    description: "Join our loyalty program for exclusive deals",
    validUntil: "Year Round",
    category: "All"
  }
];

export const whyChooseUs = [
  {
    id: 1,
    title: "Authentic Products",
    description: "100% genuine products directly sourced from authorized distributors",
    icon: "shield-check"
  },
  {
    id: 2,
    title: "Premium Selection",
    description: "Curated collection of world-class wines and spirits",
    icon: "award"
  },
  {
    id: 3,
    title: "Expert Guidance",
    description: "Knowledgeable staff to help you choose the perfect bottle",
    icon: "users"
  },
  {
    id: 4,
    title: "Convenient Locations",
    description: "Multiple stores across major cities for easy access",
    icon: "map-pin"
  },
  {
    id: 5,
    title: "Competitive Pricing",
    description: "Best prices on premium brands without compromising quality",
    icon: "tag"
  },
  {
    id: 6,
    title: "Since 2003",
    description: "Over 20 years of trust and excellence in the industry",
    icon: "clock"
  }
];

export const socialMedia = {
  instagram: "https://instagram.com/rajan.wines",
  facebook: "https://facebook.com/rajanwines",
  twitter: "https://twitter.com/rajanwines",
  email: "rajanwines2001@gmail.com",
  phone: "+91-7983611438"
};
