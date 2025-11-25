#!/bin/bash
while true; do
  echo "Starting frontend server..."
  npm run preview -- --port 9004
  echo "Server crashed or stopped. Restarting in 5 seconds..."
  sleep 5
done
