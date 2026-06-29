#!/bin/bash

  if [ ! -n "$1" ]; then
    echo 'error: You should write path in parameter!'
    exit -1
  fi

  dirname=$(dirname "$1")  

  if [ ! -d "$dirname" ]; then
    echo "error: path $dirname not found!"
    exit -1
  fi

  newdir=$(basename "$1")
  newpath="$dirname/$newdir"
  mkdir "$newpath"

  if [ $? -ne 0 ]; then
    echo -e "\nerror: $newpath exists!"
    exit -1 
  fi

  touch "$newpath"/{index.ts,"$newdir".tsx,"$newdir".module.scss}
  echo "export { default } from './$newdir'" > "$newpath/index.ts"
  cat > "$newpath/$newdir.tsx" << EOF
interface Props {}

const $newdir:React.FC<Props> = () => ()
export default $newdir
EOF

echo "New files created!"
ls "$newpath"

