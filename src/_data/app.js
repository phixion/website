const env = (dev, prod = dev) => {
  if (process.env.ELEVENTY_ENV === 'development') {
    return dev;
  }

  return prod;
};

module.exports = {
  title: 'martin',
  description: '',
  twitter: 'ridelore',
  baseUrl: env('phixion.org', 'https://phixion.org'),
  thumb: '/assets/images/big-rainbow-static.jpg',
};
