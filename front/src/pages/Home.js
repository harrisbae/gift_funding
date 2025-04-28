import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div>
      <section className="py-12 bg-gradient-to-r from-primary to-indigo-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {user ? `${user.name}님, ` : ''}선물로 특별한 순간을 만들어보세요
            </h1>
            <p className="text-xl mb-8">선물 펀딩으로 소중한 사람에게 마음을 전하세요.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/campaigns" className="px-6 py-3 bg-white text-primary font-bold rounded-lg shadow-lg hover:bg-gray-100 transition duration-300">
                캠페인 둘러보기
              </Link>
              <Link to="/create-campaign" className="px-6 py-3 bg-primary-dark text-white font-bold rounded-lg shadow-lg hover:bg-indigo-800 transition duration-300">
                캠페인 만들기
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">선물 펀딩 이용 방법</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-bold mb-3">캠페인 생성하기</h3>
              <p className="text-gray-600">선물 정보, 목표 금액, 마감일을 설정하고 캠페인을 생성합니다.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-bold mb-3">공유하기</h3>
              <p className="text-gray-600">친구, 가족, 지인들에게 캠페인을 공유하여 참여를 유도합니다.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-bold mb-3">선물 전달하기</h3>
              <p className="text-gray-600">목표 금액이 모이면 선물을 구매하고 특별한 순간을 만들어보세요.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">인기 캠페인</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 실제 데이터를 연동할 때 이 부분을 수정하세요 */}
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="h-48 bg-gray-300"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">생일 선물 캠페인 {item}</h3>
                  <div className="mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-primary h-2.5 rounded-full" style={{ width: `${item * 25}%` }}></div>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span>{item * 250000}원 모임</span>
                      <span>{item * 25}%</span>
                    </div>
                  </div>
                  <Link to={`/campaigns/${item}`} className="block text-center py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition duration-300">
                    자세히 보기
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/campaigns" className="px-6 py-3 bg-white text-primary font-semibold rounded-lg shadow-md border border-primary hover:bg-primary hover:text-white transition duration-300">
              모든 캠페인 보기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 