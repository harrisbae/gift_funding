#!/bin/bash

# 스프링 부트 애플리케이션 자바 직접 실행 스크립트
echo "Starting Gift Funding Backend using Java directly..."

# 필요한 디렉토리 생성
mkdir -p target/classes

# Maven Wrapper로 의존성 다운로드 및 컴파일
./mvnw clean compile dependency:copy-dependencies

# 클래스패스 구성
CLASSPATH="target/classes"
for jar in target/dependency/*.jar; do
  CLASSPATH="$CLASSPATH:$jar"
done

# 메인 클래스 실행
java -cp $CLASSPATH com.giftfunding.api.GiftFundingApiApplication 