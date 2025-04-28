#!/bin/bash

# 스프링 부트 애플리케이션 직접 실행 스크립트
echo "Starting Gift Funding Backend directly..."

# Maven Wrapper가 있는지 확인
if [ -f "./mvnw" ]; then
    chmod +x ./mvnw
    
    # 메이븐 로컬 저장소 위치 설정
    export MAVEN_OPTS="-Dmaven.repo.local=./.m2/repository"
    
    # 클래스 컴파일
    ./mvnw clean compile
    
    # 메인 클래스 직접 실행
    ./mvnw exec:java -Dexec.mainClass="com.giftfunding.api.GiftFundingApiApplication"
else
    echo "Error: Maven Wrapper not found. Please run 'mvn -N io.takari:maven:wrapper' to create it."
    exit 1
fi 