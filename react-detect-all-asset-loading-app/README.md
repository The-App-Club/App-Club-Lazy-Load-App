- Reference
  - [How to Detect when All Images are Loaded in a React Component](https://medium.com/programming-essentials/how-to-detect-when-all-images-are-loaded-in-a-react-component-d831d0c675b2)

```bash

$ curl -s  -H "Authorization: Token 1AfVYuwlR2PBaqj2AHyilaFsKn9Is4eteT6BtxWc" 'https://freesound.org/apiv2/search/text/?query=classic&filter=duration:%5B3%20TO%205%5D&fields=url,id,username,download,duration,name' | jq '.results|map("https://freesound.org/people/"+.username+"/sounds/"+(.id|tostring)+"/download/"+(.id|tostring)+"__"+.username+"__"+(.name|split(" ")|join("-")))' >a.json

$ curl -s  -H "Authorization: Token 1AfVYuwlR2PBaqj2AHyilaFsKn9Is4eteT6BtxWc" 'https://freesound.org/apiv2/search/text/?query=jazz&filter=duration:%5B3%20TO%205%5D&fields=url,id,username,download,duration,name' | jq '.results|map("https://freesound.org/people/"+.username+"/sounds/"+(.id|tostring)+"/download/"+(.id|tostring)+"__"+.username+"__"+(.name|split(" ")|join("-")))' >b.json

$ curl -s  -H "Authorization: Token 1AfVYuwlR2PBaqj2AHyilaFsKn9Is4eteT6BtxWc" 'https://freesound.org/apiv2/search/text/?query=piano&filter=duration:%5B3%20TO%205%5D&fields=url,id,username,download,duration,name' | jq '.results|map("https://freesound.org/people/"+.username+"/sounds/"+(.id|tostring)+"/download/"+(.id|tostring)+"__"+.username+"__"+(.name|split(" ")|join("-")))' >c.json


$ cat a.json >>src/data/music.json
$ cat b.json >>src/data/music.json
$ cat c.json >>src/data/music.json

$ cat src/data/music.json | jq -s 'flatten' | sponge src/data/music.json
```
