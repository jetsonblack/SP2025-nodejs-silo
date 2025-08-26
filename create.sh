#!/bin/bash

# Prompt for filename
read -p "Enter filename (without extension): " fname

# Define filenames
template="template.html"
output="${fname}.html"

# Check if template.html exists
if [[ ! -f "$template" ]]; then
  echo "Error: $template not found."
  exit 1
fi

# Replace %FILENAME% with actual filename and write to new file
sed "s/%FILENAME%/$fname/g" "$template" > "$output"

echo "Created $output from $template."
