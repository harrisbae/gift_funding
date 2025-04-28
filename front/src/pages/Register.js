import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name) {
      newErrors.name = '이름을 입력해주세요';
    }
    
    if (!formData.email) {
      newErrors.email = '이메일을 입력해주세요';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '유효한 이메일 주소를 입력해주세요';
    }
    
    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요';
    } else if (formData.password.length < 6) {
      newErrors.password = '비밀번호는 6자 이상이어야 합니다';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다';
    }
    
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = '이용약관에 동의해주세요';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 서버에 회원가입 요청을 보내는 함수
  const registerUser = async (userData) => {
    try {
      // 서버 API URL - 로컬 Spring Boot 서버 주소
      const API_URL = 'http://localhost:8080/api/auth/register';
      
      // confirmPassword와 agreeTerms는 서버로 보낼 필요 없으므로 제외
      const { confirmPassword, agreeTerms, ...dataToSend } = userData;
      
      // API 호출
      const response = await axios.post(API_URL, dataToSend);
      
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('회원가입 오류:', error);
      
      // 서버 응답에 오류 메시지가 있는 경우 활용
      const errorMessage = error.response?.data?.message || '회원가입 처리 중 오류가 발생했습니다.';
      
      return {
        success: false,
        message: errorMessage
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    
    if (validate()) {
      setIsSubmitting(true);
      
      try {
        // 서버에 회원가입 요청
        const result = await registerUser(formData);
        
        if (result.success) {
          // 성공 시 처리
          alert('회원가입이 성공적으로 완료되었습니다!');
          
          // 로그인 페이지로 이동
          navigate('/login');
        } else {
          // 실패 시 에러 메시지 표시
          setServerError(result.message);
        }
      } catch (error) {
        setServerError('서버 연결 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="py-12">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">회원가입</h1>
        
        {serverError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {serverError}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              이름
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary ${errors.name ? 'border-red-500' : ''}`}
              id="name"
              name="name"
              type="text"
              placeholder="이름을 입력하세요"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              이메일
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary ${errors.email ? 'border-red-500' : ''}`}
              id="email"
              name="email"
              type="email"
              placeholder="이메일을 입력하세요"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              비밀번호
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary ${errors.password ? 'border-red-500' : ''}`}
              id="password"
              name="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
              비밀번호 확인
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary ${errors.confirmPassword ? 'border-red-500' : ''}`}
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="비밀번호를 다시 입력하세요"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
            )}
          </div>
          
          <div className="mb-6 flex items-center">
            <input
              id="agreeTerms"
              name="agreeTerms"
              type="checkbox"
              className={`w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded ${errors.agreeTerms ? 'border-red-500' : ''}`}
              checked={formData.agreeTerms}
              onChange={handleChange}
            />
            <label htmlFor="agreeTerms" className="ml-2 block text-sm text-gray-700">
              <span>이용약관 및 개인정보 처리방침에 동의합니다</span>
            </label>
            {errors.agreeTerms && (
              <p className="text-red-500 text-xs ml-2">{errors.agreeTerms}</p>
            )}
          </div>
          
          <div className="mb-6">
            <button
              className="w-full bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-primary-dark transition duration-300 disabled:opacity-50"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? '처리 중...' : '회원가입'}
            </button>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-600">
              이미 계정이 있으신가요? <Link to="/login" className="text-primary hover:underline">로그인</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register; 