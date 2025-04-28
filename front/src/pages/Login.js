import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      // 로그인 API 호출
      const response = await axios.post('http://localhost:8080/api/auth/login', formData);
      
      // AuthContext의 login 함수 호출
      login(response.data);
      
      // 성공 메시지
      alert('로그인이 완료되었습니다!');
      
      // 메인 페이지로 이동
      navigate('/');
    } catch (error) {
      console.error('로그인 오류:', error);
      setError(
        error.response?.data?.message ||
        '로그인 처리 중 오류가 발생했습니다. 다시 시도해 주세요.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-12">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">로그인</h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              이메일
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary"
              id="email"
              name="email"
              type="email"
              placeholder="이메일을 입력하세요"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              비밀번호
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary"
              id="password"
              name="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>
          
          <div className="mb-6 flex items-center">
            <input
              id="rememberMe"
              name="rememberMe"
              type="checkbox"
              className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
              checked={formData.rememberMe}
              onChange={handleChange}
              disabled={isLoading}
            />
            <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
              로그인 상태 유지
            </label>
          </div>
          
          <div className="mb-6">
            <button
              className="w-full bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-primary-dark transition duration-300 disabled:opacity-50"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? '처리 중...' : '로그인'}
            </button>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-600">
              계정이 없으신가요? <Link to="/register" className="text-primary hover:underline">회원가입</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login; 