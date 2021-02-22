// Responses for Json and Xml here
// Depending on the status, it will set the appropriate message and ID for the user to read
// These will test for xml first, otherwise do json instead
// Default is json

// Response in JSON format
const respondJSON = (request, response, status, object) => {
  response.writeHead(status, {
    'Content-Type': 'application/json',
  });
  response.write(JSON.stringify(object));
  response.end();
};

// Response in XML format
const respondXML = (request, response, status, content) => {
  response.writeHead(status, {
    'Content-Type': 'text/xml',
  });
  response.write(content);
  response.end();
};

/* Success */
const success = (request, response, params, acceptedType) => {
  // Default Data for response
  const rStatus = 200;
  const rData = {
    message: 'This is a successful response',
  };

  // Display JSON or XML messages if they are selected
  if (acceptedType[0] === 'application/json') {
    const responseJSON = {
      message: 'This is a successful response',
    };
    return respondJSON(request, response, 200, responseJSON);
  }
  if (acceptedType[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>This is a successful response</message>`;
    responseXML = `${responseXML} </response>`;

    return respondXML(request, response, 200, responseXML);
  }

  // JSON
  return respondJSON(request, response, rStatus, rData);
};
/// ////////

/* Bad Request */
const badRequest = (request, response, params, acceptedType) => {
  // Default Data for response
  const rData = {
    id: 'badRequest',
    message: 'This request has the required parameters',
  };

  if (acceptedType[0] === 'application/json') {
    const responseJSON = {
      message: 'This request has the required parameters',
    };

    // Will run if params are not valid
    if (!params.valid || params.valid !== 'true') {
      responseJSON.message = 'Missing valid query parameter set to true';
      responseJSON.id = 'badRequest';
      return respondJSON(request, response, 400, responseJSON); // Bad request
    }

    return respondJSON(request, response, 200, responseJSON);
  }
  if (acceptedType[0] === 'text/xml') {
    let responseXML = '<response>';
    if (!params.valid || params.valid !== 'true') {
      responseXML = `${responseXML} <message>Missing valid query parameter set to true</message>`;
      responseXML = `${responseXML} <id>badRequest</id>`;
      responseXML = `${responseXML} </response>`;
      return respondXML(request, response, 400, responseXML);
    }

    responseXML = `${responseXML} <message>Bad Request Success</message>`;
    responseXML = `${responseXML} </response>`;
    return respondXML(request, response, 200, responseXML);
  }

  // JSON
  return respondJSON(request, response, 200, rData);
};
/// ////

/* Unauthorized */
const unauthorized = (request, response, params, acceptedType) => {
  // Default Data for response
  const rData = {
    id: 'unauthorized',
    message: 'This request has the required parameters',
  };

  if (acceptedType[0] === 'application/json') {
    const responseJSON = {
      message: 'This unauthorized request has the required parameters',
    };

    if (!params.loggedIn || params.loggedIn !== 'yes') {
      responseJSON.message = 'Missing loggedIn query parameter set to yes';
      responseJSON.id = 'unauthorized';
      return respondJSON(request, response, 401, responseJSON);
    }

    return respondJSON(request, response, 200, responseJSON);
  }
  if (acceptedType[0] === 'text/xml') {
    let responseXML = '<response>';
    if (!params.loggedIn || params.loggedIn !== 'yes') {
      responseXML = `${responseXML} <message>Missing loggedIn query parameter set to yes</message>`;
      responseXML = `${responseXML} <id>unauthorized</id>`;
      responseXML = `${responseXML} </response>`;
      return respondXML(request, response, 401, responseXML);
    }

    responseXML = `${responseXML} <message>This unauthorized request has the required parameters</message>`;
    responseXML = `${responseXML} </response>`;
    return respondXML(request, response, 200, responseXML);
  }

  // JSON
  return respondJSON(request, response, 200, rData);
};
/// ////

/* Forbidden */
const forbidden = (request, response, params, acceptedType) => {
  // Default Data for response
  const rStatus = 403;
  const rData = {
    id: 'forbidden',
    message: 'Missing loggedIn query parameter set to yes',
  };

  if (acceptedType[0] === 'application/json') {
    const responseJSON = {
      message: 'You do not have access to this content.',
      id: 'forbidden',
    };

    return respondJSON(request, response, rStatus, responseJSON);
  }
  if (acceptedType[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>You do not have access to this content.</message>`;
    responseXML = `${responseXML} <id>forbidden</id>`;
    responseXML = `${responseXML} </response>`;

    // return XML
    return respondXML(request, response, rStatus, responseXML);
  }

  // JSON
  return respondJSON(request, response, rStatus, rData);
};
/// //////

/* Internal */
const internal = (request, response, params, acceptedType) => {
  // Default Data for response
  const rStatus = 500;
  const rData = {
    id: 'internalError',
    message: 'Internal Server Error. Something went wrong',
  };

  if (acceptedType[0] === 'application/json') {
    const responseJSON = {
      message: 'Internal Server Error. Something went wrong',
      id: 'internal',
    };

    return respondJSON(request, response, rStatus, responseJSON);
  }
  if (acceptedType[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>Internal Server Error. Something went wrong</message>`;
    responseXML = `${responseXML} <id>internalError</id>`;
    responseXML = `${responseXML} </response>`;

    // return XML
    return respondXML(request, response, rStatus, responseXML);
  }

  // JSON
  return respondJSON(request, response, rStatus, rData);
};
/// ///////

/* Not Implemented */
const notImplemented = (request, response, params, acceptedType) => {
  // Default Data for response
  const rStatus = 501;
  const rData = {
    id: 'notImplemented',
    message: 'A get request for this page has not been implemented yet. Check again later for updated content',
  };

  if (acceptedType[0] === 'application/json') {
    const responseJSON = {
      message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
      id: 'notImplemented',
    };

    return respondJSON(request, response, rStatus, responseJSON);
  }
  if (acceptedType[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>A get request for this page has not been implemented yet. Check again later for updated content.</message>`;
    responseXML = `${responseXML} <id>notImplemented</id>`;
    responseXML = `${responseXML} </response>`;

    // Return XML
    return respondXML(request, response, rStatus, responseXML);
  }

  // JSON
  return respondJSON(request, response, rStatus, rData);
};
/// /////////

/* Not Found */
const notFound = (request, response, params, acceptedType) => {
  // Default Data for response
  const rStatus = 404;
  const rData = {
    id: 'notFound',
    message: 'The page you are looking for was not found.',
  };

  if (acceptedType[0] === 'application/json') {
    const responseJSON = {
      message: 'The page you are looking for was not found.',
      id: 'notFound',
    };

    return respondJSON(request, response, rStatus, responseJSON);
  }
  if (acceptedType[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>The page you are looking for was not found.</message>`;
    responseXML = `${responseXML} <id>notFound</id>`;
    responseXML = `${responseXML} </response>`;

    // return response passing out string and content type
    return respondXML(request, response, rStatus, responseXML);
  }

  // JSON
  return respondJSON(request, response, rStatus, rData);
};
/// ///////

// Export the following functions
module.exports = {
  success,
  badRequest,
  notFound,
  forbidden,
  internal,
  notImplemented,
  unauthorized,
};
