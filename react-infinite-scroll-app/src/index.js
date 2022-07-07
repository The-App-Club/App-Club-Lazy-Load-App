import { createRoot } from 'react-dom/client';
import { useEffect, useRef } from 'react';
import useSWRInfinite from 'swr/infinite';
import { useIntersection } from './hooks/useIntersection';
import './styles/index.scss';
import { css } from '@emotion/css';
import { Image } from './components/Image';
import { Skeleton } from '@mui/material';
import { LoadingIcon } from './components/LoadingIcon';

const App = ({ context }) => {
  const ref = useRef(null);
  const intersection = useIntersection(ref);
  const limit = 2; // intersectionを起こす最低限の高さを取るため

  const makeNiceURL = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) {
      return null;
    }
    // pageIndexは0からのため+1をしてpageIndexを1からにする
    // return `http://localhost:3000/pictures?_page=${
    //   pageIndex + 1
    // }&_limit=${limit}`;
    return `https://picsum.photos/v2/list?page=${pageIndex + 1}&limit=${limit}`;
  };

  const {
    data: picList,
    error,
    isValidating,
    mutate,
    size,
    setSize,
  } = useSWRInfinite(
    makeNiceURL,
    async (url) => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        console.log(JSON.stringify(json));
        return json;
      } catch (error) {
        return error;
      }
    },
    {
      initialSize: 2,
    }
  );

  const isEmpty = picList?.[0]?.length === 0;
  const isReachingEnd = picList && picList[picList.length - 1]?.length < limit;

  // 次のデータの取得
  const getPics = async () => {
    setSize(size + 1);
  };

  useEffect(() => {
    if (intersection && !isReachingEnd) {
      getPics();
    } else {
    }
  }, [intersection, isReachingEnd]);

  if (error) {
    return 'failed to load';
  }
  if (!picList) {
    return (
      <div
        className={css`
          max-width: 30rem;
          width: 100%;
          margin: 0 auto;
        `}
      >
        <div
          className={css`
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            gap: 3rem;
            position: relative;

            max-width: 300px;
            margin: 0 auto;
          `}
        >
          {[...Array(3)].map((n, index) => {
            return (
              <Skeleton
                key={index}
                variant="rectangular"
                width={300}
                height={200}
              />
            );
          })}
        </div>
      </div>
    );
  }

  const pics = picList.flat();

  const renderStatus = () => {
    if (!isReachingEnd) {
      return <LoadingIcon width={300} height={200} />;
    } else if (isEmpty) {
      return `no more loaded`;
    } else {
      return `all loaded`;
    }
  };

  return (
    <div
      className={css`
        max-width: 30rem;
        width: 100%;
        margin: 0 auto;
      `}
    >
      <div
        className={css`
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          gap: 3rem;
          position: relative;

          max-width: 300px;
          margin: 0 auto;
        `}
      >
        {pics.map((pic, i) => {
          return <Image key={i} src={pic.download_url} alt={pic.author} />;
        })}
      </div>

      <div
        ref={ref}
        className={css`
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          gap: 3rem;
          position: relative;

          max-width: 300px;
          margin: 0 auto;
        `}
      >
        {renderStatus()}
      </div>
    </div>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
