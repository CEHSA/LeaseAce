type LocationResult = {
  success: boolean;
  address?: string;
  error?: string;
};

export const getFormattedLocation = async (): Promise<LocationResult> => {
  try {
    // Get current position
    const position = await new Promise<GeolocationPosition>((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported'));
        return;
      }
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      });
    });

    // Use reverse geocoding to get address
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
    );

    if (!response.ok) {
      throw new Error('Failed to get address');
    }

    const data = await response.json();
    
    // Format address components
    const address = data.address;
    const components = [];

    // Add house number if available
    if (address.house_number) {
      components.push(address.house_number);
    }

    // Add street name
    if (address.road) {
      components.push(address.road);
    }

    // Add suburb/area
    if (address.suburb) {
      components.push(address.suburb);
    }

    // Add city
    if (address.city || address.town) {
      components.push(address.city || address.town);
    }

    // Add state/province
    if (address.state) {
      components.push(address.state);
    }

    // Add country
    if (address.country) {
      components.push(address.country);
    }

    // Add postal code
    if (address.postcode) {
      components.push(address.postcode);
    }

    // Join all components with proper formatting
    const formattedAddress = components.join(' - ');

    return {
      success: true,
      address: formattedAddress
    };
  } catch (error) {
    console.error('Error getting location:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get location'
    };
  }
};

export const requestLocationPermission = async (): Promise<boolean> => {
  try {
    const result = await navigator.permissions.query({ name: 'geolocation' });
    if (result.state === 'granted') {
      return true;
    }
    if (result.state === 'prompt') {
      // Trigger permission prompt by requesting position
      await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error requesting location permission:', error);
    return false;
  }
};