import './index.scss';
import {enter} from './lock';
import {sleep} from './sleep';

const imageWallDom = document.getElementById('imageWall');

const fetchImage = (id, successCallBack, errorCallBack) => {
  return new Promise((resolve, reject) => {
    const imageDom = new Image();
    imageDom.onload = (e) => {
      resolve(successCallBack(imageDom));
    };
    imageDom.onerror = (e) => {
      reject(errorCallBack());
    };
    imageDom.src = `https://picsum.photos/seed/${id}/300/300`;
  });
};

const loadImage = async (id) => {
  const imageWrapperDom = document.createElement('div');
  imageWallDom.appendChild(imageWrapperDom);

  // ロック獲得 -- 処理数が上限を超えていればここで待たされる
  const release = await enter();

  // ローディング表示を開始
  imageWrapperDom.classList.add('loading');

  await sleep(Math.random() * 500); // ネットワークジャギーのエミュレート

  const onLoadSuccess = (imageDom) => {
    imageWrapperDom.classList.remove('loading');
    release(); // ロックを解放する
    imageWrapperDom.appendChild(imageDom);
  };

  const onLoadError = (e) => {
    console.log(e);
  };

  // 読み込み開始
  await fetchImage(id, onLoadSuccess, onLoadError);
};

for (let index = 0; index < 36; index++) {
  loadImage(index + 1);
}
