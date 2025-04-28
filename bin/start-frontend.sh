#!/bin/bash

# 프론트엔드 서버 실행 스크립트
echo "Starting Gift Funding Frontend Server..."

# 현재 스크립트의 디렉토리를 가져옴
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
# 프로젝트 루트 디렉토리 (스크립트 위치에서 한 단계 위)
PROJECT_ROOT="$SCRIPT_DIR/.."
# 프론트엔드 디렉토리
FRONTEND_DIR="$PROJECT_ROOT/front"

# 프론트엔드 디렉토리로 이동
cd "$FRONTEND_DIR" || { echo "Error: Frontend directory not found"; exit 1; }

# npm으로 의존성 설치 및 서버 실행
if command -v npm &> /dev/null; then
    # 필요시 의존성 설치 (node_modules가 없는 경우)
    if [ ! -d "node_modules" ]; then
        echo "Installing dependencies..."
        npm install
    fi
    
    # 서버 실행
    npm start
else
    echo "Error: npm not found. Please install Node.js and npm."
    exit 1
fi 