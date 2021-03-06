module.exports = config => {
  return {
  	markdownTemplateEngine: 'njk',	// allows markdown files to be processed by Nunjucks
    dataTemplateEngine: 'njk',	// allows data files to be processed by Nunjucks
    htmlTemplateEngine: 'njk',	// allows html files to be processed by Nunjucks
    dir: {
      input: 'src',
      output: 'dist'
    }
  };
};
