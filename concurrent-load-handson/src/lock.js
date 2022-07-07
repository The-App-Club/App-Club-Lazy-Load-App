// 相互再帰みたいなやつ

class Queue {
  constructor(roomId) {
    this.roomId = roomId;
  }
}

// 最大同時処理数
const MAX_ROOMS = 3;

// 処理枠のリスト
let rooms = [];
// 処理待ちのリスト
const waitingList = [];

const enter = () => {
  const promise = new Promise((resolve) => {
    waitingList.push(resolve);
  });
  tryNext();
  return promise;
};

const release = (room) => {
  rooms = rooms.filter((r) => {
    return r !== room;
  });
  tryNext();
};

const tryNext = () => {
  if (rooms.length >= MAX_ROOMS) {
    return;
  }

  const next = waitingList.shift();
  if (!next) {
    return;
  }

  const room = new Queue(+(Math.random() * 10).toFixed(2)); // ここのクラスはなんでもいい

  rooms.push(room);

  // ここでコールバックしてresolveほぐしているのがみそ ほぐしつつ解放
  next(() => {
    release(room);
  });
};

export {enter};
