import React, { useState } from 'react';

const CreateCampaign = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    goalAmount: '',
    endDate: '',
    image: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // API 호출로 캠페인 생성을 처리해야 합니다
    console.log('캠페인 생성 데이터:', formData);
    alert('캠페인이 생성되었습니다! (테스트)');
  };

  return (
    <div className="py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">새 캠페인 만들기</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                캠페인 제목
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="title"
                name="title"
                type="text"
                placeholder="캠페인 제목을 입력하세요"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                캠페인 설명
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                name="description"
                rows="6"
                placeholder="캠페인에 대한 상세 설명을 입력하세요"
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="goalAmount">
                목표 금액 (원)
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="goalAmount"
                name="goalAmount"
                type="number"
                min="10000"
                placeholder="목표 금액을 입력하세요"
                value={formData.goalAmount}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endDate">
                종료일
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="endDate"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                캠페인 이미지
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              <p className="text-gray-500 text-xs mt-1">캠페인을 대표할 이미지를 업로드하세요.</p>
            </div>
            
            <div className="flex items-center justify-between">
              <button
                className="bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-gray-600 transition duration-300"
                type="button"
              >
                취소
              </button>
              <button
                className="bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-primary-dark transition duration-300"
                type="submit"
              >
                캠페인 생성
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCampaign; 