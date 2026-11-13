#!/usr/bin/env bash
# Fetches the fixture server response and stores it as a marker.
set -e
mkdir -p /tmp/cypress-markers
curl -sf http://localhost:8765/ > /tmp/cypress-markers/served
cat /tmp/cypress-markers/served
