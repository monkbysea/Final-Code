var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
var natural_language_understanding = new NaturalLanguageUnderstandingV1({
  'username': "5ab54552-1bf6-42dc-8dc8-0dd96e87dd3b",
  'password': "uB7Hyd2hh745",
  'version_date': '2017-02-27'
});

var parameters = {
  'text': 'I am grateful that Greta helped me with my project today',
  'features': {
    'entities': {
      'emotion': true,
      'sentiment': true,
      'limit': 2
    },
    'keywords': {
      'emotion': true,
      'sentiment': true,
      'limit': 2
    }
  }
}

natural_language_understanding.analyze(parameters, function(err, response) {
  if (err)
    console.log('error:', err);
  else
  console.log(JSON.stringify(response, null, 2));
});

// parameters.text = document.getElementById('display-text').innerHTML;