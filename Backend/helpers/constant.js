exports.errorName = {
    USER_ALREADY_EXISTS: 'USER_ALREADY_EXISTS',
    ID_NOT_FOUND: 'ID_NOT_FOUND',
    SERVER_ERROR: 'SERVER_ERROR',
    INVALID_INPUT: 'INVALID_INPUT',
    CANNOT_BE_EMPTY:'CANNOT_BE_EMPTY'
  }
  
  exports.errorType = {
    USER_ALREADY_EXISTS: {
      message: 'User is already exists.',
      statusCode: 403
    },
    SERVER_ERROR: {
      message: 'Server error.',
      statusCode: 500
    },
    ID_NOT_FOUND:{
        message: 'Id not found',
        statusCode: 403
    },
    INVALID_INPUT:{
      message:'StartTime or EndTime or ActivityDate in not in correct format ( >> time should be yyyy-mm-dd hh:mm:ss +zzzz << format)',
      statusCode:403
    },
    CANNOT_BE_EMPTY:{
      message:'Input object cannot contain empty strings or empty arrays',
      statusCode: 403
    }
  }