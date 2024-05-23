// LoadingSpinner.js
import React from 'react';
import { CardSkeleton } from '../ui/components/skeletons';

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
            <CardSkeleton cardWidth="full" /> 
    </div>
  );
};

export default LoadingSpinner;
