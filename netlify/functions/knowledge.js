const fs = require('fs');
const path = require('path');

// Speicherort der Datei auf dem Netlify-Server (temporärer Speicher)
const filePath = path.join('/tmp', 'knowledge.json');

exports.handler = async (event) => {
  if (event.httpMethod === 'GET') {
    // Beim ersten Aufruf ggf. Standardwissen einfügen
    if (!fs.existsSync(filePath)) {
      const defaultKnowledge = {
        "was ist dein name": { "Ich bin deine Chat-AI!": { count: 1, rating: 0 } },
        "was ist javascript": { "JavaScript ist eine Programmiersprache, die hauptsächlich für Webseiten verwendet wird.": { count: 1, rating: 0 } },
        "wie funktioniert dein programm": { "Ich vergleiche deine Frage mit meiner Wissensbasis und gebe die häufigste Antwort zurück.": { count: 1, rating: 0 } },
        "was kannst du": { "Ich kann Fragen beantworten und neue Antworten lernen!": { count: 1, rating: 0 } }
      };
      fs.writeFileSync(filePath, JSON.stringify(defaultKnowledge, null, 2));
    }

    const data = fs.readFileSync(filePath, 'utf8');
    return {
      statusCode: 200,
      body: data,
      headers: { 'Content-Type': 'application/json' }
    };
  }

  if (event.httpMethod === 'POST') {
    try

