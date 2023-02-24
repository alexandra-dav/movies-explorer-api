// Тут описаны коды ответов
exports.statusCodeName = {
  CREATED: 201,
  ERROR_UNAUTHORIZED: 401,
  ERROR_VALIDATION: 400,
  ERROR_FORBIDDEN: 403,
  ERROR_NOT_FOUND: 404,
  ERROR_CONFLICT: 409,
  ERROR_INTERNAL_SERVER: 500,
};

// Тут описаны тексты сообщений для клиента
exports.errorMassage = {
  USER_NOT_VALID: 'Данные пользователя не валидны.',
  USER_NOT_FOUND: 'Пользователь не найден.',
  USER_ID_NOT_VALID: 'Невалидный ID пользователя.',
  USER_ERROR_UNAUTHORIZED: 'Ошибка авторизации пользователя: проверьте логин и пароль.',
  USER_ERROR_MUST_AUTHORIZED: 'Необходима авторизация.',
  USER_ERROR_CONFLICT: 'Пользователь с данным email уже существует.',
  MOVIE_NOT_VALID: 'Данные не валидны.',
  MOVIE_NOT_FOUND: 'Фильм не найден.',
  MOVIE_ID_NOT_VALID: 'Невалидный ID фильма.',
  MOVIE_ERROR_CREDENTINAL: 'Вы не можете удалить этот фильм!',
  PAGE_NOT_FOUND: 'Ошибка запроса: проверьте метод и эндпоинт.',
  PAGE_500: 'На сервере произошла ошибка.',
};
