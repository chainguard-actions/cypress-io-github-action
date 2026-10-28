#!/usr/bin/env bash
# Appends the first argument (a label) and the current directory to $MARKER_FILE.
set -e
if [ -z "$MARKER_FILE" ]; then
  echo "MARKER_FILE is not set" >&2
  exit 1
fi
echo "$1 $(pwd)" >> "$MARKER_FILE"
echo "wrote marker '$1' to $MARKER_FILE"
