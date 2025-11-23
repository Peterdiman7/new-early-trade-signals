# Project root
PROJECT_DIR="/home/devalex/early-trade-signals.com/early-trade-signals"
LOG_FILE="$HOME/early-trade-signals.log"
PORT=9104   # Adjust if needed

# Go to project root
cd "$PROJECT_DIR" || exit

# Optional: prevent multiple instances
if lsof -i :$PORT > /dev/null; then
  echo "Backend already running on port $PORT"
  exit 1
fi

# Explicitly load all .env variables
export $(grep -v '^#' .env | xargs)

# Auto-restart loop
while true; do
  echo "[$(date)] Starting backend server on port $PORT..." >> "$LOG_FILE" 2>&1
  /usr/bin/node src/services/server.js >> "$LOG_FILE" 2>&1
  echo "[$(date)] Backend crashed or stopped. Restarting in 5 seconds..." >> "$LOG_FILE" 2>&1
  sleep 5
done
