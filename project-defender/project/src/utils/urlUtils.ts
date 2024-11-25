interface SecurityHeaders {
  [key: string]: boolean;
}

interface ScanResult {
  domain: string;
  ssl: boolean;
  headers: SecurityHeaders;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export const calculateUrlSignature = async (url: string): Promise<ScanResult> => {
  try {
    const response = await fetch(url);
    const headers = response.headers;
    
    // Extract domain from URL
    const domain = new URL(url).hostname;
    
    // Check SSL
    const ssl = url.startsWith('https://');
    
    // Analyze security headers
    const securityHeaders: SecurityHeaders = {
      'Strict-Transport-Security': headers.has('strict-transport-security'),
      'Content-Security-Policy': headers.has('content-security-policy'),
      'X-Frame-Options': headers.has('x-frame-options'),
      'X-Content-Type-Options': headers.has('x-content-type-options'),
      'X-XSS-Protection': headers.has('x-xss-protection')
    };
    
    // Calculate risk level based on security measures
    const securityScore = Object.values(securityHeaders).filter(Boolean).length;
    let riskLevel: 'Low' | 'Medium' | 'High';
    
    if (ssl && securityScore >= 4) {
      riskLevel = 'Low';
    } else if (ssl && securityScore >= 2) {
      riskLevel = 'Medium';
    } else {
      riskLevel = 'High';
    }
    
    return {
      domain,
      ssl,
      headers: securityHeaders,
      riskLevel
    };
  } catch (error) {
    throw new Error('Failed to analyze URL');
  }
};