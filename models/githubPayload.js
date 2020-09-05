const {checkSchema, validationResult} = require('express-validator');


const schema = {
  repository: {
      in: ['body'],
    errorMessage: 'No repository field',
  },
  // token: {
  //     in: ['query' , 'params'],
  //   errorMessage: 'Invalid token',
  //   isLength: { options: { min: 10 } }
  // }
}


exports.validate = [
  checkSchema(schema),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({errors: errors.array()});
    next();
  }
];
