#!/bin/bash
if [ -f five.pid ]; then
  kill $(cat five.pid)
  rm five.pid
  echo "Server stopped."
else
  echo "No PID file found. Server might not be running."
fi
