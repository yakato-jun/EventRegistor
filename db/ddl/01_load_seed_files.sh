#!/bin/bash
script_dir=$(dirname "${BASH_SOURCE[0]}")
echo "Executing seed files in $script_dir"
cd $script_dir
for file in `ls ./seed_files/*.sql`; do
  echo "Executing $file"
  mysql -u root -p$MYSQL_ROOT_PASSWORD $MYSQL_DATABASE < $file
done

