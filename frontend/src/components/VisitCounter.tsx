'use client';

import { useEffect, useState } from 'react';

function getVisitCount() {
  return fetch('/api/visit-count')
    .then(response => response.json())
    .then(data => {
      return data.count;
    })
    .catch(error => {
      console.error('Error fetching visit count:', error);
      return 0;
    });
}

export default function VisitCounter() {
  const [visitCount, setVisitCount] = useState(0);

  useEffect(() => {
    getVisitCount().then(count => {
      setVisitCount(count);
    });
  }, []);

  return <p>
    Total visit count: {visitCount}
  </p>
}
