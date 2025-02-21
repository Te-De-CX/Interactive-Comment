import React from 'react';
import Comments from './Comments';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <Comments />
      </div>
    </div>
  );
};

export default Layout;