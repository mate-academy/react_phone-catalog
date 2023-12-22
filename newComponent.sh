#!/bin/bash

if [ $# -eq 0 ]; then
  echo "Usage: $0 <ComponentName>"
  exit 1
fi

ComponentName=$1
ComponentDirectory="src/components/$ComponentName"

# Создаем директорию
mkdir -p $ComponentDirectory

# Создаем файлы
touch "$ComponentDirectory/$ComponentName.tsx"
touch "$ComponentDirectory/$ComponentName.scss"
touch "$ComponentDirectory/index.js"

# Вставляем код в index.js
echo "export * from './$ComponentName';" > "$ComponentDirectory/index.js"

# Вставляем код в .tsx
echo "import './$ComponentName.scss';

export const $ComponentName = () => {
  return (
    <div className=\"$ComponentName\">
      $ComponentName
    </div>
  );
};" > "$ComponentDirectory/$ComponentName.tsx"

# Вставляем код в .scss
echo ".$ComponentName {

}" > "$ComponentDirectory/$ComponentName.scss"

echo "Component '$ComponentName' created successfully in '$ComponentDirectory'"
