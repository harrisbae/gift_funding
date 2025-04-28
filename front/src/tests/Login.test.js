import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import Login from '../pages/Login';

// axios의 post 메서드를 모킹
jest.mock('axios');

// React Router의 useNavigate를 모킹
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('Login Component', () => {
  beforeEach(() => {
    // 각 테스트 전에 localStorage와 모킹된 함수들을 초기화
    localStorage.clear();
    mockedNavigate.mockClear();
    axios.post.mockClear();
  });

  // 컴포넌트 렌더링 테스트
  test('renders login form correctly', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // 로그인 폼 요소들이 렌더링되는지 확인
    expect(screen.getByText('로그인')).toBeInTheDocument();
    expect(screen.getByLabelText('이메일')).toBeInTheDocument();
    expect(screen.getByLabelText('비밀번호')).toBeInTheDocument();
    expect(screen.getByLabelText('로그인 상태 유지')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '로그인' })).toBeInTheDocument();
    expect(screen.getByText('계정이 없으신가요?')).toBeInTheDocument();
    expect(screen.getByText('회원가입')).toBeInTheDocument();
  });

  // 폼 입력 처리 테스트
  test('handles form input changes', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // 폼 입력 필드 가져오기
    const emailInput = screen.getByLabelText('이메일');
    const passwordInput = screen.getByLabelText('비밀번호');
    const rememberMeCheckbox = screen.getByLabelText('로그인 상태 유지');

    // 입력값 변경
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(rememberMeCheckbox);

    // 입력값이 올바르게 변경되었는지 확인
    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
    expect(rememberMeCheckbox.checked).toBe(true);
  });

  // 로그인 성공 테스트
  test('successfully logs in and redirects user', async () => {
    // API 응답 모킹
    const mockResponse = {
      data: {
        success: true,
        message: '로그인이 성공적으로 완료되었습니다.',
        data: {
          id: 1,
          name: '테스트 사용자',
          email: 'test@example.com',
          token: 'mock-token-12345'
        }
      }
    };
    axios.post.mockResolvedValueOnce(mockResponse);

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // 폼 입력 및 제출
    fireEvent.change(screen.getByLabelText('이메일'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('비밀번호'), { target: { value: 'password123' } });
    fireEvent.submit(screen.getByRole('button', { name: '로그인' }));

    // 로그인 처리 결과 확인
    await waitFor(() => {
      // API 호출 확인
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:8080/api/auth/login', 
        {
          email: 'test@example.com',
          password: 'password123',
          rememberMe: false
        }
      );

      // 로컬 스토리지에 사용자 정보 저장 확인
      expect(localStorage.getItem('token')).toBe('mock-token-12345');
      expect(JSON.parse(localStorage.getItem('user'))).toEqual({
        id: 1,
        name: '테스트 사용자',
        email: 'test@example.com'
      });

      // 홈페이지로 리다이렉트 확인
      expect(mockedNavigate).toHaveBeenCalledWith('/');
    });
  });

  // 로그인 실패 테스트
  test('displays error message on login failure', async () => {
    // API 오류 응답 모킹
    const mockErrorResponse = {
      response: {
        data: {
          success: false,
          message: '이메일 또는 비밀번호가 올바르지 않습니다.'
        }
      }
    };
    axios.post.mockRejectedValueOnce(mockErrorResponse);

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // 폼 입력 및 제출
    fireEvent.change(screen.getByLabelText('이메일'), { target: { value: 'wrong@example.com' } });
    fireEvent.change(screen.getByLabelText('비밀번호'), { target: { value: 'wrongpassword' } });
    fireEvent.submit(screen.getByRole('button', { name: '로그인' }));

    // 오류 메시지 표시 확인
    await waitFor(() => {
      expect(screen.getByText('이메일 또는 비밀번호가 올바르지 않습니다.')).toBeInTheDocument();
    });

    // 로컬 스토리지에 정보가 저장되지 않았는지 확인
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('user')).toBeNull();

    // 리다이렉트가 발생하지 않았는지 확인
    expect(mockedNavigate).not.toHaveBeenCalled();
  });
}); 