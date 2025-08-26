#!/bin/bash
if [ -f five.pid ]; then
  kill $(cat five.pid)
  rm five.pid
  echo "Server stopped."
fi

nohup node five.js > output.log 2>&1 &
echo $! > five.pid
echo "Server restarted with PID $(cat five.pid)"
