let knowledgeBase = {};

exports.handler = async function (event, context) {
  if (event.httpMethod === "GET") {
    return {
      statusCode: 200,
      body: JSON.stringify(knowledgeBase),
    };
  }

  if (event.httpMethod === "POST") {
    const newData = JSON.parse(event.body);
    knowledgeBase = { ...knowledgeBase, ...newData };

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Wissen aktualisiert", knowledgeBase }),
    };
  }

  return {
    statusCode: 405,
    body: "Methode nicht erlaubt",
  };
};
