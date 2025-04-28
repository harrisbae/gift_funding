#!/bin/bash

# 프론트엔드와 백엔드 서버를 동시에 실행하는 스크립트
echo "Starting Gift Funding Application (Frontend & Backend)..."

# 현재 스크립트의 디렉토리를 가져옴
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# 백엔드 서버 백그라운드로 실행
"$SCRIPT_DIR/start-backend.sh" &
BACKEND_PID=$!

# 1초 대기 (백엔드가 시작되는 시간 확보)
sleep 1

# 프론트엔드 서버 실행
"$SCRIPT_DIR/start-frontend.sh"

# 스크립트가 종료될 때 백엔드 프로세스도 종료
trap "kill $BACKEND_PID" EXIT 