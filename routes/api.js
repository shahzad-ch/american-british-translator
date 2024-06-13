'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      const text = req.body.text
      let translation = ''
      if (req.body.locale == 'american-to-british') {
        translation = translator.americanToBritish(text)
      }
      else {
        translation = translator.britishToAmerican(text)
      }
      if(text === translation) {
        translation = 'Everything looks good to me!'
      }

      translation = translation[0].toUpperCase() + translation.slice(1)
      // console.log(translation)
      res.send({text, translation})
    });
};
