export const fetchApi = async (url, email, password) => {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      returnSecureToken: true,
    }),
  });

  const responseData = await response.json();
  if (!response.ok) {
    throw new Error(responseData.error.message || "Something went wrong!");
  }

  return responseData.idToken;
};

// =========================================================================================

const addUserUrl = "https://react-http-ed2e3-default-rtdb.firebaseio.com/users";

// =========================================================================================

export const signUpUser = async (data) => {
  const response = await fetch(`${addUserUrl}.json`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  const responseData = await response.json();
};

// =========================================================================================

export const addQuote = async (userData) => {
  const response = await fetch(`${addUserUrl}/${userData.userId}/data.json`, {
    method: "POST",
    body: JSON.stringify({
      author: userData.author,
      quote: userData.quote,
    }),
  });
  const responseData = await response.json();
};

// ========================================================================================

export const getAllDetails = async () => {
  const response = await fetch(`addUserUrl`.json);
  const responseData = await response.json();

  let transformedArray = [];

  for (const key in responseData) {
    transformedArray.push({
      autoId: key,
      ...responseData[key],
    });
  }

  return transformedArray;
};

// ======================================================================================

export const findUserAndQuotes = async (userEmail) => {
  const response = await fetch(`${addUserUrl}.json`);
  const responseData = await response.json();
  let userObj;

  for (const key in responseData) {
    if (responseData[key].email === userEmail) {
      userObj = {
        autoId: key,
        ...responseData[key],
      };
      break;
    }
  }

  return userObj;
};

// =====================================================================================

export const getAllQuotes = async (userId) => {
  const response = await fetch(`${addUserUrl}/${userId}/data.json`);
  const responseData = await response.json();
  let transformedArray = [];

  for (const key in responseData) {
    const obj = {
      id: key,
      ...responseData[key],
    };
    transformedArray.push(obj);
  }

  return transformedArray;
};

// ==================================================================================

export const deleteSingleQuote = async (quoteId, params) => {
  const response = await fetch(`${addUserUrl}/${params}/data/${quoteId}.json`, {
    method: "DELETE",
  });
  const responseData = await response.json();
};

// ==================================================================================

export const fetchSingleQuote = async (userId, quoteId) => {
  const response = await fetch(`${addUserUrl}/${userId}/data/${quoteId}.json`);
  const responseData = await response.json();
  return responseData;
};

// ==================================================================================

export const addCommentHandlerApi = async (userId, quoteId, comment) => {
  const response = await fetch(
    `${addUserUrl}/${userId}/data/${quoteId}/comments.json`,
    {
      method: "POST",
      body: JSON.stringify({ comment }),
    }
  );
  const responseData = await response.json();
};

// =================================================================================

export const getCommentsHandlerApi = async (userId, quoteId) => {
  const response = await fetch(
    `${addUserUrl}/${userId}/data/${quoteId}/comments.json`
  );
  const responseData = await response.json();

  let transformedArray = [];

  for (const key in responseData) {
    const obj = {
      id: key,
      ...responseData[key],
    };
    transformedArray.push(obj);
  }

  return transformedArray;
};

// ================================================================================

export const deleteCommentHandlerApi = async (userId, quoteId, commentId) => {
  const response = await fetch(
    `${addUserUrl}/${userId}/data/${quoteId}/comments/${commentId}.json`,
    {
      method: "DELETE",
    }
  );
  const responseData = await response.json();
};

// ===============================================================================

export const changePasswordHandlerApi = async (url, token, password) => {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      idToken: token,
      password,
      returnSecureToken: false,
    }),
  });

  const responseData = await response.json();
  if (!response.ok) {
    throw new Error(responseData.error.message);
  }
};
