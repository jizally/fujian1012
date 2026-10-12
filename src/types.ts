export type AuthMethod = 'self' | 'admin';

export interface InvoiceData {
  enabled: boolean;
  type: 'special' | 'general' | 'none'; // 专用发票 / 普通发票 / 不开发票
  titleType: 'enterprise' | 'personal';
  companyName: string;
  taxNumber: string;
  bankName?: string;
  bankAccount?: string;
  address?: string;
  phone?: string;
  email: string;
}

export interface BusinessLicenseData {
  code: string;
  name: string;
  type: string;
  legalPerson: string;
  capital: string;
  establishDate: string;
  validPeriod: string;
  businessScope: string;
  address: string;
  registerAuthority: string;
  issueDate: string;
}

export type FaceAuthStatus = 'pending' | 'success' | 'reviewing' | 'rejected';

export interface FaceAuthData {
  status: FaceAuthStatus;
  isVerified: boolean;
  name?: string;
  idCard?: string;
  verifiedAt?: string;
  reviewSubmitTime?: string;
  caContact?: {
    hotline: string;
    workHours: string;
    email: string;
    centerName: string;
  };
  rejectReason?: string;
  rejectCode?: string;
  rejectTime?: string;
}
