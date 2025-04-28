import React from 'react';
import { useParams } from 'react-router-dom';

const CampaignDetail = () => {
  const { id } = useParams();
  
  // 샘플 데이터 - 실제로는 API에서 가져와야 합니다
  const campaign = {
    id,
    title: `선물 캠페인 ${id}`,
    description: '이 캠페인은 소중한 사람에게 특별한 생일 선물을 준비하기 위한 펀딩 캠페인입니다. 여러분의 소중한 후원으로 잊지 못할 선물을 전달할 수 있습니다.',
    raised: 500000,
    goal: 1000000,
    daysLeft: 15,
    creator: '김선물',
    createdAt: '2023-11-01',
    endDate: '2023-12-15',
    supporters: 24,
    image: '',
  };

  const calculateProgress = () => {
    return Math.round((campaign.raised / campaign.goal) * 100);
  };

  return (
    <div className="py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="h-64 bg-gray-300"></div>
          
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">{campaign.title}</h1>
            
            <div className="mb-6">
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className="bg-primary h-4 rounded-full" 
                  style={{ width: `${calculateProgress()}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-2">
                <div>
                  <p className="text-2xl font-bold text-primary">{campaign.raised.toLocaleString()}원</p>
                  <p className="text-sm text-gray-600">목표 {campaign.goal.toLocaleString()}원 중</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">{calculateProgress()}%</p>
                  <p className="text-sm text-gray-600">달성</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="border rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600">남은 기간</p>
                <p className="text-xl font-bold">{campaign.daysLeft}일</p>
              </div>
              <div className="border rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600">후원자</p>
                <p className="text-xl font-bold">{campaign.supporters}명</p>
              </div>
              <div className="border rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600">마감일</p>
                <p className="text-xl font-bold">{campaign.endDate}</p>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">캠페인 설명</h2>
              <p className="text-gray-700">{campaign.description}</p>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">후원하기</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <button className="border border-primary text-primary font-bold py-2 rounded-lg hover:bg-primary hover:text-white transition duration-300">
                  10,000원
                </button>
                <button className="border border-primary text-primary font-bold py-2 rounded-lg hover:bg-primary hover:text-white transition duration-300">
                  30,000원
                </button>
                <button className="border border-primary text-primary font-bold py-2 rounded-lg hover:bg-primary hover:text-white transition duration-300">
                  50,000원
                </button>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <input 
                  type="text" 
                  placeholder="직접 입력" 
                  className="flex-1 border rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <span className="text-gray-600">원</span>
              </div>
              <button className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary-dark transition duration-300">
                후원하기
              </button>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-4">캠페인 정보</h2>
              <div className="border-t border-b py-4">
                <p className="text-gray-600">
                  <span className="font-semibold">캠페인 생성자:</span> {campaign.creator}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">캠페인 생성일:</span> {campaign.createdAt}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetail; 