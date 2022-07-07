import { createRoot } from 'react-dom/client';
import React, { Suspense } from 'react';
import { LoadingIcon } from './components/LoadingIcon';
import { css } from '@emotion/css';

const loadApp = async () => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        state: 'done',
      });
    }, 4000);
  });

  await promise;
};

function wrapPromise(promise) {
  let status = 'pending';
  let result;
  let suspender = promise.then(
    (r) => {
      status = 'success';
      result = r;
    },
    (e) => {
      status = 'error';
      result = e;
    }
  );
  return {
    read() {
      if (status === 'pending') {
        throw suspender;
      } else if (status === 'error') {
        throw result;
      } else if (status === 'success') {
        return result;
      }
    },
  };
}

const suspenderCheck = wrapPromise(loadApp());

const ChildComponent = () => {
  const data = suspenderCheck.read();
  console.log(data);
  return (
    <div>
      <h1>Hello</h1>
      <h2>Tutorial on React Suspense!</h2>
    </div>
  );
};

const App = () => {
  return (
    <div className="App">
      <Suspense
        fallback={
          <div
            className={css`
              display: grid;
              place-items: center;
              height: 100vh;
              width: 100%;
            `}
          >
            <LoadingIcon width={300} height={300} />
          </div>
        }
      >
        <ChildComponent />
      </Suspense>
    </div>
  );
};
const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
