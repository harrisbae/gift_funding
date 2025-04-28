import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    alert('로그아웃되었습니다.');
  };

  return (
    <header className="bg-primary text-white shadow-md">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">선물 펀딩</Link>
        <nav>
          <ul className="flex space-x-4 items-center">
            <li><Link to="/" className="hover:text-primary-light">홈</Link></li>
            <li><Link to="/campaigns" className="hover:text-primary-light">캠페인</Link></li>
            <li><Link to="/create-campaign" className="hover:text-primary-light">캠페인 생성</Link></li>
            
            {user ? (
              <>
                <li className="flex items-center">
                  <span className="ml-2 font-semibold">{user.name}님</span>
                </li>
                <li>
                  <button 
                    onClick={handleLogout} 
                    className="ml-4 px-4 py-1 bg-white text-primary rounded-md hover:bg-gray-100 transition-colors"
                  >
                    로그아웃
                  </button>
                </li>
              </>
            ) : (
              <>
                <li><Link to="/login" className="hover:text-primary-light">로그인</Link></li>
                <li><Link to="/register" className="hover:text-primary-light">회원가입</Link></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; 