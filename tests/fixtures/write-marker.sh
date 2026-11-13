#!/usr/bin/env bash
# Usage: write-marker.sh NAME [args...]
# Writes the current working directory and all args to /tmp/cypress-markers/NAME
set -e
name="$1"
mkdir -p /tmp/cypress-markers
{
  echo "pwd=$(pwd)"
  echo "args=$*"
} > "/tmp/cypress-markers/$name"
echo "marker $name written"
