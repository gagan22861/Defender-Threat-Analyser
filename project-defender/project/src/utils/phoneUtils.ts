import { parsePhoneNumber, PhoneNumber } from 'libphonenumber-js';

interface PhoneNumberInfo {
  country: string;
  countryCode: string;
  region: string;
  carrier: string;
  timeZone: string;
  formatInternational: string;
  formatNational: string;
  type: string;
}

const COUNTRY_NAMES: { [key: string]: string } = {
  US: 'United States',
  GB: 'United Kingdom',
  CA: 'Canada',
  // Add more countries as needed
};

const REGIONS: { [key: string]: { [key: string]: string } } = {
  US: {
    '201': 'New Jersey',
    '202': 'Washington DC',
    '212': 'New York City',
    '213': 'Los Angeles',
    // Add more area codes
  },
};

const CARRIERS: { [key: string]: { [key: string]: string } } = {
  US: {
    '310': 'AT&T',
    '917': 'Verizon',
    '646': 'T-Mobile',
    // Add more carrier codes
  },
};

export const getPhoneNumberInfo = async (phoneNumberString: string): Promise<PhoneNumberInfo> => {
  const phoneNumber: PhoneNumber = parsePhoneNumber(phoneNumberString);
  const countryCode = phoneNumber.country as string;
  const areaCode = phoneNumber.nationalNumber.toString().slice(0, 3);

  // Get region and carrier info based on country and area code
  const region = REGIONS[countryCode]?.[areaCode] || '';
  const carrier = CARRIERS[countryCode]?.[areaCode] || '';

  // Get timezone based on country
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return {
    country: COUNTRY_NAMES[countryCode] || countryCode,
    countryCode: countryCode,
    region,
    carrier,
    timeZone,
    formatInternational: phoneNumber.formatInternational(),
    formatNational: phoneNumber.formatNational(),
    type: phoneNumber.getType() || 'unknown'
  };
};