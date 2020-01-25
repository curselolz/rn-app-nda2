export const inputs = {
  first_name: {
    placeholder: 'First name',
    type: 'only-numbers',
    keyBoardType: 'default',
    maxLength: 10,
    default: true,
  },
  last_name: {
    placeholder: 'Last name',
    type: 'only-numbers',
    keyBoardType: 'default',
    maxLength: 25,
    default: true,
  },
  phone: {
    placeholder: 'Phone number',
    type: 'custom',
    mask: '+1 (999) 999-9999',
    keyBoardType: 'phone-pad',
    maxLength: 17,
  },
  email: {
    placeholder: 'Email',
    type: 'custom',
    keyBoardType: 'email-address',
    mask: '',
    maxLength: 255,
    default: true,
  },
  search: {
    placeholder: 'Search',
    type: 'only-numbers',
    keyBoardType: 'default',
    default: true,
  },
  password: {
    placeholder: 'Password',
    type: 'only-numbers',
    keyBoardType: 'default',
    default: true,
  },
  old_password: {
    placeholder: 'Enter existing Password',
    type: 'only-numbers',
    keyBoardType: 'default',
    default: true,
  },
  new_password: {
    placeholder: 'New password',
    type: 'only-numbers',
    keyBoardType: 'default',
    default: true,
  },
  confirm: {
    placeholder: 'Confirm password',
    type: 'only-numbers',
    keyBoardType: 'default',
    default: true,
  },
  addressName: {
    placeholder: 'Address name (optional)',
    type: 'only-numbers',
    keyBoardType: 'default',
    default: true,
  },
  comment: {
    placeholder: 'Comment (optional)',
    type: 'only-numbers',
    keyBoardType: 'default',
    default: true,
  },
  apartment: {
    placeholder: 'Apartment # (optional) ',
    type: 'only-numbers',
    keyBoardType: 'default',
    default: true,
  },
  address: {
    placeholder: 'Street',
    type: 'custom',
    mask: 'default',
    keyBoardType: 'default',
    default: true,
  },
  zip: {
    placeholder: 'Zip',
    type: 'only-numbers',
    mask: '99999',
    keyBoardType: 'numeric',
    maxLength: 5,
  },
  card: {
    placeholder: 'Number of card',
    type: 'credit-card',
    mask: '9999 9999 9999 9999',
    keyBoardType: 'numeric',
    maxLength: 19,
  },
  expires: {
    placeholder: 'Expires',
    type: 'custom',
    mask: '99/99',
    keyBoardType: 'numeric',
    maxLength: 5,
  },
  code: {
    placeholder: 'Security code',
    type: 'only-numbers',
    mask: '999',
    keyBoardType: 'numeric',
    maxLength: 3,
  },
  company_name: {
    placeholder: 'Company name',
    type: 'only-numbers',
    keyBoardType: 'default',
    default: true,
  },
  referralCode: {
    placeholder: 'Referral code',
    type: 'only-numbers',
    keyBoardType: 'default',
    default: true,
  },
  account_number: {
    placeholder: 'Account number',
    type: 'custom',
    mask: '999999999999',
    keyBoardType: 'numeric',
    maxLength: 12,
  },
  routing_number: {
    placeholder: 'routing number',
    type: 'custom',
    mask: '999 999 999',
    keyBoardType: 'numeric',
    maxLength: 11,
  },
  full_name: {
    placeholder: 'First & last name',
    type: 'custom',
    mask: '',
    keyBoardType: 'default',
    default: true,
  },
  description: {
    placeholder: 'About me',
    type: 'only-numbers',
    keyBoardType: 'default',
    default: true,
  },
  review: {
    placeholder: '',
    type: 'only-numbers',
    keyBoardType: 'default',
    default: true,
  },
  state: {
    placeholder: 'State',
    type: 'custom',
    mask: 'AA',
    keyBoardType: 'default',
    maxLength: 2,
  },
  city: {
    placeholder: 'City',
    type: 'only-numbers',
    keyBoardType: 'default',
    default: true,
  },
  dob: {
    placeholder: 'Birth Date (MM/DD/YYYY)',
    type: 'datetime',
    mask: 'MM/DD/YYYY',
    keyBoardType: 'default',
    maxLength: 10,
  },
  ssn: {
    placeholder: 'SSN - Last Four Digits',
    type: 'only-numbers',
    mask: '9999',
    keyBoardType: 'numeric',
    maxLength: 4,
  },
  p_id: {
    placeholder: 'SSN - Full',
    type: 'custom',
    mask: '999-99-9999',
    keyBoardType: 'numeric',
    maxLength: 11,
  },
};
