#!/bin/bash

# 백엔드 서버 실행 스크립트
echo "Starting Gift Funding Backend Server..."

# 현재 스크립트의 디렉토리를 가져옴
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
# 프로젝트 루트 디렉토리 (스크립트 위치에서 한 단계 위)
PROJECT_ROOT="$SCRIPT_DIR/.."
# 백엔드 디렉토리
BACKEND_DIR="$PROJECT_ROOT/back"

# 백엔드 디렉토리로 이동
cd "$BACKEND_DIR" || { echo "Error: Backend directory not found"; exit 1; }

# 메이븐 로컬 저장소 위치 설정
export MAVEN_OPTS="-Dmaven.repo.local=$BACKEND_DIR/.m2/repository"

# Maven으로 빌드 및 실행
if [ -f "./mvnw" ]; then
    # Maven Wrapper가 있는 경우 사용
    echo "Using Maven Wrapper..."
    chmod +x ./mvnw
    
    # 먼저 clean 및 dependencies 설치
    ./mvnw clean
    ./mvnw dependency:resolve
    
    # 스프링 부트 실행
    ./mvnw org.springframework.boot:spring-boot-maven-plugin:2.7.0:run
elif command -v mvn &> /dev/null; then
    # 시스템에 Maven이 설치된 경우 사용
    echo "Using system Maven..."
    mvn clean
    mvn dependency:resolve
    mvn org.springframework.boot:spring-boot-maven-plugin:2.7.0:run
else
    echo "Error: Maven not found. Please install Maven or check if Maven Wrapper exists."
    exit 1
fi 