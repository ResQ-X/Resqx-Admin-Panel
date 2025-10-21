#!/bin/bash
for file in $(git ls-files components/ui/*.tsx); do
  dir=$(dirname "$file")
  base=$(basename "$file" .tsx)
  # Capitalize first letter
  newbase="$(echo ${base:0:1} | tr '[:lower:]' '[:upper:]')${base:1}"
  if [ "$base" != "$newbase" ]; then
    echo "Renaming $file to $dir/$newbase.tsx"
    git mv "$file" "$dir/${newbase}.tsx"
  fi
done
