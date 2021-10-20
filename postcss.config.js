module.exports = cfg => {
    const scss = cfg.file.extname === '.scss';
  
    return {
      map: false,
      parser:  scss ? 'postcss-scss' : false,
      plugins: [
        require('autoprefixer')()
      ]
    };
  };
