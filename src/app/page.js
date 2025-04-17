"use client";
import React from 'react';

import { useEffect, useState } from 'react';

export default function ViewersPage() {
  const [viewers, setViewers] = useState(null);

  const apiKey = 'AIzaSyCod16mNBUfXDZN9rNmxrUocyg0LAFLDmA';
  const videoId = 'KkBqGTKm378';

  useEffect(() => {
    const fetchViewers = async () => {
      try {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails&id=${videoId}&key=${apiKey}`
        );
        const data = await res.json();
        const count = data.items[0]?.liveStreamingDetails?.concurrentViewers || '0';
        setViewers(count);
      } catch (err) {
        console.error('Erro ao buscar viewers:', err);
        setViewers('Erro');
      }
    };

    fetchViewers();
    const interval = setInterval(fetchViewers, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <div id="title"> CONEXÕES AO VIVO<br />COMUNIDADE DA FÉ CHURCH</div>
      <div id="viewersCount">
        {viewers === null ? 'Carregando...' : ` ${viewers} ao vivo`}
      </div>

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          height: 100vh;
          width: 100vw;
          background-color: #000000;
          color: #ffffff;
          font-family: 'Arial', sans-serif;
          padding: 20px;
        }

        #title {
          font-size: 2.8rem;
          font-weight: bold;
          margin-bottom: 3rem;
          text-shadow: 3px 3px 10px rgba(0, 0, 0, 0.7);
        }

        #viewersCount {
          font-size: 6rem;
          font-weight: bold;
          color:rgb(255, 174, 0);
          text-shadow: 4px 4px 20px rgba(0, 0, 0, 0.8);
        }

        @media (max-height: 720px) {
          #title {
            font-size: 2.2rem;
          }

          #viewersCount {
            font-size: 4.5rem;
          }
        }
      `}</style>
    </div>
  );
}
