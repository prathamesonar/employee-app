
import React from 'react';

const SkeletonLoader = () => {
  return (
    <tr className="skeleton-row">
      <td><div className="skeleton-line"></div></td>
      <td><div className="skeleton-line"></div></td>
      <td><div className="skeleton-line"></div></td>
      <td><div className="skeleton-line"></div></td>
      <td><div className="skeleton-line"></div></td>
    </tr>
  );
};

export default SkeletonLoader;
