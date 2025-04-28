import React from 'react';
import { Link } from 'react-router-dom';

const CampaignList = () => {
  // 샘플 데이터 - 실제로는 API에서 가져와야 합니다
  const campaigns = [
    { id: 1, title: '생일 선물 캠페인 1', raised: 250000, goal: 1000000, image: '' },
    { id: 2, title: '생일 선물 캠페인 2', raised: 500000, goal: 1000000, image: '' },
    { id: 3, title: '생일 선물 캠페인 3', raised: 750000, goal: 1000000, image: '' },
    { id: 4, title: '결혼 선물 캠페인', raised: 450000, goal: 2000000, image: '' },
    { id: 5, title: '졸업 선물 캠페인', raised: 380000, goal: 500000, image: '' },
    { id: 6, title: '집들이 선물 캠페인', raised: 120000, goal: 300000, image: '' },
  ];

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">모든 캠페인</h1>
      
      <div className="mb-8">
        <div className="max-w-md mx-auto">
          <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden border border-gray-300">
            <div className="grid place-items-center h-full w-12 text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
              type="text"
              placeholder="캠페인 검색..."
            />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="bg-white rounded-lg overflow-hidden shadow-md">
            <div className="h-48 bg-gray-300"></div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{campaign.title}</h3>
              <div className="mb-4">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-primary h-2.5 rounded-full" 
                    style={{ width: `${(campaign.raised / campaign.goal) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span>{campaign.raised.toLocaleString()}원 모임</span>
                  <span>{Math.round((campaign.raised / campaign.goal) * 100)}%</span>
                </div>
              </div>
              <Link 
                to={`/campaigns/${campaign.id}`} 
                className="block text-center py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition duration-300"
              >
                자세히 보기
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CampaignList; 