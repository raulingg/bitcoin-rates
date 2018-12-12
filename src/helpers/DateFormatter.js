const DateFormatOptions = {
  month: 'long',
  year: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: false,
};

export default new Intl.DateTimeFormat('en-EN', DateFormatOptions);
