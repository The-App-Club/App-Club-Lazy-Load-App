import { createRoot } from 'react-dom/client';
import { useEffect, useRef, useCallback } from 'react';
import './styles/index.scss';
import { css } from '@emotion/css';
import { Skeleton } from '@mui/material';
import { LoadingIcon } from './components/LoadingIcon';
import { Images } from './components/Images';
import { Musics } from './components/Musics';
import { default as imageList } from './data/image.json';
import { default as musicList } from './data/music.json';

const App = () => {
  const notifyLoaded = useCallback((message) => {
    console.log(message);
  }, []);
  return (
    <>
      <Musics urls={musicList} notifier={notifyLoaded} />
      {/* <Images urls={imageList} notifier={notifyLoaded} /> */}
    </>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
