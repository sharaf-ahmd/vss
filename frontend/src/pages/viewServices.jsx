import React, { useEffect, useState } from 'react';
import { useServiceStore } from '../store/service';
import ServiceList from '@/components/ServiceList';
import ServiceSearch from '@/components/ServiceSearch';
import BackButton from '@/components/BackButton';

const styles = {
  dashboardContainer: {
    textAlign: 'center',
    backgroundColor: '#000',
    color: 'white',
    padding: '20px',
    minHeight: '100vh',
  },
  dashboardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    width: '100%',
  },
};

const UserDash = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState('all');
  const { fetchServices, services } = useServiceStore();

  useEffect(() => {
    try {
      fetchServices();
    } catch (err) {
      console.error('Failed to fetch services:', err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

const filteredServices = Array.isArray(services)
  ? services.filter((service) => {
      const name = service?.name?.toLowerCase() || '';
      const shop = service?.shop?.toLowerCase() || '';
      const type = service?.type || '';
      
      const matchesSearch =
        name.includes(searchQuery.toLowerCase()) || shop.includes(searchQuery.toLowerCase());

      const matchesType = selectedService === 'all' || type === selectedService;

      return matchesSearch && matchesType;
    })
  : [];


  return (
    <div style={styles.dashboardContainer}>
      <BackButton />
      <div style={styles.dashboardContent}>
        <ServiceSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedService={selectedService}
          setSelectedService={setSelectedService}
        />
        <ServiceList services={filteredServices} />
      </div>
    </div>
  );
};

export default UserDash;