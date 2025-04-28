import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h2 className="text-xl font-bold mb-4">선물 펀딩</h2>
            <p className="text-gray-300">사용자가 선물 캠페인을 생성하고 자금을 모을 수 있는 플랫폼입니다.</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-lg font-bold mb-4">링크</h3>
            <ul className="text-gray-300">
              <li className="mb-2"><a href="/" className="hover:text-primary-light">홈</a></li>
              <li className="mb-2"><a href="/campaigns" className="hover:text-primary-light">캠페인</a></li>
              <li className="mb-2"><a href="/create-campaign" className="hover:text-primary-light">캠페인 생성</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h3 className="text-lg font-bold mb-4">문의하기</h3>
            <p className="text-gray-300">이메일: info@giftfunding.com</p>
            <p className="text-gray-300">전화: 02-123-4567</p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} 선물 펀딩. 모든 권리 보유.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 