#!/bin/bash
nohup node five.js > output.log 2>&1 &
echo $! > five.pid
echo "Server started with PID $(cat five.pid)"