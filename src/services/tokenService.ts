import Cookies from 'js-cookie';

const REFRESH_TOKEN_KEY = 'refresh_token';
const ACCESS_TOKEN_KEY = 'access_token';

export const tokenService = {
  setTokens(accessToken: string, refreshToken: string, accessExpireAt: string, refreshExpireAt: string) {
    const accessExpiry = new Date(accessExpireAt);
    const refreshExpiry = new Date(refreshExpireAt);
    
    // Save tokens in cookies
    Cookies.set(ACCESS_TOKEN_KEY, accessToken, { 
      expires: accessExpiry, 
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
    
    Cookies.set(REFRESH_TOKEN_KEY, refreshToken, { 
      expires: refreshExpiry, 
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
  },
  
  getAccessToken(): string | undefined {
    return Cookies.get(ACCESS_TOKEN_KEY);
  },
  
  getRefreshToken(): string | undefined {
    return Cookies.get(REFRESH_TOKEN_KEY);
  },
  
  clearTokens() {
    Cookies.remove(ACCESS_TOKEN_KEY);
    Cookies.remove(REFRESH_TOKEN_KEY);
  },
  
  clearAccessToken() {
    Cookies.remove(ACCESS_TOKEN_KEY);
  },

  clearRefreshToken() {
    Cookies.remove(REFRESH_TOKEN_KEY);
  },

  isAccessTokenExpired(): boolean {
    const token = this.getAccessToken();
    if (!token) return true;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    } catch (error) {
      return true;
    }
  }
};
