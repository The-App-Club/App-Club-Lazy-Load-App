- Reference
  - [useSWRInfinite を使うとページング(無限スクロール)の処理がシンプルに書けて気持ちいい！](https://zenn.dev/karamage/articles/12da0f44624707)
  - [infinite-loading](https://swr.vercel.app/examples/infinite-loading)
  - [react-skeleton](https://mui.com/material-ui/react-skeleton/)

## Serve API

```bash
$ curl -sL 'http://localhost:3000/pictures?_page=1&_limit=2' | jq
[
  {
    "id": "0",
    "author": "Alejandro Escamilla",
    "width": 5616,
    "height": 3744,
    "url": "https://unsplash.com/photos/yC-Yzbqy7PY",
    "download_url": "https://picsum.photos/id/0/5616/3744"
  },
  {
    "id": "1",
    "author": "Alejandro Escamilla",
    "width": 5616,
    "height": 3744,
    "url": "https://unsplash.com/photos/LNRyGwIJr5c",
    "download_url": "https://picsum.photos/id/1/5616/3744"
  }
]
```
