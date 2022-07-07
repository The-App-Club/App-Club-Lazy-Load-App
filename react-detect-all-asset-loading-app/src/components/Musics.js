import { useState, useRef, useMemo, createRef } from 'react';
import { after } from 'underscore';

const Musics = ({ urls, notifier }) => {
  const count = useRef(0);
  const loadedMusicDomListRef = useMemo(() => {
    return urls.map((url, index) => {
      return createRef();
    });
  }, [urls]);
  const [loading, setLoading] = useState(true);
  const onComplete = after(urls.length, (e) => {
    setLoading(false);
    notifier({
      status: 0,
      domInfoList: loadedMusicDomListRef.map((loadedImageDomRef) => {
        const dom = loadedImageDomRef.current;
        return { dom };
      }),
    });
    // window.alert('loaded');
    // console.log('loaded');
  });
  const onProgress = (e) => {
    count.current = count.current + 1;
    notifier({
      count: count.current,
      total: urls.length,
      progress: count.current / urls.length,
    });
  };
  return (
    <>
      {loading && <span>Loading ...</span>}
      {urls.map((url, index) => {
        return (
          <audio
            ref={loadedMusicDomListRef[index]}
            src={url}
            onLoadStart={(e) => {
              // console.log(e);
            }}
            onLoadedData={(e) => {
              // console.log(e);
            }}
            onLoad={(e) => {
              console.log(e);
              // onComplete(e);
              // onProgress(e);
            }}
            onError={onComplete}
            key={index}
          ></audio>
        );
      })}
    </>
  );
};

export { Musics };
