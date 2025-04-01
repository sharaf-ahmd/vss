import React from 'react';
import { Search } from 'lucide-react';

const ServiceSearch = ({ searchQuery, setSearchQuery, selectedService, setSelectedService }) => {
  return (
    <div className="search-section">
      <h1 className="search-title">Find Auto Services Near You</h1>
      
      <div className="search-container">
        <div className="search-input-container">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search services or shops..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        
        <select
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
          className="service-select"
        >
          <option value="all">All Services</option>
          <option value="maintenance">Maintenance</option>
          <option value="repair">Repair</option>
          <option value="diagnostic">Diagnostic</option>
        </select>
      </div>
    </div>
  );
};

export default ServiceSearch;